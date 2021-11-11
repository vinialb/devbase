import React from 'react';
import { render, screen } from '@testing-library/react';
import {Dev} from "../components/Dev";

test('renders dev component', () => {
    render(
        <Dev
            datanascimento='1999-05-17'
            id={1}
            hobby='Programar React apps'
            idade={22}
            nome='Vinícius Albuquerque'
            sexo='Masculino'
        />
    );

    const nascimento = screen.getByText('1999-05-17');
    const hobby = screen.getByText('Programar React apps');
    const nome = screen.getByText('Vinícius Albuquerque');
    const sexo = screen.getByText('Masculino');

    expect(nascimento).toBeInTheDocument();
    expect(hobby).toBeInTheDocument();
    expect(nome).toBeInTheDocument();
    expect(sexo).toBeInTheDocument();
});
