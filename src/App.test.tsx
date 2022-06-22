import { render, screen, waitFor } from './test-utils';
import { fireEvent } from './test-utils';

import App from './App';

describe('Expand body button', async () => {
    it('should render ClassDetail when Login is clicked', () => {
        // render your component
        render(<App />) 
        // access your button
        const loginButton = screen.getByText('Login') 
        // simulate button click
        fireEvent.click(loginButton); 

        // expect result
        await waitFor(() =>  
            expect(screen.getByText("Some content")).toBeInTheDocument()
        
       });
})
