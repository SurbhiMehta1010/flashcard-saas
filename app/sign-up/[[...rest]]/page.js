'use client'; // Mark the component as a client component

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
      main: '#1E90FF', // Blue as the primary color (Dodger Blue)
    },
    background: {
      default: '#000000', // Set default background to black
      paper: '#000000',   // Set paper background to black
    },
    text: {
      primary: '#FFFFFF', // White text for contrast
    },
  },
});

export default function SignUpPage() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth={false} // Full-width container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh', // Full screen height
            bgcolor: 'background.default', // Use theme background color
            m: 0, // Remove any margin
            p: 0, // Remove any padding
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #000000, #1E90FF)', // Black-to-blue gradient
              color: 'primary.main', // Use the primary color for text
              py: 5,
              px: 4,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)', // Dodger Blue shadow effect
              width: '100%',
              maxWidth: '500px', // Limit width for larger screens
            }}
          >
            <Typography variant="h4" gutterBottom>
              Join Us Today!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Sign up to start your journey
            </Typography>
            <Box sx={{ mt: 3 }}>
              <SignUp path="/sign-up" routing="path" afterSignUpUrl="/dashboard" />
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
