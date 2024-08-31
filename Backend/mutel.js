   const multer = require('multer');
   const path = require('path');

   const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, 'uploads/') // make sure this directory exists
     },
     filename: function (req, file, cb) {
       cb(null, Date.now() + path.extname(file.originalname))
     }
   });

   const fileFilter = (req, file, cb) => {
     if (file.fieldname === 'image') { // important line
       if (file.mimetype.startsWith('image/')) {
         cb(null, true);
       } else {
         cb(new Error('Not an image! Please upload an image.'), false);
       }
     } else {
       cb(new Error('Unexpected field'), false);
     }
   };

   const upload = multer({ 
     storage: storage,
     fileFilter: fileFilter
   });

   module.exports = upload;