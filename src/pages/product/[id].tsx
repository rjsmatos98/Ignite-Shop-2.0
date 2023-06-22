import { useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Stripe from 'stripe';
import Image from 'next/image';
import Head from 'next/head';

import { stripe } from '../../lib/stripe';
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext';

import { ProductContainer, ImageContainer, ProductDetails, ImageContainerSkeleton, ProductDetailsSkeleton } from '../../styles/pages/product';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    unitAmount: number;
    description: string;
    defaultPriceId: string;
    quantity: number;
  }
}

export default function Product({ product }: ProductProps){
  const { isFallback } = useRouter()

  const { addItem } = useContext(ShoppingBagContext);

   if (isFallback) {
    return (
      <>
        <Head>
          <title>Ignite Shop</title>
        </Head>

        <ProductContainer>
          <ImageContainerSkeleton />
          <ProductDetailsSkeleton>
            <div />
            <div />
            <div />
          </ProductDetailsSkeleton>
        </ProductContainer>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      
      <ProductContainer>

        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>

          <button onClick={() => addItem(product)}>
            Colocar na sacola
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_O7A7FTQbjzt6XF' } } 
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        unitAmount: price.unit_amount,
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
        quantity: 1,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
