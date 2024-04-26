import multer from "multer";

const storage = multer.memoryStorage(); // You can customize storage options
const upload = multer({ storage: storage });

export default upload;
