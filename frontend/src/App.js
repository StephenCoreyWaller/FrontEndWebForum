import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
// import Signup from './Componets/Signup';
import Login from './Componets/Login';

const App = () => {
	const [token, setToken] = useState('');
	const loginSetTokenCallback = (token) => {
		setToken(token);
	};
	return (
		<Container>
			{token === '' && <Login setToken={loginSetTokenCallback} />}
			<h2>{token}</h2>
		</Container>
	);
};
export default App;
