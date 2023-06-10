import { v2, ConfigOptions } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'edwintorrado',
      api_key: '967816159971617',
      api_secret: 'pO5_BS3I1adSByzd3n8h9N5ERWM',
    });
  },
};
