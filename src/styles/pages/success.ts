import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  marginBlock: 'auto',
  height: '70vh',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const Images = styled('div', {
  display: 'flex',
  alignItems: 'cente',
  justifyContent: 'center',

  'div:first-child': {
    marginLeft: 0,
  },
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,

  marginLeft: '-25px',

  boxShadow: '-15px 0 30px rgba(0, 0, 0, 0.8)',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  span: {
    position: 'absolute',
    boxSizing: 'content-box',
    top: 0,
    left: 0,
    
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    
    color: '$white',
    fontWeight: 'bold',
    fontSize: '.875rem',
    borderRadius: '50%',
    border: '3px solid $gray900',
    background: '$green500',
  },

  img: {
    objectFit: 'cover',
  }
})
