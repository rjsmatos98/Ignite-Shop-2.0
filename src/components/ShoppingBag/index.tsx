import { useContext, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CircleNotch, Minus, Plus, TrashSimple, X } from 'phosphor-react';

import { ShoppingBagContext } from '../../contexts/ShoppingBagContext';

import { 
  ShoppingBagContainer, 
  CloseButton, 
  Items, 
  Item,
  ImageContainer,
  Info,
  Actions,
  PurchaseDetails,
} from './styles';

interface ShoppingBagProps {
  styles: any;
  closeShoppingBag: () => void;
}

export function ShoppingBag({ styles, closeShoppingBag }: ShoppingBagProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  const { amount, shoppingBag, removeItem, decreaseItemQuantity, increaseItemQuantity } = useContext(ShoppingBagContext)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const orderList = shoppingBag.map(product => {
        return {
          price: product.defaultPriceId,
          quantity: product.quantity,
        }
      })

      const response = await axios.post('/api/checkout', { orderList })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <ShoppingBagContainer style={styles}>
      <CloseButton
        onClick={closeShoppingBag}
      >
        <X weight="bold" size={24} />
      </CloseButton>

      <h2>Sacola de compras</h2>

      <Items>
        {
          shoppingBag.map(product => {
            return (
              <Item key={product.id}>
                <ImageContainer>
                  <Image src={product.imageUrl} width={100} height={100} alt="" />
                </ImageContainer>

                <Info>
                    <span>{product.name}</span>
                    <strong>{product.price}</strong>
                </Info>

                <Actions>
                  <button 
                    className="remove"
                    onClick={() => removeItem(product)}
                  >
                    
                    Remover
                  </button>

                  <div className="quantity">
                    <button onClick={() => decreaseItemQuantity(product)}>
                      <Minus weight="bold" color="white" size={14} />
                    </button>

                    <span>{product.quantity}</span>

                    <button onClick={() => increaseItemQuantity(product)}>
                      <Plus weight="bold" color="white" size={14} />
                    </button>
                  </div>
                </Actions>

              </Item>
            )
          })
        }
      </Items>

      <PurchaseDetails>
        <div>
          <p>Quantidade</p>
          <span>{shoppingBag.length} items</span>
        </div>

        <div>
          <p>Valor total</p>
          <span>{amount}</span>
        </div>

        <button onClick={handleBuyProduct} disabled={isCreatingCheckoutSession} >
          {
            isCreatingCheckoutSession 
            ?
              <CircleNotch className="loading" weight="bold" />
            :
              'Finalizar compra'
          }
        </button>
      </PurchaseDetails>
    </ShoppingBagContainer>
  )
}
