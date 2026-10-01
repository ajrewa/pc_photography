import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env.js";

/**
 * Backblaze B2 through its S3-compatible API.
 * `s3` is null when the B2_* variables are missing, so the rest of the API
 * still works (only uploads are disabled).
 */
export const s3 = env.b2.configured
  ? new S3Client({
      region: env.b2.region,
      endpoint: env.b2.endpoint,
      // forcePathStyle: true,
      credentials: {
        accessKeyId: env.b2.keyId,
        secretAccessKey: env.b2.applicationKey,
      },
      // Newer AWS SDK versions add CRC32 checksum headers by default, which
      // B2's S3 API does not accept. Only send checksums when required.
      requestChecksumCalculation: "WHEN_REQUIRED",
      responseChecksumValidation: "WHEN_REQUIRED",
    })
  : null;
