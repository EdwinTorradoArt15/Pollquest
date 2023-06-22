/// <reference types="multer" />
export declare class CloudinaryService {
    constructor();
    uploadImage(file: Express.Multer.File): Promise<string>;
}
