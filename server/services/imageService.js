import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload = multer({ dest: 'uploads/' })

const storeImage = (uploadFile)=>{
    upload.single(uploadFile);
}

export {storeImage};