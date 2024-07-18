import { Schema, model, connect } from 'mongoose';
import { IUser, IAuth, IProfile } from '@/db/data';

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

// Connect to the database

connect(
	`${process.env.MONGODB_URL}`).then(() => {
		console.log('CONNECTED TO MONGODB');
	}).catch(
		(err) => {
			console.error('FAILED TO CONNECT TO MONGODB');
			console.error('FAILED TO CONNECT TO MONGODB');
			console.error('FAILED TO CONNECT TO MONGODB');
			console.error('FAILED TO CONNECT TO MONGODB');
			console.error('FAILED TO CONNECT TO MONGODB');

			console.error(err);
		});
