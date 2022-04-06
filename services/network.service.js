import { Arkane } from '@arkane-network/web3-arkane-provider'

export const connectWallet = async (wallet) => {
  if (wallet === 1) {
    if (window.ethereum === 'undefined') {
      throw new Error('Please install metamask on your browser!')
    }

    const { ethereum } = window

    try {
      const [account] = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (!account) {
        throw new Error('Account is Empty.')
      }

      if (ethereum.chainId !== '0x89') {
        try {
          const res = await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          })
        } catch (err) {
          if (err.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x89',
                    chainName: 'Matic Main Network',
                    rpcUrls:
                      'https://polygon-mainnet.infura.io/v3/6e9690131f584ee0a8b445ebb4740f8b',
                  },
                ],
              })
            } catch (error) {
              throw error
            }
          }
        }
      }

      return {
        account,
        chainId: ethereum.chainId,
      }
    } catch (err) {
      throw err
    }
  } else {
    try {
      const chainId = await window.web3.eth.getChainId()
      const authResult = await Arkane.checkAuthenticated()
      const {
        auth: {
          idtokenParsed: { email },
        },
      } = authResult
      const wallets = await window.web3.eth.getAccounts()

      return {
        account: wallets[0],
        chainId,
      }
    } catch (err) {
      throw err
    }
  }
}

export const disconnectWallet = async (wallet) => {
  if (wallet === 2) {
    try {
      await Arkane.arkaneConnect().logout()
    } catch (err) {
      throw err
    }
  } else {
    try {
      const walletAddress = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      })
      if (!walletAddress) {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
      }
    } catch (err) {
      throw err
    }
  }
}
