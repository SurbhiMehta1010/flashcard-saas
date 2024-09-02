'use client';

import React from 'react';
import { SignIn } from '@clerk/nextjs';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  palette: {
    primary: {
      main: '#1E90FF',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

export default function SignInPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: 'background.default',
          textAlign: 'center',
          m: 0,
          p: 0,
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #000000 60%, #1E90FF 100%)',
            color: 'primary.main',
            py: 5,
            px: 4,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sign in to continue
          </Typography>
          <Box sx={{ mt: 3 }}>
            <SignIn path="/sign-in" routing="path" afterSignInUrl="/select" />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
