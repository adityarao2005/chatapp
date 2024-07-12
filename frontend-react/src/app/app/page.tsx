import React from 'react';
import NavigationPanel from '@/components/navigation-panel';
import FriendsPanel from '@/components/friends-panel';
import ChatPanel from '@/components/chat-panel';

export default function MainPage() {
	return (
		<div className="w-screen h-screen flex md:flex-row">
			<NavigationPanel />
			<FriendsPanel />
			<ChatPanel />
		</div>
	);
}
