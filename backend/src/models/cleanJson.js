/**
 * Shapes documents for API responses: `_id` becomes a string `id`
 * (the frontend's IndiaFilm type already expects `id`) and `__v` is dropped.
 */
export function cleanJson(schema) {
  schema.set("toJSON", {
    versionKey: false,
    transform(_doc, ret) {
      ret.id = String(ret._id);
      delete ret._id;
      return ret;
    },
  });
}

export const required = (label) => [true, `${label} is required.`];
