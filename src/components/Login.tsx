import React from 'react';
import useInput from '../hooks/useInput';
import { useAppDispatch } from '../store/hooks';
import { fetchStudentData, projectActions } from '../store/project-slice';
import classes from './Login.module.css';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	const {
		value: studentName,
		isValid: studentNameIsValid,
		valueChangeHandler: studentNameChangeHandler,
		reset: resetStudentNameInput,
	} = useInput((value: string) => value.trim() !== '');

	let formIsValid = false;

	if (studentNameIsValid) {
		formIsValid = true;
	}

	const loginHandler = (event: React.FormEvent) => {
		event.preventDefault();

		if (!formIsValid) {
			alert('Please enter a valid student name');
			return;
		}

		dispatch(projectActions.IS_LOGGED_IN());
		dispatch(fetchStudentData(studentName));
		console.log(studentName);
		formReset();
	};

	const formReset = () => {
		resetStudentNameInput();
	};

	return (
		<div className={classes.login}>
			<div className="login-input">
				<label>Student Name:&nbsp;</label>
				<input
					type="text"
					value={studentName || ''}
					onChange={studentNameChangeHandler}
				/>
			</div>
			<button
				type="button"
				className="login-button"
				onClick={loginHandler}
			>
				Login
			</button>
		</div>
	);
};

export default Login;
