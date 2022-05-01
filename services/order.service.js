import { API_TOKEN } from "@framework/const";
import { utils as ethersUtils } from "ethers";
import Units from "ethereumjs-units";
import { contracts, tokens } from "../constants";
import {
  getDripMarketplaceContract,
  getTokenContract,
} from "./contract.service";

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const ACCESS_TOKEN = process.env.NEXT_SHOPIFY_ACCESS_TOKEN;
const SECRET_ACCESS_KEY = process.env.NEXT_SHOPIFY_SECRET_ACCESS_KEY;

const API_URL = `https://${ACCESS_TOKEN}:${SECRET_ACCESS_KEY}@${STORE_DOMAIN}/admin/api/2022-04`;

const getGasPrice = async () => {
  return await window.web3.eth.getGasPrice();
};

export const createDraftOrder = async (
  email,
  items,
  total,
  subTotal,
  shipping_address
) => {
  try {
    const res = await (
      await fetch(`${API_URL}/orders.json`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          order: {
            email,
            line_items: items,
            shipping_address,
            subtotal_price: subTotal,
            total_price: total,
            currency: "USD",
            financial_status: "pending",
            transactions: [
              {
                amount: total,
                kind: "authorization",
                status: "success",
              },
            ],
          },
        }),
      })
    ).json();

    return res;
  } catch (err) {
    throw err;
  }
};

export const updateOrder = async (orderId, amount) => {
  try {
    const order = await (
      await fetch(`${API_URL}/orders/${orderId}/transactions.json`, {
        method: "GET",
      })
    ).json();

    const res = await (
      await fetch(`${API_URL}/orders/${orderId}/transactions.json`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          transaction: {
            kind: "capture",
            gateway: "manual",
            amount: amount,
            parent_id: order.transactions[order.transactions.length - 1].id,
            status: "success",
            currency: "USD",
          },
        }),
      })
    ).json();
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    await fetch(`${API_URL}/orders/${orderId}.json`, {
      method: "DELETE",
    });
  } catch (err) {
    throw err;
  }
};

export const getAllowance = async ({ account, crypto }) => {
  const dripMarketplaceAddress = contracts.DRIP_MARTKETPLACE.address;
  const tokenContract = await getTokenContract(crypto);
  const allowance = await tokenContract.methods
    .allowance(account, dripMarketplaceAddress)
    .call({ from: account });
  const jsAllowedValue = parseFloat(ethersUtils.formatEther(allowance));
  if (jsAllowedValue < 10000000000) {
    return false;
  }
  return true;
};

export const approveToken = async ({ account, crypto, cryptoPrice }) => {
  try {
    const dripMarketplaceAddress = contracts.DRIP_MARTKETPLACE.address;
    const tokenContract = await getTokenContract(crypto);
    return tokenContract.methods
      .approve(dripMarketplaceAddress, Units.convert(20000000000, "eth", "wei"))
      .send({ from: account, gasPrice: await getGasPrice() });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const purchaseOrder = async ({
  account,
  orderNumber,
  collectionIds,
  crypto,
  shippingPrice,
}) => {
  console.log("this is before getting marktetplace offer");
  const contract = await getDripMarketplaceContract();
  console.log("this is after getting marketplace offer");
  try {
    console.log("this is before calling batchBuyoffer");
    console.log({ collectionIds });
    const listener = contract.methods
      .batchBuyOffer(
        collectionIds,
        tokens[crypto].address,
        orderNumber,
        shippingPrice
      )
      .send({
        from: account,
        value: 0,
        gasPrice: await getGasPrice(),
      });

    const promise = new Promise((resolve, reject) => {
      listener.on("error", (error) => reject(error));
      listener.on("confirmation", (transactionHash) =>
        resolve(transactionHash)
      );
    });

    return {
      promise,
      unsubscribe: () => {
        listener.off("error");
        listener.off("confirmation");
      },
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
