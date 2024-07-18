

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