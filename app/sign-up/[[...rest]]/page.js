'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import { Container, Box, Typography, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

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

export default function SignUpPage() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
            m: 0,
            p: 0,
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #000000, #1E90FF)',
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
              Join Us Today!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sign up to start your journey
            </Typography>
            <Box sx={{ mt: 3 }}>
              <SignUp path="/sign-up" routing="path" afterSignUpUrl="/select" />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
