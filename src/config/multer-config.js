const multer  = require('multer');
const fs = require('fs');
const path = './uploadFiles';
if (!fs.existsSync(path)) {
  fs.mkdirSync(path);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadFiles/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
   });

module.exports=upload;