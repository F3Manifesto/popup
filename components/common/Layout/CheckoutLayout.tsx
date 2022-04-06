import { CommerceProvider } from '@framework'
import type { Page } from '@framework/common/get-all-pages'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar'
import {
  AuthOptionsView,
  CryptoOptionsView,
  CryptoSignUpView,
  ForgotPassword,
  LoginView,
  SignUpView,
} from '@components/auth'
import { NFTClaimedView } from '@components/modals'
import { Modal, useUI } from '@components/ui'
import {
  setAccount,
  setChainId,
  setCrypto,
  setUser,
  setWallet,
  useMain,
} from 'context'
import { setWeb3Provider } from 'services/web3-provider.service'
import CheckoutWarning from '@components/modals/CheckoutWarning'
import CryptoSuccessView from '@components/modals/CryptoSuccessView'

interface Props {
  pageProps: {
    pages?: Page[]
    commerceFeatures: Record<string, boolean>
  }
}

const CheckoutLayout: FC<Props> = ({
  children,
  pageProps: { commerceFeatures, ...pageProps },
}) => {
  const { locale = 'en-US', pathname, asPath } = useRouter()
  const { displayModal, closeModal, modalView } = useUI()
  const { dispatch, wallet } = useMain()

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      dispatch(setUser(JSON.parse(window.localStorage.getItem('user') || '')))
    }
    if (window.localStorage.getItem('ACCOUNT')) {
      dispatch(setAccount(window.localStorage.getItem('ACCOUNT') || ''))
    }
    if (window.localStorage.getItem('CHAIN_ID')) {
      dispatch(setChainId(window.localStorage.getItem('CHAIN_ID') || ''))
    }
    if (window.localStorage.getItem('CRYPTO_OPTION')) {
      dispatch(setCrypto(window.localStorage.getItem('CRYPTO_OPTION') || ''))
    }
    if (window.localStorage.getItem('WALLET')) {
      dispatch(
        setWallet(parseInt(window.localStorage.getItem('WALLET') || '0'))
      )
    }
  }, [])

  useEffect(() => {
    if (wallet) {
      setWeb3Provider(wallet)
    }
  }, [wallet])

  return (
    <CommerceProvider locale={locale}>
      <Navbar />
      {children}
      <Modal open={displayModal} onClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <LoginView />}
        {modalView === 'SIGNUP_VIEW' && <SignUpView />}
        {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
        {modalView === 'AUTH_OPTIONS_VIEW' && <AuthOptionsView />}
        {modalView === 'CRYPTO_OPTIONS_VIEW' && <CryptoOptionsView />}
        {modalView === 'NFT_CLAIMED_VIEW' && <NFTClaimedView />}
        {modalView === 'CRYPTO_SIGNUP_VIEW' && <CryptoSignUpView />}
        {modalView === 'CHECKOUT_WARNING' && <CheckoutWarning />}
        {modalView === 'CRYPTO_SUCCESS_VIEW' && <CryptoSuccessView />}
      </Modal>
      <Footer pages={pageProps.pages} />
    </CommerceProvider>
  )
}

export default CheckoutLayout
