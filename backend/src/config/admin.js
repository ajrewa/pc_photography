/**
 * Admin passcode.
 *
 * There are no user accounts or tokens in this project. The admin panel asks
 * for this passcode and sends it with every write request; the API compares it
 * against the value below.
 *
 * >>> CHANGE THIS before you deploy. <<<
 * (Setting an ADMIN_PASSCODE environment variable overrides it, if you would
 * rather not keep it in the code.)
 */
export const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "PC@admin2026";
