import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login form input', () => {
	render(<Login />);
	const loginInputElement = screen.getByLabelText('Student Name', {
		exact: false,
	});
	expect(loginInputElement).toBeInTheDocument();
});
