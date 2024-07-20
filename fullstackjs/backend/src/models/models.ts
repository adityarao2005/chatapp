export interface IUser {
    name: string;
    email: string;
    username: string;
    verified: boolean;
    profile_id: string;
    auth_id: string;
}

export interface IProfile {
    bio: string;
    profile_picture: string;
}

export interface IAuth {
    salt: string;
    hash: string;
}

export interface IGroupChat {
    name: string;
    members: string[];
    owner: string;
}

export interface IMessage {
    sender: string;
    message: string;
    timestamp: Date;
}

import { Schema, model } from 'mongoose';

// Schemas
const UserSchema = new Schema<IUser>({
    name: String,
    email: String,
    username: String,
    verified: Boolean,
    profile_id: String,
    auth_id: String,
});

const ProfileSchema = new Schema<IProfile>({
    bio: String,
    profile_picture: String
});

const AuthSchema = new Schema<IAuth>({
    salt: String,
    hash: String
});

const GroupChatSchema = new Schema<IGroupChat>({
    name: String,
    members: [String],
    owner: String
});

const MessageSchema = new Schema<IMessage>({
    sender: String,
    message: String,
    timestamp: Date
});

// Models
export const User = model<IUser>('User', UserSchema);
export const Profile = model<IProfile>('Profile', ProfileSchema);
export const Auth = model<IAuth>('Auth', AuthSchema);
export const GroupChat = model<IGroupChat>('GroupChat', GroupChatSchema);
export const Message = model<IMessage>('Message', MessageSchema);
