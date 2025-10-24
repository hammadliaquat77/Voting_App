import multer from "multer";

const storage  = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/uploads");
    },
    filename: function (req, file , cb) {
        const uniqueName = Date.now() + "_" + file.originalname;
        cb(null, uniqueName);
    }
})


const upload = multer({storage: storage});
export default upload;