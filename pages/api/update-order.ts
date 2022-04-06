import { updateOrder } from 'services/order.service'

export default async function handler(req: any, res: any) {
  const { orderId, amount } = JSON.parse(req.body)

  try {
    const data = await updateOrder(orderId)
    return res.json(data)
  } catch (err) {
    res.status(500).send(err)
  }
}
