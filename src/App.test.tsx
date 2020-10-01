import React from 'react';
import { render } from '@testing-library/react';
import ColorPicker from './App';

test('renders learn react link', () => {
    const { getByText } = render(<ColorPicker />);
    const linkElement = getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
