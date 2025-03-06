import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';
// ✅ IMPORTANTE: Añadir esta línea
/* import { expect } from '@testing-library/jest-dom'; */
import '@testing-library/jest-dom/extend-expect';

test('renders button with text and handles click', async () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument(); // ✅ Ahora debería funcionar

  await userEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});