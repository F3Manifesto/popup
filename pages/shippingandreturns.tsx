import React from 'react'
import ProductTopBanner from '@components/common/ProductTopBanner'
import { Footer, Layout, TextSlider } from '@components/common'

export default function ShippingAndReturns() {
  return (
    <div className="">
      <ProductTopBanner showSlider={false} />
      <div className="bg-black py-10">
        <div className="container mx-auto my-10 mb-80">
          <h1
            className="text-white text-6xl font-bold my-10"
            style={{
              fontFamily: 'Animosa',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontSize: '70px',
              lineHeight: '84px',
              color: '#FFFFFF',
              border: '0.2px solid #000000',
              textShadow: '0px 6px 6px rgba(0, 0, 0, 0.25)',
            }}
          >
            {' '}
            Shipping and Returns.{' '}
          </h1>
          <div
            className="text-white text-xl font-normal"
            style={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: '15px',
              lineHeight: '18px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'white',
              textShadow: '0px 4px 4px rgba(255, 255, 255, 0.3)',
            }}
          >
            ALL ITEMS ARE HANDCRAFTED. SHIPPING FOR US DOMESTIC AND
            INTERNATIONAL TAKES APPROXIMATELY TWO WEEKS FROM PURCHASE.
            <br />
            <br />
            There is a 14 day return window UPON DELIVERY. Please email
            drip@digitalax.xyz with a valid reason for your return.
            <br />
            <br />
            VALID REASONS include; missing or damaged items (please include a
            photo).
          </div>
        </div>
        <TextSlider black />
      </div>
    </div>
  )
}

ShippingAndReturns.Layout = Layout
