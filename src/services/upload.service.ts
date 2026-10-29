import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary.js";

async function uploadToCloudinary(
  file: Express.Multer.File,
  folderPath: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: folderPath },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      },
    );
    stream.end(file?.buffer);
  });
}

async function uploadUserImageInCloudinary(file: Express.Multer.File) {
  return uploadToCloudinary(file, "pastportals/users");
}

async function uploadArtifactImageInCloudinary(file: Express.Multer.File) {
  return uploadToCloudinary(file, "pastportals/artifacts");
}

export const UploadService = {
  uploadArtifactImageInCloudinary,
  uploadUserImageInCloudinary,
};
