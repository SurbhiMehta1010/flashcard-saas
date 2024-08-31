'use client'; // Ensure this is a client component

import React, { useState } from 'react';
import { Box, Grid, Button, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignOutButton } from '@clerk/nextjs'; // Import SignOutButton from Clerk

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
  palette: {
    primary: {
      main: '#C0C0C0', // Silver as the primary color
    },
    secondary: {
      main: '#1E90FF', // Blue as the secondary color (Dodger Blue)
    },
    background: {
      default: '#000000', // Black background
      paper: '#1C1C1C', // Darker paper background for contrast
    },
    text: {
      primary: '#FFFFFF', // White text for high contrast
    },
  },
});

function generateTitle(title) {
  return title.toUpperCase();
}

export default function Dashboard() {
  const [flashcardStacks, setFlashcardStacks] = useState([
    { id: 1, title: generateTitle('Math') },
    { id: 2, title: generateTitle('Science') },
  ]);
  const [generateTopic, setGenerateTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNewStack = () => {
    const newStack = {
      id: flashcardStacks.length + 1,
      title: generateTitle(`New Stack ${flashcardStacks.length + 1}`),
    };
    setFlashcardStacks([...flashcardStacks, newStack]);
  };

  const handleGenerateFlashcards = () => {
    // Placeholder for generating flashcards based on the topic
    console.log(`Generating flashcards for topic: ${generateTopic}`);
    setGenerateTopic(''); // Clear the topic after generating
  };

  const handleSearch = () => {
    // Placeholder for searching through flashcards
    console.log(`Searching flashcards for: ${searchQuery}`);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: '#000000', mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#1E90FF' }}>
            Dashboard
          </Typography>
          <SignOutButton redirectUrl="/">
            <Button
              color="inherit"
              sx={{
                color: '#1E90FF',
                mx: 1,
                '&:hover': {
                  background: '#1E90FF',
                  color: '#FFFFFF',
                },
              }}
            >
              Sign Out
            </Button>
          </SignOutButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          background: 'linear-gradient(135deg, #000000, #1C1C1C)', // Black gradient background
          minHeight: '100vh',
          padding: 4,
          color: '#FFFFFF', // White text color
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center align content
        }}
      >
        <Typography variant="h3" gutterBottom>
          Your Flashcards
        </Typography>

        {/* Generate Flashcards Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, width: '100%', maxWidth: '800px' }}>
          <TextField
            variant="outlined"
            value={generateTopic}
            onChange={(e) => setGenerateTopic(e.target.value)}
            placeholder="Enter Topic to Generate Flashcards"
            sx={{
              flexGrow: 1,
              marginRight: 2,
              input: { color: '#C0C0C0' },
              background: '#1C1C1C', // Darker gradient for input background
              borderRadius: 1,
              boxShadow: '0 0 10px #C0C0C0', // Slightly reduced neon effect
            }}
          />
          <Button
            variant="contained"
            sx={{
              background: '#1E90FF', // Blue background
              color: '#FFFFFF',
              marginLeft: '8px', // Add some space between the buttons
              boxShadow: '0 0 20px #1E90FF',
              '&:hover': {
                background: '#1E90FF', // Maintain blue on hover with a brighter glow
                boxShadow: '0 0 25px #1E90FF', // Slightly less intense neon glow on hover
              },
            }}
            onClick={handleGenerateFlashcards}
          >
            Generate Flashcards
          </Button>
        </Box>

        {/* Search Flashcards Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, width: '100%', maxWidth: '800px' }}>
          <TextField
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Flashcards"
            sx={{
              flexGrow: 1,
              marginRight: 2,
              input: { color: '#C0C0C0' },
              background: '#1C1C1C', // Darker gradient for input background
              borderRadius: 1,
              boxShadow: '0 0 10px #C0C0C0', // Slightly reduced neon effect
            }}
          />
          <Button
            variant="contained"
            sx={{
              background: '#1E90FF', // Blue background
              color: '#FFFFFF',
              marginLeft: '8px', // Add some space between the buttons
              boxShadow: '0 0 20px #1E90FF',
              '&:hover': {
                background: '#1E90FF', // Maintain blue on hover with a brighter glow
                boxShadow: '0 0 25px #1E90FF', // Slightly less intense neon glow on hover
              },
            }}
            onClick={handleSearch}
          >
            Search Flashcards
          </Button>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {flashcardStacks.map((stack) => (
            <Grid item xs={12} sm={6} md={4} key={stack.id}>
              <FlashcardStack title={stack.title} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

function FlashcardStack({ title }) {
  return (
    <Box
      sx={{
        background: '#1C1C1C', // Dark background for the flashcard stack
        padding: 2,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)', // Neon blue shadow effect
        textAlign: 'center',
        cursor: 'pointer',
        color: '#FFFFFF', // White text color for contrast
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '200px', // Set a uniform height for the boxes
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 0 25px #C0C0C0', // Neon silver glow on hover
          transition: 'transform 0.2s',
        },
      }}
      onClick={() => console.log(`Clicked on ${title}`)}
    >
      <Typography variant="h6" sx={{ textAlign: 'center' }}>{title}</Typography>
    </Box>
  );
}
