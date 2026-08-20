const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

export interface CloudinaryUploadResult {
  url: string;
  fileName: string;
  publicId: string;
  resourceType: string;
  bytes: number;
}

// Direct fetch() upload — never the Cloudinary SDK, matching PenWork4Me.
// resource_type: "auto" means this one function handles project
// screenshots, the resume PDF, and marketplace .zip files alike.
export async function uploadToCloudinary(
  file: File
): Promise<CloudinaryUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  // Cloudinary's generated public IDs are unreadable. A sanitized original
  // filename keeps documents understandable in the Media Library and at delivery.
  const readableName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "file";
  formData.append("public_id", `${readableName}-${Date.now()}${file.name.match(/\.[^/.]+$/)?.[0] ?? ""}`);
  formData.append("filename_override", file.name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cloudinary upload failed (${res.status}): ${errText}`);
  }

  const data = await res.json();

  return {
    url: data.secure_url,
    fileName: file.name,
    publicId: data.public_id,
    resourceType: data.resource_type,
    bytes: data.bytes,
  };
}
