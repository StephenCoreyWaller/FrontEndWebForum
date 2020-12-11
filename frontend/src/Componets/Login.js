import React, { useState, useEffect } from 'react';
import Request from '../Connections/ApiConnection';
import { Form, Button, Message, Segment } from 'semantic-ui-react';

const Login = ({ setToken }) => {
	const [loginSuccess, setloginSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState({
		message: '',
		isError: false,
	});
	const [User, setUser] = useState({
		UserName: '',
		Password: '',
	});
	const handleChange = (event) => {
		setUser({ ...User, [event.target.name]: event.target.value });
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setloginSuccess(true);
	};
	useEffect(() => {
		if (loginSuccess) {
			const login = async () =>
				await Request.post('/auth/login', User)
					.then((response) => {
						setToken(response.data.data);
						setUser({ UserName: '', Password: '' });
						setErrorMessage({ isError: false, message: '' });
					})
					.catch((error) => {
						setErrorMessage({
							isError: true,
							message: error.response.data.message,
						});
					});
			login();
		}
		return () => {
			setloginSuccess(false);
		};
	}, [loginSuccess, setToken, User]);
	return (
		<Segment textAlign={'center'} style={{ width: '300px' }}>
			<Form error={errorMessage.isError} onSubmit={onSubmit} widths={'equal'}>
				<Message error content={errorMessage.message} />
				<h3>Login</h3>

				<Form.Group>
					<Form.Input
						value={User.UserName}
						name='UserName'
						onChange={handleChange}
						type='text'
						placeholder='User Name'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						value={User.Password}
						name='Password'
						onChange={handleChange}
						type='password'
						placeholder='Password'
					/>
				</Form.Group>

				<Button positive>Submit</Button>
			</Form>
		</Segment>
	);
};
export default Login;
