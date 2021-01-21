import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  species: string;
  race: string;
  born: string;
  homeworld: string;
  gender: string;
  height: string;
  mass: string;
  avatar?: string;
}

const UserSchema: Schema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User: Model<IUser> = mongoose.model('User', UserSchema);
export default User;
