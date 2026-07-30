import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { UserProps } from '../domain/User';
import light from '../styles/themes/light';

export function Theme({ children }) {
  const { user = {} as UserProps } = useAuth()
  const { profileColor } = user
  return (
    <ThemeProvider theme={light(profileColor)}>{children}</ThemeProvider>
  )
}