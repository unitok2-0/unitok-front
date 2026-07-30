import { useState } from 'react';
import { Container } from './styles';

export interface CheckboxPrimaryProps {
  label?: string;
  checked?: boolean;
  onClick?: () => void
}

const CheckboxPrimary: React.FC<CheckboxPrimaryProps> = ({ label = '', checked = false, onClick = () => {} }) => {
  return (
    <Container checked={checked} onClick={onClick}>
      <span><div /></span>
      <strong>{label}</strong>
    </Container>
  )
}

export default CheckboxPrimary;