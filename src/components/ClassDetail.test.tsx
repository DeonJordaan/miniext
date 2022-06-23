import { render, screen } from '../test-utils';
import ClassDetail from './ClassDetail';

it('should render the ClassDetail component', async () => {
	render(<ClassDetail />);

	// const loginInputElement = screen.getByRole('textbox', {
	// 	name: /Student Name:/i,
	// });
	// expect(loginInputElement).toBeInTheDocument();

	// const classItem = await screen.findByTestId('class-item');
	// expect(classItem).toBeInTheDocument();

	const buttonElement = screen.getByRole('button', { name: /Logout/i });
	expect(buttonElement).toBeInTheDocument();
});
