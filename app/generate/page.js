'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline, CircularProgress } from '@mui/material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import FlashcardViewer from '../components/FlashcardViewer';  // Ensure this path is correct

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

function GeneratePage() {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    setError('');
    setLoading(true);

    if (!text.trim()) {
      setError('Please provide text to generate flashcards.');
      setLoading(false);
      return;
    }

    if (!topic.trim()) {
      setError('Please provide a topic for the flashcard stack.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/generate', {
        prompt: text,
        topic,
      });

      const generatedCards = response.data.results.slice(0, 10); // Limit to 10 cards
      setFlashcards(generatedCards);
      setLoading(false);
    } catch (err) {
      console.error('Error generating flashcards:', err);
      setError('Failed to generate flashcards. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ textAlign: 'center', color: '#1E90FF', mt: 5 }}>
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
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Generate Flashcards
          </Typography>
          <TextField
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            label="Enter Flashcard Stack Title"
            fullWidth
            variant="outlined"
            sx={{
              backgroundColor: '#1E1E1E',
              mb: 2,
              input: { color: '#FFFFFF' },
            }}
          />
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter text to generate flashcards"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              backgroundColor: '#1E1E1E',
              mb: 2,
              input: { color: '#FFFFFF' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            fullWidth
            sx={{
              mb: 4,
              backgroundColor: '#1E90FF',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#1C86EE',
              },
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Flashcards'}
          </Button>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
          {flashcards.length > 0 && (
            <FlashcardViewer flashcards={flashcards} />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default GeneratePage;
