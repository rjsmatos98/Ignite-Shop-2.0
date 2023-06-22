import { createContext, ReactNode, useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  unitAmount: number;
  price: string;
  defaultPriceId: string;
  quantity: number,
}

interface ShoppingBagType {
  shoppingBag: Product[];
  amount: string;
  addItem: (item: Product) => void;
  removeItem: (item: Product) => void;
  decreaseItemQuantity: (item: Product) => void;
  increaseItemQuantity: (item: Product) => void;
}

export const ShoppingBagContext = createContext({} as ShoppingBagType)

interface ShoppingBagContextProviderProps {
  children: ReactNode;
}

export function ShoppingBagContextProvider({
  children,
}: ShoppingBagContextProviderProps) {
  const [shoppingBag, setShoppingBag] = useState<Product[]>([]);
  const [amount, setAmount] = useState('');
  
  function addItem(item: Product) {
    const filter = shoppingBag.filter(product => product.id === item.id)

    if(filter.length > 0) {
      return 
    } else {
      setShoppingBag(prevState => [ ...prevState, item])    
    }
  }

  function removeItem(item: Product) {
    const updatedList = shoppingBag.filter(product => product.id !== item.id)

    setShoppingBag(updatedList)
  }

  function decreaseItemQuantity(item: Product) {
    if(item.quantity <= 1) {
      return
    }

    const updatedList = shoppingBag.map(product => {
      if(product.id === item.id) {
        return { 
          quantity: product.quantity--,
          ...product,
        }
      } 

      return {
        ...product,
      }
    })

    setShoppingBag(updatedList)
  } 

  function increaseItemQuantity(item: Product) {
    const updatedList = shoppingBag.map(product => {
      if(product.id === item.id) {
        return { 
          quantity: product.quantity++,
          ...product,
        }
      } 

      return {
        ...product,
      }
    })

    setShoppingBag(updatedList)
  }

  useEffect(() => {
    const total = shoppingBag.reduce((acc, product) => {
      return (acc + (product.unitAmount * product.quantity));
    }, 0)
    
    const totalFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total / 100)

    setAmount(totalFormatted)
  }, [shoppingBag])

  return (
    <ShoppingBagContext.Provider value={{
      shoppingBag,
      amount,
      addItem,
      removeItem,
      decreaseItemQuantity,
      increaseItemQuantity,
    }}>
      {children}
    </ShoppingBagContext.Provider>
  )
}
