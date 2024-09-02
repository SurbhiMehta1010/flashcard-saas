'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Card, CardContent } from '@mui/material';
import { SignedOut, SignedIn, SignOutButton } from '@clerk/nextjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

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

const dropEffect = keyframes`
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#1E90FF' }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button
              color="inherit"
              href="/sign-up"
              sx={{ color: '#1E90FF', mx: 1 }}
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedOut>
            <Button
              color="inherit"
              href="/sign-in"
              sx={{ color: '#1E90FF', mx: 1 }}
            >
              Sign In
            </Button>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button
                color="inherit"
                sx={{ color: '#1E90FF', mx: 1 }}
              >
                Sign Out
              </Button>
            </SignOutButton>
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000000 60%, #1E90FF 100%)',
          color: '#fff',
          py: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ animation: `${dropEffect} 1s ease-out` }}
          >
            Revolutionize Your Study Sessions
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ animation: `${dropEffect} 1.5s ease-out` }}
          >
            Generate flashcards with AI or create your own collections. Save, manage, and access anytime, anywhere.
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <SignedOut>
                <Button
                  variant="contained"
                  size="large"
                  href="/sign-up"
                  sx={{
                    backgroundColor: '#1E90FF',
                    color: '#000000',
                    border: '2px solid #FFFFFF',
                    zIndex: 1,
                    px: 4,
                    animation: `${dropEffect} 2s ease-out`,
                    '&:hover': {
                      backgroundColor: '#1C86EE',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </SignedOut>
            </Grid>
            <Grid item>
              <SignedOut>
                <Button
                  variant="contained"
                  size="large"
                  href="/sign-in"
                  sx={{
                    backgroundColor: '#1E90FF',
                    color: '#000000',
                    border: '2px solid #FFFFFF',
                    zIndex: 1,
                    px: 4,
                    animation: `${dropEffect} 2.5s ease-out`,
                    '&:hover': {
                      backgroundColor: '#1C86EE',
                    },
                  }}
                >
                  Sign In
                </Button>
              </SignedOut>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          background: '#000000',
          color: '#1E90FF',
          py: 10,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#1E90FF' }}>
            Why Choose Flashcard SaaS?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              'AI-Powered Flashcard Generation',
              'Create & Customize Your Flashcards',
              'Save & Manage Collections',
              'Secure Access with User Authentication',
              'Subscription Plans with Stripe',
              'Dark & Futuristic Design',
            ].map((title, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid #1E90FF',
                    color: '#1E90FF',
                    height: '100%',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3">
                      {title}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, color: '#FFFFFF' }}>
                      {getFeatureDescription(title)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer Section */}
      <Box sx={{ background: '#000000', color: '#1E90FF', py: 4, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="body2">© 2024 Flashcard SaaS. All rights reserved.</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function getFeatureDescription(title) {
  switch (title) {
    case 'AI-Powered Flashcard Generation':
      return 'Let our advanced AI create flashcards for you in seconds, helping you study smarter, not harder.';
    case 'Create & Customize Your Flashcards':
      return 'Prefer to create your own? Easily add, edit, and organize your flashcards in a user-friendly interface.';
    case 'Save & Manage Collections':
      return 'Save your flashcards securely in the cloud, manage collections, and access them anytime, anywhere.';
    case 'Secure Access with User Authentication':
      return 'Your flashcards are protected by Clerk\'s robust user authentication. Login or sign up to get started.';
    case 'Subscription Plans with Stripe':
      return 'Unlock premium features with our subscription plans. Secure payments powered by Stripe.';
    case 'Dark & Futuristic Design':
      return 'Enjoy a sleek, modern design that’s easy on the eyes and perfect for late-night study sessions.';
    default:
      return '';
  }
}
