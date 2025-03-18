import multer from "multer";

const storage = multer.memoryStorage();
const uploadFile = multer({storage }).single("photo");
export default uploadFile;