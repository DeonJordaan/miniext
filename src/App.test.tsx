import { render, screen } from './test-utils';
import userEvent from '@testing-library/user-event';

import App from './App';

it('should render ClassDetail when Login is clicked', async () => {
	const jsdomAlert = window.alert;
	window.alert = jest.fn();

	render(<App />);

	const loginButton = screen.getByRole('button', { name: /Login/i });
	userEvent.click(loginButton);

	screen.queryByTestId('class-detail');

	window.alert = jsdomAlert;
});
