import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import barcampLogo from '../../image/BARCAMP8xl-removebg-preview.png';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function NavBar({used_point}) {
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button href='/'>
            <img style={{ height: 50 }} src={barcampLogo} alt="BarcampLogo" href="/" sx={{ display: { xs: 'none', md: 'flex' } }} />
          </Button>
          <Typography fontWeight='bold' variant='h7'>
            Realtime Voting
          </Typography>
          <Box sx={{height: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'center',position: 'absolute', right: '0'  }}>
            <FavoriteIcon sx={{ color: '#ff1744' }} />
            <Typography variant='caption' sx={{fontWeight: 'bold'}}>
              {used_point ? `${used_point}/10` : "-/10"}
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}