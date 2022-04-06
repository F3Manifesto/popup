import { createDraftOrder } from 'services/order.service'

export default async function handler(req: any, res: any) {
  const { email, lineItems, shipping_address, total, subTotal } = JSON.parse(
    req.body
  )
  try {
    const data = await createDraftOrder(
      email,
      lineItems,
      parseFloat(total),
      parseFloat(subTotal),
      shipping_address
    )
    res.json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
