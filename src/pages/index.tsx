import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Stripe from 'stripe';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { CaretLeft, CaretRight, Handbag } from 'phosphor-react';

import { stripe } from '../lib/stripe';

import { HomeContainer, Product, ArrowLeft, ArrowRight } from '../styles/pages/home';

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [current, setCurrent] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
      origin: 'center',
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: {
          perView: 1,
          spacing: 24,
        },
      },
    },

    animationEnded(event) {
      setCurrent(event.track.details.abs);

      event.container.children[event.track.details.abs].children[0].classList.add('active');
    },

    animationStarted(event) {
      event.container.children[event.track.details.abs].children[0].classList.remove('active');
    },
  })

  useEffect(() => instanceRef.current.container.children[0].children[0].classList.add('active'), [instanceRef]);
 
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer>
        {current === 0 
          ?
            <></>
          :
            <ArrowLeft onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} >
              <CaretLeft weight="bold" size={48}/>
            </ArrowLeft>
        }

        <div ref={sliderRef} className="keen-slider">
          {products.map(product => {
            return (
              <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                <Product className="keen-slider__slide">
                  <Image src={product.imageUrl} width={520} height={480} alt="" />

                  <footer>
                    <div className="title">
                      <strong>{product.name}</strong>
                      <span>{product.price}</span>
                    </div>

                    <div className="icon">
                      <Handbag weight="bold" size={32} />
                    </div>
                  </footer>
                </Product> 
              </Link>
            )
          })}
        </div>

        {current === products.length - 1
          ?
            <></>
          :
            <ArrowRight onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}>
              <CaretRight weight="bold" size={48}/>
            </ArrowRight>
        }
        
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  }
}