import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { Container } from './styles'

interface PickerColorProps {
  color: string;
  setColor: (hex: string) => void;
}

const PickerColor: React.FC<PickerColorProps> = ({ color, setColor }) => {
  return (
    <Container>
      <HexColorPicker color={color} onChange={(hex) => { setColor(hex) }} />
    </Container>
  )
}

export default PickerColor
