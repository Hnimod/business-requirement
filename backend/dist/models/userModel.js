"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    species: {
        type: String,
        required: true,
        enum: ['Human', 'Humanoid', 'Aliens'],
    },
    race: { type: String, required: true },
    born: { type: String, required: true },
    homeworld: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    height: { type: String, required: true },
    mass: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Number, default: Date.now() },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map