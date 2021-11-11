import React from 'react';
import { render, screen } from '@testing-library/react';
import {Input} from "../components/Input";

test('renders input component', () => {
    render(
        <Input
            placeholder='Testando input'
            onchange={(t) => {}}
            value={''}
        />
    );

    const inputText = screen.getByText('Testando input');
    expect(inputText).toBeInTheDocument();
});
