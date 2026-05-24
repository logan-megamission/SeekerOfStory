import { getFounderPhotosStore } from "@/lib/founder-blobs";

type Props = { params: Promise<{ key: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { key } = await params;
  const blobKey = decodeURIComponent(key);

  const store = getFounderPhotosStore();
  const entry = await store.getWithMetadata(blobKey, { type: "arrayBuffer" });

  if (!entry?.data) {
    return new Response("Not found", { status: 404 });
  }

  const contentType =
    typeof entry.metadata?.contentType === "string"
      ? entry.metadata.contentType
      : "image/jpeg";

  return new Response(entry.data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
