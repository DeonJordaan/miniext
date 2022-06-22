import { render, screen, waitFor } from './test-utils';
// import { fireEvent } from './test-utils';

import App from './App';
import userEvent from '@testing-library/user-event';

describe('Render ClassDetail component', () => {
	it('should render ClassDetail when Login is clicked', async () => {
		// render your component
		render(<App />);
		// access your button
		const loginButton = screen.getByText('Login');
		// simulate button click
		userEvent.click(loginButton);

		// expect result
		// await waitFor(() =>
		await screen.not.findByText('Student Name:');
	});
	// }
});
