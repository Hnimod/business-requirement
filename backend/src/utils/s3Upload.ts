import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

interface mimeMap {
  [key: string]: string;
}

const MIME_TYPE_MAP: mimeMap = {
  'image/png': '.png',
  'image/jpeg': '.jpeg',
  'image/jpg': '.jpg',
};

dotenv.config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

const s3 = new aws.S3({});

const fileUpload = multer({
  limits: { fileSize: 500000 },
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET as string,
    acl: 'public-read-write',
    key(req, file, cb) {
      const extension = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuidv4() + extension);
    },
  }),

  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (!isValid) {
      return cb(new Error('Invalid mime type'));
    }
    cb(null, isValid);
  },
});

export default fileUpload;
