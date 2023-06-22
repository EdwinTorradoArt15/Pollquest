import { v2 } from 'cloudinary';

export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const uploadImage = await v2.uploader.upload(file.path);
    return uploadImage.secure_url;
  }
}
