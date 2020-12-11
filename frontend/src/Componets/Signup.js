//Componet for the webForum signin page
import React, { useState } from 'react';
import { Form, Button, Grid, Message } from 'semantic-ui-react';
import Request from '../Connections/ApiConnection';

const SignUp = () => {
	const [password2, SetPassword2] = useState(false);
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
				})
			)
			.catch((error) => {
				setErrorMessage({
					message: error.response.data.message,
					isError: true,
				});
			});
	};

	return (
		<Grid centered columns={4}>
			<Form
				error={errorMessage.isError}
				onSubmit={onSubmitHandler}
				widths='equal'
			>
				<Message error content={errorMessage.message} />
				<Form.Group>
					<Form.Input
						value={User.UserName}
						name='UserName'
						onChange={handleChange}
						placeholder='User Name'
						required
					/>
				</Form.Group>
				<Form.Group>
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
				</Form.Group>
				<Form.Group>
					<Form.TextArea
						value={User.AboutMe}
						name='AboutMe'
						onChange={handleChange}
						placeholder='AboutMe'
						placeholder='Tell me more about you...'
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						value={User.Email}
						name='Email'
						onChange={handleChange}
						placeholder='Email'
						required
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						value={User.Password}
						name='Password'
						onChange={handleChange}
						type='password'
						placeholder='Password'
						required
						error={errorMessage.message === 'Passwords do not match'}
					/>
					<Form.Input
						value={password2}
						name='Password2'
						onChange={(e) => SetPassword2(e.target.value)}
						type='password'
						placeholder='Confirm Password'
						required
						error={errorMessage.message === 'Passwords do not match'}
					/>
				</Form.Group>
				<Button
					positive
					disabled={
						!User.Email || !User.Password || !password2 || !User.UserName
					}
				>
					Submit
				</Button>
			</Form>
		</Grid>
	);
};
export default SignUp;
