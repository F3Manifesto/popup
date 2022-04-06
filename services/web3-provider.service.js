import Web3 from 'web3'

const options = {
  clientId: 'DIGITALAX',
  environment: 'STAGING',
  signMethod: 'POPUP',
  secretType: 'MATIC',
}

export const setWeb3Provider = async (wallet) => {
  if (wallet === 1) {
    // metamask
    const provider =
      window.ethereum !== 'undefined'
        ? window.ethereum
        : process.env.DEFAULT_WEB3_PROVIDER
    window.web3 = new Web3(provider)
  } else {
    // arkane
    const provider = Arkane.createArkaneProviderEngine(options)
    window.web3 = new Web3(provider)
  }
}
