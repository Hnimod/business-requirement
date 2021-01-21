"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userModel_1 = __importDefault(require("../models/userModel"));
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
//# sourceMappingURL=userControler.js.map