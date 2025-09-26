import { useState, useRef, useCallback } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import { uploadImage } from '../lib/uploadImage';
import toast from 'react-hot-toast';
import 'react-image-crop/dist/ReactCrop.css';

// Helper function to create a crop with aspect ratio 1:1 (square)
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop({
      unit: '%',
      width: 90,
    }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  )
}

const ImageCropperUpload = ({ onImageUploaded, onImageUrlChange }) => {
  const [imageSrc, setImageSrc] = useState('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1); // 1:1 aspect ratio for square crop
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [showCropper, setShowCropper] = useState(false);
  const [originalImageType, setOriginalImageType] = useState('image/png');

  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef('');

  // Handle file selection
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Validate that it's an image of any subtype
      if (!selectedFile.type || !selectedFile.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setOriginalImageType(selectedFile.type);

      // Direct upload without crop/scale
      setUploading(true);
      (async () => {
        try {
          const imageUrl = await uploadImage(selectedFile);
          if (imageUrl) {
            setUploadedImageUrl(imageUrl);
            onImageUploaded?.(imageUrl);
            onImageUrlChange?.(imageUrl);
            toast.success('Image uploaded successfully!');
            const sizeInKB = (selectedFile.size / 1024).toFixed(2);
            toast.success(`Size: ${sizeInKB} KB`);
          } else {
            toast.error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error('Failed to upload image');
        } finally {
          setUploading(false);
        }
      })();
    }
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  // Convert canvas to blob preserving format when possible; fallback to PNG
  const canvasToBlob = (canvas, mimeType = 'image/png', quality = 0.95) => {
    const supportedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const targetType = supportedTypes.includes(mimeType) ? (mimeType === 'image/jpg' ? 'image/jpeg' : mimeType) : 'image/png';
    return new Promise((resolve) => {
      try {
        canvas.toBlob((blob) => {
          if (!blob && targetType !== 'image/png') {
            // Retry with PNG if browser doesn't support requested type
            canvas.toBlob(resolve, 'image/png');
            return;
          }
          resolve(blob);
        }, targetType, quality);
      } catch (_) {
        // Fallback to PNG on any error
        canvas.toBlob(resolve, 'image/png');
      }
    });
  };

  // Generate cropped image
  const getCroppedImg = useCallback(async () => {
    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!image || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    // Set canvas size to 600x600
    const targetSize = 600;
    canvas.width = targetSize;
    canvas.height = targetSize;

    const pixelCrop = convertToPixelCrop(
      completedCrop,
      image.naturalWidth,
      image.naturalHeight,
    );

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the cropped image onto canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      targetSize,
      targetSize
    );

    // Convert to blob preserving original format when possible
    return await canvasToBlob(canvas, originalImageType || 'image/png', 0.95);
  }, [completedCrop]);


  // Handle crop and upload
  const handleCropAndUpload = async () => {
    if (!completedCrop) {
      toast.error('Please select a crop area first');
      return;
    }

    setUploading(true);

    try {
      // Generate cropped image blob
      const croppedBlob = await getCroppedImg();

      if (!croppedBlob) {
        toast.error('Failed to generate cropped image');
        return;
      }

      // Create proper file name with extension derived from mime type (fallback png)
      const mime = (originalImageType || 'image/png').toLowerCase();
      const extFromMime = mime.startsWith('image/') ? mime.split('/')[1].replace('jpeg', 'jpg') : 'png';
      const fileExtension = extFromMime || 'png';
      const fileName = `product-image-${Date.now()}.${fileExtension}`;

      // Ensure blob is valid
      if (!croppedBlob || croppedBlob.size === 0) {
        toast.error('Failed to create image blob');
        return;
      }

      console.log('Cropped blob size:', croppedBlob.size, 'bytes');
      console.log('Original image type:', originalImageType);

      // Create File object from blob with correct type
      const croppedFile = new File([croppedBlob], fileName, {
        type: croppedBlob.type || originalImageType || 'image/png',
        lastModified: Date.now(),
      });

      // Log file details for debugging
      console.log('Created file:', {
        name: croppedFile.name,
        size: croppedFile.size,
        type: croppedFile.type,
        lastModified: croppedFile.lastModified,
        instanceof: croppedFile instanceof File
      });

      // Upload the cropped image directly
      const imageUrl = await uploadImage(croppedFile);

      if (imageUrl) {
        setUploadedImageUrl(imageUrl);
        onImageUploaded?.(imageUrl);
        onImageUrlChange?.(imageUrl);
        toast.success('Image uploaded successfully!');

        // Clean up
        setShowCropper(false);
        setImageSrc('');

        // Show cropped file size
        const sizeInKB = (croppedFile.size / 1024).toFixed(2);
        toast.success(`Image uploaded successfully! Size: ${sizeInKB} KB`);
      } else {
        toast.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error in crop and upload:', error);
      toast.error('Failed to process image');
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (uploadedImageUrl) {
      navigator.clipboard.writeText(uploadedImageUrl).then(() => {
        toast.success('Image URL copied to clipboard!');
      });
    }
  };

  const resetCropper = () => {
    setShowCropper(false);
    setImageSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    setOriginalImageType('image/png');
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg dark:bg-gray-800">
      <h3 className="text-lg font-semibold mb-4">Upload Image</h3>

      {/* File Input */}
      {!showCropper && (
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:border-primary focus:outline-none transition-colors"
          />
          <p className="text-sm text-gray-500 mt-2">
            Select any image to upload it directly
          </p>
        </div>
      )}

      {/* Image Cropper removed (upload happens immediately) */}

      {/* Uploaded Image Preview */}
      {uploadedImageUrl && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">
            ✅ Image uploaded successfully!
          </h4>

          <div className="flex flex-col gap-3">
            <img
              src={uploadedImageUrl}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700 mx-auto"
            />

            <div className="flex gap-2">
              <input
                type="text"
                value={uploadedImageUrl}
                readOnly
                className="flex-1 p-2 text-sm border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-600 text-gray-600 dark:text-gray-400"
              />
              <button
                onClick={copyToClipboard}
                className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
          📝 How it works:
        </h5>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Select an image from your device (any common format)</li>
          <li>• The image is uploaded as-is without cropping or scaling</li>
          <li>• Copy and paste the generated URL into your product form</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCropperUpload;