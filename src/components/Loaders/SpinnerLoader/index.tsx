import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { Colors } from '../../../styles/Colors';

// import { Container } from './styles';

export interface SpinnerLoaderProps {
  colorSpinner?: string;
  loading?: boolean;
  sizeSpinner?: number
}

const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({
  colorSpinner = Colors.white,
  loading,
  sizeSpinner = 19
}) => {
  return <ClipLoader color={colorSpinner} loading={loading} size={sizeSpinner} />
}

export default SpinnerLoader;