import React from 'react';
import Box from '@mui/material/Box';

export const Spacer: React.FC<{ width?: string; height?: string }> = (
  props,
) => {
  return <Box {...props} />;
};
