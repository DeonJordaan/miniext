import classes from './Login.module.css';

const Login = () => {
	return (
		<div className={classes.login}>
			<div className="login-input">
				<label>Student Name:&nbsp;</label>
				<input type="text" />
			</div>
			<button className="login-button">Login</button>
		</div>
	);
};
export default Login;
