// to test App Component
// This is the place for us to write unit tests 
// Test Pattern: AAA (Arrange, Act, Assert)

import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  it('has proper App Component', () => {
    render(<App />);
    expect(App).toBeTruthy();
  });
});