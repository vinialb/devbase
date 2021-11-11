import React from 'react';
import { render, screen } from '@testing-library/react';
import {Button} from "../components/Button";

test('renders button component', () => {
    render(
        <Button
            title='Button test'
            type='submit'
        />
    );
    const appElement = screen.getByText('Button test');
    expect(appElement).toBeInTheDocument();
});
