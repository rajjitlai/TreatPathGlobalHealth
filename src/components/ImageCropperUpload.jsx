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
      
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(selectedFile.type)) {
        toast.error('Please select only JPG or PNG images');
        return;
      }
      
      setCrop(undefined); // Makes crop preview update between images.
      setOriginalImageType(selectedFile.type); // Store original image type
      
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || '');
        setShowCropper(true);
      });
      reader.readAsDataURL(selectedFile);
    }
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  // Convert canvas to blob preserving format
  const canvasToBlob = (canvas, mimeType = 'image/png', quality = 0.95) => {
    return new Promise((resolve) => {
      if (mimeType === 'image/jpeg' || mimeType === 'image/jpg') {
        canvas.toBlob(resolve, 'image/jpeg', quality);
      } else {
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

    // Convert to blob preserving original format
    return await canvasToBlob(canvas, originalImageType, 0.95);
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

      // Create proper file name with correct extension
      const fileExtension = originalImageType === 'image/png' ? 'png' : 'jpg';
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
        type: originalImageType,
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
      <h3 className="text-lg font-semibold mb-4">Upload & Optimize Image</h3>
      
      {/* File Input */}
      {!showCropper && (
        <div className="mb-4">
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            onChange={onSelectFile}
            className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:border-primary focus:outline-none transition-colors"
          />
          <p className="text-sm text-gray-500 mt-2">
            Select a JPG or PNG image to crop it to 600×600 pixels
          </p>
        </div>
      )}

      {/* Image Cropper */}
      {showCropper && imageSrc && (
        <div className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Crop your image to 600×600</h4>
              <button
                onClick={resetCropper}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Choose different image
              </button>
            </div>
            
            <div className="max-w-md mx-auto">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                minWidth={100}
                minHeight={100}
                keepSelection
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imageSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                  className="max-w-full h-auto"
                />
              </ReactCrop>
            </div>

            {/* Crop Controls */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Scale:</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">{scale}x</span>
              </div>
              
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Rotate:</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotate}
                  onChange={(e) => setRotate(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">{rotate}°</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCropAndUpload}
                disabled={uploading || !completedCrop}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {uploading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  'Crop & Upload Image'
                )}
              </button>
              
              <button
                onClick={resetCropper}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
          <li>• Select a JPG or PNG image from your device</li>
          <li>• Crop it to a perfect 600×600 square</li>
          <li>• Original image format will be preserved</li>
          <li>• Use scale and rotate controls to fine-tune</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCropperUpload;