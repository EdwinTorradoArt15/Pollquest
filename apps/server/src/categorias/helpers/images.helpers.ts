export const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Solo se permiten imagenes'), false);
  }

  callback(null, true);
};
