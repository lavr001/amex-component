import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the accordion heading', () => {
  render(<App />);
  expect(screen.getByText(/Accordion/i)).toBeInTheDocument();
});
