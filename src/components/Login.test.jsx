import { render, screen } from '../test-utils';
import Login from './Login';

it('should render the Login form', () => {
	render(<Login />);

	const loginInputElement = screen.getByRole('textbox', {
		name: /Student Name:/i,
	});
	expect(loginInputElement).toBeInTheDocument();

	// const buttonElement = screen.getByRole('button', { name: /Login/i });
	// expect(buttonElement).toBeInTheDocument();
});

it('should render the Login button', () => {
	render(<Login />);

	// const loginInputElement = screen.getByRole('textbox', {
	// 	name: /Student Name:/i,
	// });
	// expect(loginInputElement).toBeInTheDocument();

	const buttonElement = screen.getByRole('button', { name: /Login/i });
	expect(buttonElement).toBeInTheDocument();
});
