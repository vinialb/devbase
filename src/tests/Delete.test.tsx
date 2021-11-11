import React from 'react';
import { render, screen } from '@testing-library/react';
import {Delete} from "../components/Delete";

test('renders delete component', () => {
    render(
        <Delete/>
    );
    const appElement = screen.getByText('Confirmar');
    expect(appElement).toBeInTheDocument();
});
