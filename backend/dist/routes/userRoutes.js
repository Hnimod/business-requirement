"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControler_1 = require("../controllers/userControler");
// import fileUpload from '../utils/s3Upload';
const router = express_1.default.Router();
router.post('/signup', userControler_1.signup);
router.get('/', userControler_1.getAllUsers);
router.delete('/:id', userControler_1.deleteUser);
router.patch('/:id', userControler_1.updateUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map