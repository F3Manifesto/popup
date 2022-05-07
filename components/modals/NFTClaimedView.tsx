import { FC } from 'react'

interface Props {}

const NFTClaimedView: FC<Props> = () => {
  return (
    <div className="flex flex-col space-y-3 items-center w-96 mx-10">
      <h1 className="text-center text-3xl font-newyork text-yellow font-bold"> NFT Claimed! </h1>
      <p className="text-center font-lemonmilk">
        {' '}
        You're NFT will arrive in your wallet soon!
        <br />
        <br />
        Shipping takes between 1-2 weeks.
      </p>
      <a href="" className="text-2xl font-bold underline">
        Start Using Your NFT Here!{' '}
      </a>
    </div>
  )
}

export default NFTClaimedView
