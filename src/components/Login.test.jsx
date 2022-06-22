import { render, screen } from '../test-utils';
import Login from './Login';

test('renders login form input', () => {
	render(<Login />);
	const loginInputElement = screen.getByLabelText('Student Name:');
	expect(loginInputElement).toBeInTheDocument();
	const buttonElement = screen.getByText('Login');
	expect(buttonElement).toBeInTheDocument();
});
