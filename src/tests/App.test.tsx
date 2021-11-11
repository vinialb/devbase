import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../pages/App';
import {Button} from "../components/Button";

test('renders DEV BASE text', () => {
  render(<App/>);
  const appElement = screen.getByText('DEV BASE');
  expect(appElement).toBeInTheDocument();
});
