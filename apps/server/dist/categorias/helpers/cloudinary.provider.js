"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
exports.CloudinaryProvider = {
    provide: 'Cloudinary',
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'edwintorrado',
            api_key: '967816159971617',
            api_secret: 'pO5_BS3I1adSByzd3n8h9N5ERWM',
        });
    },
};
//# sourceMappingURL=cloudinary.provider.js.map