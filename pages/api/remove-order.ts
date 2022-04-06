import { deleteOrder } from 'services/order.service'

export default async function handler(req: any, res: any) {
  const { orderId } = JSON.parse(req.body)

  try {
    await deleteOrder(orderId)
    return res.send('success')
  } catch (err) {
    res.status(500).send(err)
  }
}
