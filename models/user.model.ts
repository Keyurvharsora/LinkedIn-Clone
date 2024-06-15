import mongoose, { Model } from "mongoose";
import { Document } from "mongoose";

export interface IUser {
    firstName: string,
    lastName: string,
    userId: string,
    profilePhoto?: string,
    bio?: string
}
export interface IUserDocument extends IUser,Document{
    createdAt:Date,
    updatedAt:Date
}

const userSchema = new mongoose.Schema<IUserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    }
}, { timestamps: true })

export const User : Model<IUserDocument> = mongoose.models?.User || mongoose.model<IUserDocument>("USer", userSchema);