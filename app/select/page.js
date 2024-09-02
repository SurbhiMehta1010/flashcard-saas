'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Box, Typography, Button, Grid, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignOutButton } from '@clerk/nextjs';

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

export default function SelectPage() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

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
            maxWidth: '600px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Button
              onClick={() => router.back()}
              sx={{
                color: '#FFFFFF',
                textTransform: 'none',
                borderBottom: '1px solid #1E90FF',
              }}
            >
              Back
            </Button>
            <SignOutButton>
              <Button
                sx={{
                  color: '#FFFFFF',
                  textTransform: 'none',
                  borderBottom: '1px solid #1E90FF',
                }}
              >
                Sign Out
              </Button>
            </SignOutButton>
          </Box>
          <Typography variant="h4" gutterBottom>
            Choose an Action
          </Typography>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNavigation('/generate')}
                sx={{
                  backgroundColor: '#1E90FF',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#1C86EE',
                  },
                }}
              >
                Generate Cards using AI
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNavigation('/create')}
                sx={{
                  backgroundColor: '#1E90FF',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#1C86EE',
                  },
                }}
              >
                Create My Own Cards
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => handleNavigation('/view')}
                sx={{
                  backgroundColor: '#1E90FF',
                  color: '#000000',
                  '&:hover': {
                    backgroundColor: '#1C86EE',
                  },
                }}
              >
                View My Cards
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
