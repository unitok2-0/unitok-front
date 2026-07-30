import React from 'react';
import PulseLoader from "react-spinners/PulseLoader";
import { Colors } from '../../../styles/Colors';

// import { Container } from './styles';

export interface PulseLoaderProps {
  colorSpinner?: string;
  loading?: boolean;
  sizeSpinner?: number
}

const PulseLoaderComponent: React.FC<PulseLoaderProps> = ({
  colorSpinner = Colors.white,
  loading,
  sizeSpinner = 3
}) => {
  return <PulseLoader color={colorSpinner} loading={loading} size={sizeSpinner} />
}

export default PulseLoaderComponent;