import React from 'react';
import { render, screen } from '@testing-library/react';
import {Select} from "../components/Select";

test('renders select component', () => {
    render(
        <Select
            placeholder='Sexo'
            onchange={() => {}}
            options={['Masculino', 'Feminino']}
            visible={true}
        />
    );

    const sexoText = screen.getByText('Sexo');
    const mascText = screen.getByText('Masculino');
    const femText = screen.getByText('Feminino');
    expect(sexoText).toBeInTheDocument();
    expect(mascText).toBeInTheDocument();
    expect(femText).toBeInTheDocument();
});
