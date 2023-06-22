import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { keyframes } from '@stitches/react';
import { Handbag } from 'phosphor-react';

import { ShoppingBag } from '../ShoppingBag';
import { ShoppingBagContext } from '../../contexts/ShoppingBagContext';

import { HeaderContainer, ShoppingCartButton } from './styles';

import logoImg from '../../assets/logo.svg';

export function Header() {
  const [shoppingBagIsOpen, setShoppingBagIsOpen] = useState(false)
  const [aimation, setAnimation] = useState('')
  
  const { shoppingBag } = useContext(ShoppingBagContext)

  const { pathname } = useRouter();

  const openAnimation = keyframes({
    '0%': { transform: 'translateX(100%)' },
    '100%': { transform: 'translateX(0%)' },
  });
    
  const closeAnimation = keyframes({
    '0%': { transform: 'translateX(0%)' },
    '100%': { transform: 'translateX(100%)' },
  });

  function openShoppingBag() {
    setAnimation(`${openAnimation} 200ms`)

    setShoppingBagIsOpen(true)
  }

  function closeShoppingBag() {
    setAnimation(`${closeAnimation} 200ms`)

    setTimeout(() => {
      setShoppingBagIsOpen(false)
    }, 200)
  }

  if(pathname === '/success') {
    return (
      <HeaderContainer
        style={{
          justifyContent: 'center',
        }}
      >
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
      </HeaderContainer>
    )
  }

  return (
    <HeaderContainer>
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>
      
      <ShoppingCartButton
        onClick={openShoppingBag}
      >
        {shoppingBag.length > 0 && <span>{shoppingBag.length}</span>}

        <Handbag weight="bold" size={24} />
      </ShoppingCartButton>

      {shoppingBagIsOpen &&
        <ShoppingBag 
          styles={{ animation: `${aimation}` }}
          closeShoppingBag={closeShoppingBag}
        />
      }
    </HeaderContainer>
  )
}
