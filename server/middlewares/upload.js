import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (req.params.id) {
            const filePath = path.join(uploadPath, `${req.params.id}.png`);
            // Check if the file exists
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    // File exists, delete it
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            cb(unlinkErr);
                        } else {
                            cb(null, `${req.params.id}.png`);
                        }
                    });
                } else {
                    cb(null, `${req.params.id}.png`);
                }
            });
        } else {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

export default upload;
