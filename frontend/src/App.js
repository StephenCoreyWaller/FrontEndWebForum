import React, { useState } from 'react';
import { Container, Menu, Segment } from 'semantic-ui-react';
import SignUp from './Componets/Signup';
import Signup from './Componets/Signup';
import Login from './Componets/Login';
import Thread from './Componets/Threads';

const App = () => {
	const [token, setToken] = useState('');
	const [picker, setPicker] = useState('');
	const loginSetTokenCallback = (token) => {
		setToken(token);
	};
	const handleItemClick = (e, { name }) => setPicker(name);
	return (
		<Container>
			<Menu pointing secondary>
				<Menu.Item color='teal' header>
					Stephen Waller
				</Menu.Item>
				<Menu.Item
					onClick={handleItemClick}
					active={picker === 'About Me'}
					name='About Me'
				/>
				<Menu.Item
					onClick={handleItemClick}
					active={picker === 'Forum'}
					name='Forum'
				/>
				{/* change the function to reveal based on sign in or login  */}
				<Menu.Item
					onClick={handleItemClick}
					active={picker === 'Sign Out'}
					position='right'
					name='Sign Out'
				/>
			</Menu>

			{token === '' && <Login setToken={loginSetTokenCallback} />}
			{/* <Thread token={token} /> */}
			{/* <SignUp /> */}
		</Container>
	);
};
export default App;
