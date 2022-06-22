import { render, screen } from '../test-utils';
import ClassDetail from './ClassDetail';

it('should render ClassDetail component', () => {
	render(<ClassDetail />);

	// const loginInputElement = screen.getByRole('textbox', {
	// 	name: /Student Name:/i,
	// });
	// expect(loginInputElement).toBeInTheDocument();
	screen.queryByTestId('class-item');

	const buttonElement = screen.getByRole('button', { name: /Logout/i });
	expect(buttonElement).toBeInTheDocument();
});
