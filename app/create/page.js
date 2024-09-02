'use client';

import React, { useState } from 'react';
import { Container, Box, Typography, Button, TextField, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { collection, doc, addDoc } from 'firebase/firestore';
import db from '../firebase'; // Adjust the import path to your Firebase config
import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

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

export default function CreateFlashcardsPage() {
  const [topic, setTopic] = useState('');
  const [flashcards, setFlashcards] = useState([{ front: '', back: '' }]);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (index, field, value) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
  };

  const addFlashcard = () => {
    setFlashcards([...flashcards, { front: '', back: '' }]);
  };

  const handleSave = async () => {
    if (!topic.trim()) {
      setError('Please enter a title for the flashcard stack.');
      return;
    }

    try {
      const topicRef = doc(collection(db, 'topics'), topic); // Create a document reference for the topic

      for (const flashcard of flashcards) {
        await addDoc(collection(topicRef, 'flashcards'), flashcard); // Add each flashcard to the subcollection
      }

      alert('Flashcards saved successfully!');
      setFlashcards([{ front: '', back: '' }]);
      setTopic('');
    } catch (err) {
      console.error('Error saving flashcards:', err.message);
      alert('Failed to save flashcards. Please try again.');
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
            Create Flashcards
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
          {flashcards.map((flashcard, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <TextField
                label={`Front Text ${index + 1}`}
                value={flashcard.front}
                onChange={(e) => handleInputChange(index, 'front', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: '#1E1E1E',
                  mb: 1,
                  input: { color: '#FFFFFF' },
                }}
              />
              <TextField
                label={`Back Text ${index + 1}`}
                value={flashcard.back}
                onChange={(e) => handleInputChange(index, 'back', e.target.value)}
                fullWidth
                variant="outlined"
                sx={{
                  backgroundColor: '#1E1E1E',
                  input: { color: '#FFFFFF' },
                }}
              />
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={addFlashcard}
            fullWidth
            sx={{
              mb: 4,
              color: '#1E90FF',
              borderColor: '#1E90FF',
              '&:hover': {
                borderColor: '#1C86EE',
              },
            }}
          >
            Add Another Flashcard
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
            sx={{
              backgroundColor: '#1E90FF',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#1C86EE',
              },
            }}
          >
            Save Flashcards
          </Button>
          {error && (
            <Typography variant="body1" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
