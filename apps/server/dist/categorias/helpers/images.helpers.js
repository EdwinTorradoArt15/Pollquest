"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se permiten imagenes'), false);
    }
    callback(null, true);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=images.helpers.js.map