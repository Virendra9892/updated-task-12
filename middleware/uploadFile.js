const multer = require("multer");

const fileFiter = (req,file,cb)=>{
    // console.log("iinnn");
    if(file.mimetype=="image/jpg"||file.mimetype=="image/png"||file.mimetype=="image/jpeg"){
        cb(null,true);
    }
    else{
        cb("Please upload only image file.");
    }
}

const storage = multer.diskStorage({
    filename:(req,file,cb)=>{
        const extArray = file.originalname.split(".");
        const extention = extArray[extArray.length - 1];
        cb(null,`${Date.now()}_${extArray[0]?extArray[0]:""}.${extention}`);
    },
    destination:(req, file, cb) => {
                cb(null, "public/images")
            }
})

const uploadFile = multer({storage:storage,fileFilter:fileFiter});
const multiUpload = uploadFile.fields([{name:"image",maxCount:1}]);
module.exports = multiUpload;