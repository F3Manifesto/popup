export const handleSignMessage = async ({ account, signMsg }) => {
  return new Promise((resolve, reject) => {
    window.web3.eth.personal.sign(signMsg, account, (err, signature) => {
      if (err) return reject(err)
      return resolve({ account, signature })
    })
  })
}
