import React ,{ReactNode,FC}from 'react';

interface ButtonProps {
  onClick: () => void;
  children?: ReactNode; // Asegura que 'children' es una prop válida
}


const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
