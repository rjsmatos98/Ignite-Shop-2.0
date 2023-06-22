import { AppProps } from 'next/app';

import { ShoppingBagContextProvider } from '../contexts/ShoppingBagContext';
import { Header } from '../components/Header';

import { globalStyles } from '../styles/global';
import { Container, Content } from '../styles/pages/app';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ShoppingBagContextProvider>
      <Container>
        <Content>
          <Header /> 
          <Component {...pageProps} />
        </Content>
      </Container>
    </ShoppingBagContextProvider>
  ) 
}
