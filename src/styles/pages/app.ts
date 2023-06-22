import { styled } from '..';

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100vw',
  height: '100vh',

  '@media(max-width: 500px)': {
    height: 'auto',
  },
})

export const Content = styled('div', {
  width: '100%',
  maxWidth: 1440,
  height: '100%',
  maxHeight: 900,  

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  gap: '1rem',

  paddingBlock: '2rem',

  '@media(max-width: 500px)': {
    gap: 0,
    padding: '2rem 1rem',

    width: 'auto',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '100%',  
  },
})
