'use client';

import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, CssBaseline } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import db from '../firebase'; // Adjust the import path to your Firebase config
import FlashcardViewer from '../components/FlashcardViewer';
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

export default function ViewPage() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      const topicsRef = collection(db, 'topics');
      const topicsSnapshot = await getDocs(topicsRef);
      const topicsData = topicsSnapshot.docs.map(doc => doc.id);
      setTopics(topicsData);
    };

    fetchTopics();
  }, []);

  const fetchFlashcards = async (topic) => {
    setSelectedTopic(topic);
    const flashcardsRef = collection(db, 'topics', topic, 'flashcards');
    const flashcardsSnapshot = await getDocs(flashcardsRef);
    const flashcardsData = flashcardsSnapshot.docs.map(doc => doc.data());
    setFlashcards(flashcardsData);
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Your Flashcard Stacks
          </Typography>
          {topics.length > 0 ? (
            topics.map((topic) => (
              <Button
                key={topic}
                onClick={() => fetchFlashcards(topic)}
                sx={{
                  backgroundColor: selectedTopic === topic ? '#1C86EE' : '#1E90FF',
                  color: '#000000',
                  margin: '10px',
                  '&:hover': {
                    backgroundColor: '#1C86EE',
                  },
                }}
              >
                {topic}
              </Button>
            ))
          ) : (
            <Typography variant="body1">No flashcard stacks available. Start by generating or creating flashcards!</Typography>
          )}
          {flashcards.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5" gutterBottom>
                {selectedTopic}
              </Typography>
              <FlashcardViewer flashcards={flashcards} />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
