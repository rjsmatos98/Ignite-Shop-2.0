import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Stripe from 'stripe';

import { stripe } from '../lib/stripe';

import { SuccessContainer, Images, ImageContainer } from '../styles/pages/success';

interface SuccessProps {
  customerName: string;
  products: {
    id: string;
    name: string;
    imageUrl: string;
    quantity: number;
  }[];
}

export default function Success({ customerName, products }: SuccessProps) {
  const total = products.reduce((acc, product) => {
    return (acc + product.quantity);
  }, 0)

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>

          <h1>Compra efetuada!</h1>

          <Images>
            {products.map(product => {
              return (
                <ImageContainer key={product.id}>
                  <span>{product.quantity}</span>
                  <Image src={product.imageUrl} width={130} height={140} alt="" />
                </ImageContainer>
              )
            })}
          </Images>

          <p>
            Uhuul <strong>{customerName}</strong>,
            sua compra de <strong>{total} {total > 1 ? 'camisetas' : 'camiseta'}</strong> já está a caminho da sua casa. 
          </p> 

          <Link href="/">
            Voltar ao catálogo
          </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      quantity: item.quantity,
    }
  })
    
  return {
    props: {
      customerName,
      products,
    }
  }
}
