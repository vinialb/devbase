import React from 'react';
import { render, screen } from '@testing-library/react';
import {Update} from "../components/Update";

test('renders update component', () => {
    render(
        <Update/>
    );

    const attText = screen.getByText('Atualizar dev');
    expect(attText).toBeInTheDocument();
});
