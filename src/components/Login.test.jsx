// import { render, screen } from '@testing-library/react';
import { render, screen } from '../test-utils';
import Login from './Login';

test('renders login form input', () => {
	render(<Login />);
	const loginInputElement = screen.getByLabelText('Student Name', {
		exact: false,
	});
	expect(loginInputElement).toBeInTheDocument();
});
