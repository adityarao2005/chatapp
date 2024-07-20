import { connect } from 'mongoose';

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
