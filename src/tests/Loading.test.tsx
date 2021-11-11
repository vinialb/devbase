import React from 'react';
import { render, screen } from '@testing-library/react';
import {Loading} from "../components/Loading";

test('renders input component', () => {
    render(
        <Loading
            visible={true}
        />
    );

    const imageText = screen.getByAltText('Loading gif');
    expect(imageText).toBeInTheDocument();
});
