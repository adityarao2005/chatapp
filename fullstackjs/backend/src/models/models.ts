import { IUser } from "@/models/user";
import { IProfile } from "@/models/profile";
import { IAuth } from "@/models/auth";
import { Schema, model } from 'mongoose';

export { IUser, IProfile, IAuth };

// Schemas
const UserSchema = new Schema<IUser>({
    name: String,
    email: String,
    username: String,
    verified: Boolean,
    profile_id: String,
    auth_id: String
});

const ProfileSchema = new Schema<IProfile>({
    bio: String,
    profile_picture: String
});

const AuthSchema = new Schema<IAuth>({
    salt: String,
    hash: String
});

// Models
export const User = model<IUser>('User', UserSchema);
export const Profile = model<IProfile>('Profile', ProfileSchema);
export const Auth = model<IAuth>('Auth', AuthSchema);
