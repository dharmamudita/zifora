/**
 * Cloudinary Upload Helper for ZIFORA Admin
 * Supports unsigned preset upload directly from frontend to Cloudinary CDN
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzifora';
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'zifora_presets';

export interface UploadResult {
  url: string;
  publicId: string;
  format?: string;
  width?: number;
  height?: number;
}

export async function uploadToCloudinary(file: File): Promise<UploadResult> {
  // If credentials are setup, perform real upload to Cloudinary API
  if (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'zifora_programs');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      return {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        width: data.width,
        height: data.height,
      };
    } catch (err) {
      console.warn('Cloudinary upload error, using local object fallback:', err);
    }
  }

  // Graceful competition/demo fallback using local data URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        publicId: `zifora_demo_${Date.now()}`,
      });
    };
    reader.readAsDataURL(file);
  });
}
