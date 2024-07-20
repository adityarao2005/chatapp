import { SessionizedRequest } from '@/middleware/session';
import { GroupChat, IUser, Profile, User } from '@/models/models';
import express from 'express';
import { HydratedDocument, Model, Types } from 'mongoose';

interface IUserData {
	id: string;
	name: string;
	email: string;
	username: string;
	verified: boolean;
	bio: string;
	profile_picture: string;
}

async function IUserData(user: HydratedDocument<IUser>) {
	const profile = await Profile.findById(user.profile_id);
	return {
		id: user._id.toString(),
		name: user.name,
		email: user.email,
		username: user.username,
		verified: user.verified,
		bio: profile!.bio,
		profile_picture: profile!.profile_picture
	}
}

class UserAccessController {

	// Gets all teh users
	async users(req: express.Request, res: express.Response) {
		const users = await User.find();
		const usersData = await Promise.all(users.map(async user => await IUserData(user)));
		res.status(200).json(usersData)
	}

	// Gets the user by id
	async user(req: express.Request, res: express.Response) {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(await IUserData(user));
	}

	// Gets the current user
	async me(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(await IUserData(user));
	}

	// Gets the group chats of teh current user
	async groupChats(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChats = await GroupChat.find().where('members').in([user._id]);
		res.status(200).json(groupChats);
	}

	// Gets the group chat by id
	async groupChat(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChat = await GroupChat.findById(req.params.id).where('members').in([user._id]);

		if (!groupChat) {
			return res.status(404).json({ message: 'Group chat not found' });
		}

		res.status(200).json(groupChat);
	}

	// Creates a group chat wiht current user being owner
	async createGroupChat(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChat = await GroupChat.create({
			name: req.body.name,
			members: [user._id],
			owner: user._id
		});

		res.status(200).json(groupChat);
	}

	// Adds a member to the group chat
	async addGroupChatMember(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChat = await GroupChat.findById(req.params.id).where('members').in([user._id]).where('owner').equals(user._id);

		if (!groupChat) {
			return res.status(404).json({ message: 'Group chat not found' });
		}

		const member = await User.findById(req.body.member_id);

		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		groupChat.members.push(member._id.toString());

		await groupChat.save();
	}

	// Removes a member from the group chat
	async removeGroupChatMember(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChat = await GroupChat.findById(req.params.id).where('members').in([user._id]).where('owner').equals(user._id);

		if (!groupChat) {
			return res.status(404).json({ message: 'Group chat not found' });
		}

		const member = await User.findById(req.body.member_id);

		if (!member) {
			return res.status(404).json({ message: 'Member not found' });
		}

		groupChat.members = groupChat.members.filter(member => member.toString() !== req.body.member_id);

		await groupChat.save();
	}

	// Deletes the group chat
	async deleteGroupChat(req: SessionizedRequest, res: express.Response) {
		const user = req.session && await User.findOne({ email: req.session.email, username: req.session.username });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const groupChat = await GroupChat.findById(req.params.id).where('members').in([user._id]).where('owner').equals(user._id);

		if (!groupChat) {
			return res.status(404).json({ message: 'Group chat not found' });
		}

		groupChat.deleteOne();
	}

}

export default new UserAccessController();