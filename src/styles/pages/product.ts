import { styled } from '..';

export const ProductContainer = styled('main', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'stretch',
  gap: '4rem',
  maxWidth: 1180,
  margin: '0 auto',

  '@media(max-width: 600px)': {
    flexWrap: 'wrap',
    gridTemplateColumns: '1fr',
    gap: 0,
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 576,
  height: 480,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    width: '100%',
  },
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '0.25rem',

  h1: {
    fontSize: '$2xl',
    color: '$gray300',
  },

  span: {
    marginTop: '1rem',
    display: 'block',
    fontSize: '$2xl',
    color: '$green300'
  },

  p: {
    marginTop: '2.5rem',
    fontSize: '$md',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$md',

    '&:hover': {
      background: '$green300',
    }
  },

  '@media(max-width: 600px)': {
    button: {
      marginTop: '2rem',
    },

  },
})

export const ImageContainerSkeleton = styled('div', {
  backgroundColor: '$gray800',
  width: '100%',
  height: 480,
  borderRadius: 8,

})

export const ProductDetailsSkeleton = styled('div', {
  'div:nth-child(1)': {
    backgroundColor: '$gray800',
    width: '50%',
    height: 50,
    borderRadius: 8,
  },
  
  'div:nth-child(2)': {
    backgroundColor: '$gray800',
    width: '30%',
    height: 50,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 32,
  },

  'div:nth-child(3)': {
    backgroundColor: '$gray800',
    width: '100%',
    height: 100,
    borderRadius: 8,
  }
})
