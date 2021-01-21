"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = exports.signup = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userModel_1 = __importDefault(require("../models/userModel"));
const appError_1 = __importDefault(require("../utils/appError"));
exports.signup = catchAsync_1.default(async (req, res, next) => {
    const newUser = await userModel_1.default.create({
        name: req.body.name,
        email: req.body.email,
        species: req.body.species,
        race: req.body.race,
        born: req.body.born,
        homeworld: req.body.homeworld,
        gender: req.body.gender,
        height: req.body.height,
        mass: req.body.mass,
        avatar: req.body.avatar,
    });
    res.status(200).json({
        status: 'success',
        data: { newUser },
    });
});
exports.getAllUsers = catchAsync_1.default(async (req, res, next) => {
    const users = await userModel_1.default.find();
    res.status(200).json({
        status: 'success',
        data: { nbResults: users.length, users },
    });
});
exports.deleteUser = catchAsync_1.default(async (req, res, next) => {
    const user = await userModel_1.default.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new appError_1.default('Could not find the document with that ID', 404));
    }
    res.status(204).json({});
});
exports.updateUser = catchAsync_1.default(async (req, res, next) => {
    const user = await userModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        return next(new appError_1.default('Could not find the document with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { user },
    });
});
//# sourceMappingURL=userControler.js.map