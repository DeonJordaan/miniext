import { useAppDispatch } from '../store/hooks';
import { projectActions } from '../store/project-slice';
import classes from './Login.module.css';

const Login: React.FC = () => {
	const dispatch = useAppDispatch();

	const loginHandler = () => {
		dispatch(projectActions.IS_LOGGED_IN());
	};

	return (
		<div className={classes.login}>
			<div className="login-input">
				<label>Student Name:&nbsp;</label>
				<input type="text" />
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
