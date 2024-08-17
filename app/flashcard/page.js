'use client'

import { useEffect, useState } from 'react'
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
import { Container, Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material'
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase'
import { useSearchParams } from 'next/navigation'
import getStripe from '../utils/get-stripe';


export default function FlashcardSetView() {
  const { user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const searchParams = useSearchParams()
  const setId = searchParams.get('id')

  useEffect(() => {
    const getFlashcards = async () => {
      if (!setId || !user) return

      const colRef = collection(doc(collection(db, 'users'), user.id), setId)
      const docs = await getDocs(colRef)
      const flashcardsData = []
      docs.forEach((doc) => {
        flashcardsData.push({ id: doc.id, ...doc.data() })
      })
      setFlashcards(flashcardsData)
    }

    getFlashcards()
  }, [setId, user])

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <Container maxWidth="md">
      <SignedIn>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Flashcards
          </Typography>
          <Grid container spacing={3}>
            {flashcards.map((flashcard) => (
              <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                    <CardContent>
                      <Box sx={{ transformStyle: 'preserve-3d', transform: flipped[flashcard.id] ? 'rotateY(180deg)' : 'none', transition: 'transform 0.6s' }}>
                        <Box sx={{ backfaceVisibility: 'hidden' }}>
                          <Typography variant="h5" component="div">
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box sx={{ position: 'absolute', top: 0, left: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                          <Typography variant="h5" component="div">
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </Container>
  )
}
