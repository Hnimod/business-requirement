"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const MIME_TYPE_MAP = {
    'image/png': '.png',
    'image/jpeg': '.jpeg',
    'image/jpg': '.jpg',
};
dotenv_1.default.config();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2',
});
const s3 = new aws_sdk_1.default.S3({});
const fileUpload = multer_1.default({
    limits: { fileSize: 500000 },
    storage: multer_s3_1.default({
        s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read-write',
        key(req, file, cb) {
            const extension = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid_1.v4() + extension);
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
exports.default = fileUpload;
//# sourceMappingURL=s3Upload.js.map