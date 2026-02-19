import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { adminApi } from '../../api/adminClient';

interface ImageUploadProps {
  onUpload: (urls: { url: string; order: number }[]) => void;
  existingImages?: { url: string; order: number }[];
}

export default function ImageUpload({ onUpload, existingImages = [] }: ImageUploadProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const uploadMutation = useMutation({
    mutationFn: (files: File[]) => adminApi.upload.images(files),
    onSuccess: (response) => {
      const uploadedImages = response.data.data.images.map((img: any, index: number) => ({
        url: img.original,
        order: index,
      }));
      onUpload([...existingImages, ...uploadedImages]);
      setFiles([]);
      setPreviewUrls([]);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);

      // Create previews
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...newPreviews]);
    }
  };

  const handleUpload = () => {
    if (files.length > 0) {
      uploadMutation.mutate(files);
    }
  };

  const handleRemoveImage = (index: number, isPreview: boolean) => {
    if (isPreview) {
      setFiles(files.filter((_, i) => i !== index));
      setPreviewUrls(previewUrls.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Rasmlar tanlash
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {uploadMutation.isPending ? 'Yuklanmoqda...' : `Yuklash (${files.length})`}
          </button>
        )}
      </div>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {existingImages.map((img, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
              <img src={img.url} alt={`Product ${index}`} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Images */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
              <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              <button
                onClick={() => handleRemoveImage(index, true)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                Preview
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
