'use client'; // Mark the component as a client component

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

export default function SignInPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth={false} // Ensure the container spans the full width of the viewport
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Full screen height
          backgroundColor: 'background.default', // Use the black background from the theme
          textAlign: 'center',
          m: 0, // Remove any default margins
          p: 0, // Remove any default padding
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #000000 60%, #1E90FF 100%)', // Black-to-blue gradient background for the box
            color: 'primary.main', // Use primary color from the theme
            py: 5,
            px: 4,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)', // Dodger Blue shadow effect
            width: '100%', // Full width for better responsiveness
            maxWidth: '500px', // Ensure it doesn't get too wide on large screens
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sign in to continue
          </Typography>
          <Box sx={{ mt: 3 }}>
            <SignIn path="/sign-in" routing="path" afterSignInUrl="/dashboard" />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
