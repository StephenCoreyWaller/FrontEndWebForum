import React, { useState, useEffect } from 'react';
import Request from '../Connections/ApiConnection';
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
} from 'semantic-ui-react';

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
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 350 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to your account
				</Header>
				<Form error={errorMessage.isError} onSubmit={onSubmit}>
					<Message error content={errorMessage.message} />
					<Segment>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='User Name'
							value={User.UserName}
							name='UserName'
							onChange={handleChange}
							type='text'
						/>
						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							value={User.Password}
							name='Password'
							onChange={handleChange}
						/>

						<Button color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
				<Message>
					New to me? <a href='#'>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};
export default Login;
