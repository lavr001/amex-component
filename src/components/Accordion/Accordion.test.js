import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

const panels = [
  { title: 'Panel One', content: 'Content for panel one' },
  { title: 'Panel Two', content: 'Content for panel two' },
  { title: 'Panel Three', content: 'Content for panel three' },
];

function renderWithUser(ui) {
  const user = userEvent.setup();
  return { user, ...render(ui) };
}

describe('Accordion', () => {
  test('renders accordion with multiple panels', () => {
    render(<Accordion panels={panels} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('shows content for the clicked panel and hides the rest', async () => {
    const { user } = renderWithUser(<Accordion panels={panels} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[1]);
    expect(screen.getByText('Content for panel two')).toBeVisible();
    expect(screen.queryByText('Content for panel one')).toBeNull();
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('hides content when an expanded panel is clicked again', async () => {
    const { user } = renderWithUser(<Accordion panels={panels} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);
    expect(screen.getByText('Content for panel three')).toBeVisible();
    await user.click(buttons[2]);
    expect(screen.queryByText('Content for panel three')).toBeNull();
  });

  test('can expand multiple panels at the same time by default', async () => {
    const { user } = renderWithUser(<Accordion panels={panels} />);
    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]);
    await user.click(buttons[2]);
    expect(screen.getByText('Content for panel one')).toBeVisible();
    expect(screen.queryByText('Content for panel two')).toBeNull();
    expect(screen.getByText('Content for panel three')).toBeVisible();
  });

  describe('accessibility', () => {
    test('each button has aria-controls pointing to its content region', () => {
      render(<Accordion panels={panels} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        const controlsId = button.getAttribute('aria-controls');
        expect(controlsId).toBeTruthy();
        expect(document.getElementById(controlsId)).toBeInTheDocument();
      });
    });

    test('content regions have aria-labelledby pointing back to their header', () => {
      render(<Accordion panels={panels} />);
      const regions = screen.getAllByRole('region', { hidden: true });
      regions.forEach((region) => {
        const labelledBy = region.getAttribute('aria-labelledby');
        expect(labelledBy).toBeTruthy();
        expect(document.getElementById(labelledBy)).toBeInTheDocument();
      });
    });
  });
});
