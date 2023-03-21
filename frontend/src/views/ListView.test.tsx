import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

test('renders list view', () => {
    render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
});
