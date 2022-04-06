import { contracts, tokens } from '../constants'
import { setWeb3Provider } from './web3-provider.service'

const getContract = async (address, abi) => {
  if (!window.web3.eth) {
    const wallet = parseInt(window.localStorage.getItem('WALLET') || '0')
    await setWeb3Provider(wallet)
  }
  const contract = new window.web3.eth.Contract(abi, address)

  return contract
}

export const getDripMarketplaceContract = async () => {
  const contract = await getContract(
    contracts.DRIP_MARTKETPLACE.address,
    contracts.DRIP_MARTKETPLACE.abi
  )

  return contract
}

export const getTokenContract = async (crypto) => {
  const contract = await getContract(tokens[crypto].address, tokens[crypto].abi)

  return contract
}
