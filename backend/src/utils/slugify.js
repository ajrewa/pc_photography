/**
 * "Arya & Federico" -> "arya-federico"
 * ("&" is dropped rather than spelled out, to match the slugs already used on the site.)
 */
export function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Returns `base`, or `base-2`, `base-3`... until it is unused in the collection. */
export async function uniqueSlug(Model, base) {
  const root = base || "item";
  let slug = root;
  let n = 1;
  while (await Model.exists({ slug })) {
    n += 1;
    slug = `${root}-${n}`;
  }
  return slug;
}
