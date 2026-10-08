# The Wedding Filmer: backend

Express + MongoDB (Mongoose) + Backblaze B2 API for the Next.js frontend.
It stores the site content (hero slides, films, India map pins, gratitude notes)
and uploads images/videos to Backblaze B2. There are no user accounts: the admin
panel is protected by a single passcode.

## Quick start

```bash
cd backend
npm install
cp .env.example .env      # then fill in MONGODB_URI and the B2_* values
npm run seed              # optional: loads the starter content
npm run dev               # http://localhost:5000
```

Requires Node 20.19 or newer.

Then, in the **frontend** folder, create `.env.local`:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

## Admin passcode

The passcode is hardcoded in [`src/config/admin.js`](src/config/admin.js):

```
PC@admin2026
```

**Change it before you deploy.** (An `ADMIN_PASSCODE` environment variable
overrides it, if you prefer not to keep it in code.)

The admin panel (`/admin` on the frontend) asks for the passcode and sends it in
an `x-admin-passcode` header. Every `/api/admin/*` route checks it, so nobody can
add, edit, delete or upload without it. Wrong guesses are rate limited
(10 per 15 minutes per IP).

## Backblaze B2 setup

1. In the B2 console, create a **public** bucket.
2. Create an Application Key restricted to that bucket. It needs read, write,
   list and delete access (the default "Read and Write" key has all of them).
3. Put the values in `.env`:

| Variable | Example |
| --- | --- |
| `B2_KEY_ID` | `004abc...` |
| `B2_APPLICATION_KEY` | `K004...` |
| `B2_BUCKET_NAME` | `my-wedding-media` |
| `B2_ENDPOINT` | `https://s3.us-west-004.backblazeb2.com` (shown on the bucket page) |
| `B2_PUBLIC_URL` (optional) | your CDN / custom domain in front of the bucket |

Uploads are served through the backend media proxy, so the B2 bucket does not
need to be public. Set `PUBLIC_API_URL` to the public URL of this backend when
it is deployed; locally it should match the backend port (for example,
`http://localhost:5000`).

Files are uploaded through the API (streamed to B2, so large videos are fine) and
stored as `images|videos/YYYY/MM/<uuid>.<ext>`. When an item is deleted, or a
file is replaced, the old file is deleted from B2, unless another item still uses it.
Deletion removes every stored version of the file, so nothing keeps being billed.

The frontend loads images through `next/image`, so if you use a custom domain in
`B2_PUBLIC_URL`, set `NEXT_PUBLIC_MEDIA_HOSTNAME` in the frontend too.

## API

Everything returns JSON. Errors look like
`{ "error": "message", "details": { "field": "message" } }`.

### Public

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/content` | `{ hero: [], films: [], india: [], gratitude: [] }`, what the site renders |
| GET | `/api/health` | Server, database and storage status |
| POST | `/api/reviews` | Submit a review with `author`, `role`, `quote`, and a 1–5 `rating`; `image` is optional |
| POST | `/api/reviews/upload` | Upload an optional review image (`multipart/form-data`, field `file`) |

### Admin (header `x-admin-passcode` required)

`:section` is one of `hero`, `films`, `india`, `gratitude`.

| Method | Path | Description |
| --- | --- | --- |
| POST | `/api/admin/verify` | Checks the passcode |
| POST | `/api/admin/:section` | Add an item (JSON body) |
| PUT | `/api/admin/:section/:id` | Edit an item (send any of its fields) |
| DELETE | `/api/admin/:section/:id` | Remove an item and its uploaded files |
| POST | `/api/admin/upload` | Upload a file (`multipart/form-data`, field `file`) and get back `{ url, type, size }` |
| DELETE | `/api/admin/upload` | `{ "url": "..." }` removes an uploaded file that no item uses |

Fields per section:

- **hero**: `couple, location, date, teaser, category, image, videoUrl?, slug?, order?`
- **films**: `couple, location, date, teaser, category, image, thumbnail?, videoUrl?, trailerUrl?, galleryImages?, btsImages?, coupleStory?, btsDescription?, filmReviews?, slug?, order?`
- **india**: `couple, location, city, state, date, latitude, longitude, image, filmUrl?, slug?, order?`
- **gratitude**: `quote, author, role, image?, rating?, order?`

Notes:

- `slug` is generated from `couple` when left out (`"Arya & Federico"` becomes `arya-federico`).
- `videoUrl` accepts an uploaded file URL or a YouTube/Vimeo link. The API works out
  `videoType` and converts share links to embed URLs.
- `trailerUrl` accepts a YouTube link and is opened externally by the Watch Trailer button.
  `galleryImages` and `btsImages` are lists of image URLs and can contain as many images as needed.
- `coupleStory` and `btsDescription` contain paragraphs separated by blank lines.
  `filmReviews` is a list of reviewer name, relationship, quote, and optional image entries.
- `india.filmUrl` defaults to `/films`.
- Items are returned sorted by `order` (lowest first), then newest first.
- Uploads accept JPG, PNG, WebP, GIF, AVIF, MP4, WebM and MOV, up to `MAX_UPLOAD_MB` (default 500).

## Folder structure

```
backend/
├── .env.example
├── package.json
└── src/
    ├── server.js              starts the server (DB connection, graceful shutdown)
    ├── app.js                 Express app: security, CORS, routes, error handling
    ├── config/
    │   ├── env.js             reads and validates environment variables
    │   ├── admin.js           the hardcoded admin passcode
    │   ├── db.js              MongoDB connection
    │   └── b2.js              Backblaze B2 (S3-compatible) client
    ├── models/                Mongoose models + index.js section registry
    ├── routes/                content.routes.js, admin.routes.js
    ├── controllers/           content, admin (CRUD) and upload handlers
    ├── middleware/            passcode check, rate limits, multer upload, errors
    ├── services/              storage.service.js (B2), media.service.js (cleanup)
    ├── utils/                 slugify, video URL helpers, ApiError, asyncHandler
    ├── scripts/seed.js        npm run seed / seed:reset
    └── data/seed-content.json starter content
```

## Deploying

- Set `NODE_ENV=production`, `MONGODB_URI`, the `B2_*` values and `CLIENT_ORIGIN`
  (your real frontend URL) in your host's environment settings.
- Behind a proxy (Render, Railway, Nginx...) leave `TRUST_PROXY` at its default of 1
  so rate limiting sees real client IPs.
- Uploads are staged in the OS temp directory before being sent to B2, so the host
  needs a writable temp dir (standard on VPS/container hosts; not available on
  most serverless platforms).
