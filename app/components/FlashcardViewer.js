import React, { useState } from 'react';
import { Box } from '@mui/material';

const Flashcard = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box
      onClick={handleFlip}
      sx={{
        perspective: '1000px',
        width: '300px',
        height: '200px',
        position: 'relative',
        margin: 'auto',
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'none',
          transition: 'transform 0.6s',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#1E90FF',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)',
            padding: '20px',
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
        >
          {front}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            transform: 'rotateY(180deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(30, 144, 255, 0.7)',
            padding: '20px',
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
        >
          {back}
        </Box>
      </Box>
    </Box>
  );
};

export default Flashcard;
