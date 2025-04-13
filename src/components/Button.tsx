'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, styled } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  asChild?: boolean;
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none', // Override MUI's default uppercase text transform
  fontWeight: 500,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
}));

export function Button({
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  // If asChild is true, we clone the first child and pass our props to it
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: props.className,
    });
  }

  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
