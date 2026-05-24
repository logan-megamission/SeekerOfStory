import { getStore } from "@netlify/blobs";

export const FOUNDER_PHOTOS_STORE = "founder-photos";

export function founderPhotoPublicUrl(blobKey: string): string {
  return `/api/blobs/founders/${encodeURIComponent(blobKey)}`;
}

export function getFounderPhotosStore() {
  return getStore({ name: FOUNDER_PHOTOS_STORE, consistency: "strong" });
}

export async function uploadFounderPhotoToBlob(
  file: File,
  founderId: string
): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const key = `founder-${founderId}-${Date.now()}.${ext}`;
  const contentType =
    file.type || (ext === "jpg" ? "image/jpeg" : ext === "png" ? "image/png" : `image/${ext}`);

  const store = getFounderPhotosStore();
  const data = await file.arrayBuffer();

  await store.set(key, data, {
    metadata: { contentType },
  });

  return founderPhotoPublicUrl(key);
}
