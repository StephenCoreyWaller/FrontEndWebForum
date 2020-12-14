//Componet for the webForum signin page
import React, { useState } from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
} from 'semantic-ui-react';
import Request from '../Connections/ApiConnection';

const SignUp = () => {
	const [password2, SetPassword2] = useState('');
	const [errorMessage, setErrorMessage] = useState({
		message: '',
		isError: false,
	});
	const [User, setUser] = useState({
		UserName: '',
		LastName: '',
		FirstName: '',
		AboutMe: '',
		Email: '',
		Password: '',
	});
	const handleChange = (e) => {
		setUser({ ...User, [e.target.name]: e.target.value });
	};
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		if (password2 !== User.Password) {
			setErrorMessage({ message: 'Passwords do not match', isError: true });
			return;
		}
		await Request.post('/auth/Register', User)
			.then(
				setUser({
					UserName: '',
					LastName: '',
					FirstName: '',
					AboutMe: '',
					Email: '',
					Password: '',
				}),
				SetPassword2('')
			)
			.catch((error) => {
				setErrorMessage({
					message: error.response.data.message,
					isError: true,
				});
			});
	};

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Sign Up
				</Header>
				<Form
					size='large'
					error={errorMessage.isError}
					onSubmit={onSubmitHandler}
				>
					<Message error content={errorMessage.message} />
					<Segment>
						<Form.Input
							value={User.UserName}
							name='UserName'
							onChange={handleChange}
							placeholder='User Name'
						/>
						<Form.Input
							value={User.FirstName}
							name='FirstName'
							onChange={handleChange}
							placeholder='First Name'
						/>
						<Form.Input
							value={User.LastName}
							name='LastName'
							onChange={handleChange}
							placeholder='Last Name'
						/>
						<Form.TextArea
							value={User.AboutMe}
							name='AboutMe'
							onChange={handleChange}
							placeholder='AboutMe'
							placeholder='Tell me more about you...'
						/>
						<Form.Input
							value={User.Email}
							name='Email'
							onChange={handleChange}
							placeholder='Email'
						/>
						<Form.Input
							value={User.Password}
							name='Password'
							onChange={handleChange}
							type='password'
							placeholder='Password'
							error={errorMessage.message === 'Passwords do not match'}
						/>
						<Form.Input
							value={password2}
							name='password2'
							onChange={(e) => SetPassword2(e.target.value)}
							placeholder='Confirm Password'
							error={errorMessage.message === 'Passwords do not match'}
						/>

						<Button
							disabled={
								!User.Email || !User.Password || !password2 || !User.UserName
							}
							color='teal'
							size='large'
						>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};
export default SignUp;
