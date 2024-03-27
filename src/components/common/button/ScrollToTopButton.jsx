import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTopButton({ scrollThreshold = 100 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box>
      {
        isVisible && (
          <IconButton
            className={`prop-scroll-to-top`}
            onClick={scrollToTop}
            variant="contained"
            color="primary"
            size="large"
          >
            <KeyboardArrowUpIcon className='prop-scroll-to-top-icon' />
          </IconButton>
        )
      }
    </Box>
  );
};