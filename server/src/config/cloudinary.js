import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadToCloudinary = async (fileBuffer, folder = 'sskk') => {
  try {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          transformation: [
            { quality: 'auto:best' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
            });
          }
        }
      );
      stream.end(fileBuffer);
    });
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

export const uploadMultipleToCloudinary = async (files, folder = 'sskk') => {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, folder)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    throw new Error(`Multiple Cloudinary upload failed: ${error.message}`);
  }
};

export default cloudinary;
