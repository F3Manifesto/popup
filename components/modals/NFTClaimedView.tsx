import { FC } from 'react'

interface Props {}

const NFTClaimedView: FC<Props> = () => {
  return (
    <div className="flex flex-col space-y-3 items-center w-96 mx-10">
      <h1 className="text-center text-3xl font-newyork text-yellow font-bold"> NFT Claimed! </h1>
      <p className="text-center font-lemonmilk">
        {' '}
        It will arrive in your wallet soon and you can view it on your profile
        page!
        <br />
        <br />
        This Fashion NFT is not an ordinary asset. It unlocks an entire world of
        Crypto, DeFi and Web3!
      </p>
      <a href="" className="text-2xl font-bold underline">
        Start Using Your NFT Here!{' '}
      </a>
    </div>
  )
}

export default NFTClaimedView
