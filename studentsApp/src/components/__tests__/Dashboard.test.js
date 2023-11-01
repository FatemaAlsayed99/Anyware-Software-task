import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('renders the Sidebar and Outlet components', () => {
    const { getByTestId } = render(<Dashboard />);
    
    const sidebarElement = getByTestId('sidebar');
    expect(sidebarElement).toBeInTheDocument();

    const outletElement = getByTestId('outlet');
    expect(outletElement).toBeInTheDocument();
  });
});