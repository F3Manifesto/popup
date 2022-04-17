import { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import CartItem from '../CartItem'
import s from './CartSidebarView.module.css'
import { Button } from '@components/ui'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'
import { Bag, Cross, Check } from '@components/icons'

import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'

import { useMain } from 'context'

const CartSidebarView: FC = () => {
  const { closeSidebar, setModalView, openModal } = useUI()
  const { data, isLoading, isEmpty } = useCart()
  const { cryptoPrice } = useMain()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )
  const handleClose = () => closeSidebar()

  const error = null
  const success = null

  return (
    <div
      className={cn(s.root, {
        [s.empty]: error || success || isLoading || isEmpty,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:font-bold transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" color='white' />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>

      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-primary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-blue text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accents-3 px-10 text-center pt-2">
            That makes the metaverse sad. Portal your way back home.
          </p>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <Link href="/cart">
              <h2
                className="w-full pt-1 pb-4 text-2xl leading-7 font-bold tracking-wide cursor-pointer inline-block text-white text-center"
                onClick={handleClose}
              >
                Pop Up Inventory
              </h2>
            </Link>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-3 border-t border-accents-3">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-4 py-5 sm:px-6 bg-blue">
            <div className="border-t border-accents-3">
              <ul className="py-3">
                <li className="flex justify-between py-1">
                  <span className="text-white">Subtotal</span>
                  <span className="text-white">
                    {subTotal}
                    {cryptoPrice ? (
                      <>
                        (
                        {(Number(data?.subtotalPrice) * cryptoPrice).toFixed(2)}
                        )
                      </>
                    ) : null}
                  </span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-accents-3 py-3 font-bold mb-10 text-white">
                <span>Total</span>
                <span>
                  {total}{' '}
                  {cryptoPrice ? (
                    <>
                      ({(Number(data?.totalPrice) * cryptoPrice).toFixed(2)}){' '}
                    </>
                  ) : null}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setModalView('AUTH_OPTIONS_VIEW')
                openModal()
              }}
              variant="new-slim"
              width="100%"
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
