const multer = require("multer");

const imagesPath = './public/images/'
const pdfPath = './public/pdf/'

// multer({ dest: imagesPath });
// multer({ dest: pdfPath });

const imageStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log("imagesPath", imagesPath, file)
        callback(null, imagesPath)
    },
    filename: (req, file, callback) => {
        callback(null, `profile_${new Date().getDate()}_${file.originalname}`);
    }
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, imagesPath)
    },
    filename: (req, file, callback) => {
        callback(null, `profile_${new Date().getDate()}_${file.originalname}`);
    }
});

const uploadImage = multer({ storage: imageStorage });
const uploadPDF = multer({ storage: pdfStorage });

module.exports = {
    uploadImage,
    uploadPDF
}