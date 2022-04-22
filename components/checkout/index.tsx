import { FC, useEffect, useState } from "react";
import { Button, useUI } from "@components/ui";
import { useCart, useRemoveItem } from "framework/shopify/cart";
import usePrice from "@commerce/product/use-price";
import { CartItem } from "@components/cart";
import { setBuyNowStatus, useMain } from "context";
import { purchaseOrder } from "services/order.service";
import { getMarketplacePurchaseHistories } from "services/api.service";

interface Props {}

const Checkout: FC<Props> = () => {
  const { data, isLoading, isEmpty } = useCart();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [code, setCode] = useState("");
  const [valid, setValid] = useState<Array<string>>([]);
  const { dispatch, account, crypto, cryptoPrice, buyNowStatus } = useMain();
  const { setModalView, openModal } = useUI();
  const removeItem = useRemoveItem();

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  );
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  );
  const { price: shipPrice } = usePrice(
    data && {
      amount: Number(data.totalPrice - data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  );

  const onValidate = () => {
    const validations = [];
    if (!email.length) {
      validations.push("email");
    }
    if (!firstName.length) {
      validations.push("firstName");
    }
    if (!lastName.length) {
      validations.push("lastName");
    }
    if (!address1.length) {
      validations.push("address1");
    }
    if (!city.length) {
      validations.push("city");
    }
    if (!country.length) {
      validations.push("country");
    }
    if (!province.length) {
      validations.push("province");
    }
    if (!code.length) {
      validations.push("code");
    }

    if (
      email.length &&
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
      )
    ) {
      validations.push("emailInValid");
    }

    return validations;
  };

  const getIdFromUrl = (url: string) => {
    const nodes = url.split("/");
    return nodes[nodes.length - 1];
  };

  const getCollectionId = (url: string) => {
    const path = url.split("/products/")[1];
    return parseInt(path.split("-")[1]);
  };

  const onConfirm = async () => {
    const validations = onValidate();
    if (validations.length) {
      setValid(validations);
    } else {
      setModalView("CRYPTO_OPTIONS_VIEW");
      openModal();
    }
  };

  useEffect(() => {
    const order = async () => {
      // setWeb3Provider(wallet)
      console.log("this is before creating order");
      console.log(data?.lineItems);
      const { order } = await (
        await fetch("/api/order", {
          method: "POST",
          body: JSON.stringify({
            email,
            lineItems: data?.lineItems.map((item) => ({
              title: item.name,
              quantity: item.quantity,
              price: item.variant.price,
              product_id: getIdFromUrl(item.productId),
              variant_id: getIdFromUrl(item.variantId),
              variant_title: item.variant.name,
              sku: item.variant.sku,
            })),
            shipping_address: {
              address1: address1,
              address2: address2,
              city: city,
              country: country,
              first_name: firstName,
              last_name: lastName,
              province: province,
              zip: code,
            },
            total: data?.totalPrice,
            subTotal: data?.subtotalPrice,
          }),
        })
      ).json();
      console.log("this is after creating order");
      const { id, order_number } = order;
      const promises = [];

      const updateOrder = async () => {
        await fetch("/api/update-order", {
          method: "POST",
          body: JSON.stringify({
            orderId: id,
            amount: data?.totalPrice,
          }),
        });
      };

      const removeOrder = async () => {
        await fetch("/api/remove-order", {
          method: "POST",
          body: JSON.stringify({
            orderId: id,
          }),
        });
      };

      const removeCart = async () => {
        data?.lineItems.map((item) => removeItem(item));
      };

      try {
        /* this is for multi items  */
        const collectionIds: Array<number> = [];
        data?.lineItems.forEach((item) => {
          for (let i = 0; i < item.quantity; i += 1) {
            collectionIds.push(getCollectionId(item.path));
          }
        });
        console.log("this is before purhcasing order");
        const { promise, unsubscribe } = await purchaseOrder({
          account,
          orderNumber: order_number,
          crypto,
          collectionIds,
          shippingPrice: 0,
        });

        console.log("this is after purchasing order");

        await promise
          .then(async (hash) => {
            console.log("this is after calling buy offer");
            dispatch(setBuyNowStatus(2));
            await updateOrder();
            await removeCart();
            unsubscribe();
          })
          .catch(async (err) => {
            console.log(err);
            unsubscribe();
            if (err.message.includes("50 blocks")) {
              let timeLimit = 0;
              dispatch(setBuyNowStatus(2)); /// update soon
              const ordersTimer = setInterval(() => {
                const getOrders = async () => {
                  const {
                    dripMarketplacePurchaseHistories,
                  } = await getMarketplacePurchaseHistories(order_number);
                  if (
                    dripMarketplacePurchaseHistories.length ===
                    collectionIds.length
                  ) {
                    clearInterval(ordersTimer);
                    await updateOrder();
                    await removeCart();
                  }
                  if (timeLimit > 300) {
                    clearInterval(ordersTimer);
                    await removeOrder();
                    await removeCart();
                  }
                  timeLimit += 5;
                };

                getOrders();
              }, 5000);
            } else {
              dispatch(setBuyNowStatus(3));
              if (err.code !== 4001) {
                await removeCart();
              }
              await removeOrder();
            }
          });
      } catch (err) {
        dispatch(setBuyNowStatus(3));
        console.log(err);
        throw err;
      }
    };

    if (buyNowStatus === 1) {
      order();
    }
  }, [buyNowStatus]);

  return (
    <div className="container mx-auto md:h-screen">
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-3/5 p-10">
          <div
            className="text-5xl text-blue"
            style={{
              fontFamily: "NewYork",
            }}
          >
            Shipping Information
          </div>
          <div className="flex flex-col space-y-3 mb-5">
            <br />
            <div className="w-1/2">
              <label
                className="block tracking-wide text-md mb-3 font-bold text-blue font-newyork"
                htmlFor="grid-email"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="grid-email"
              />
              {valid.includes("emailInValid") ? (
                <span className="text-red-500 text-xs italic">
                  Email is not valid.
                </span>
              ) : null}
              {valid.includes("email") ? (
                <span className="text-red-500 text-xs italic text-blue">
                  Please fill out this field.
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col space-y-3 mb-5">
            {/* <h1 className="text-lg"> Shipping address </h1> */}
            <div className="w-full flex space-x-2">
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork text-md mb-3 font-bold"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {valid.includes("firstName") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork text-md mb-3 font-bold"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {valid.includes("lastName") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
            </div>
            <h1 className="text-md font-bold font-newyork pt-6 text-blue text-xl">
              {" "}
              Address{" "}
            </h1>
            <div className="w-full flex space-x-2">
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork text-md mb-3 font-bold"
                  htmlFor="grid-address"
                >
                  First Line
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-address"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
                {valid.includes("address1") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork font-bold text-md mb-3"
                  htmlFor="grid-address"
                >
                  Second Line
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-address"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full flex space-x-2">
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork font-bold text-md mb-3"
                  htmlFor="grid-city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                {valid.includes("city") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork font-bold text-md mb-3"
                  htmlFor="grid-province"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
                {valid.includes("province") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
            </div>
            <div className="w-full flex space-x-2">
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork font-bold text-md mb-3"
                  htmlFor="grid-country"
                >
                  Country
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                {valid.includes("country") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  className="block tracking-wide text-blue font-newyork font-bold text-md mb-3"
                  htmlFor="grid-code"
                >
                  ZIP code
                </label>
                <input
                  className="appearance-none block w-full text-blue bg-yellow border border-blue rounded py-3 px-4 leading-tight"
                  id="grid-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {valid.includes("code") ? (
                  <span className="text-red-500 text-xs italic text-blue">
                    Please fill out this field.
                  </span>
                ) : null}
              </div>
            </div>
          </div>
          <Button variant="slim" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
        <div className="w-full md:w-2/5 bg-blue text-white p-10 flex flex-col space-3 h-full">
          <div className="text-center font-newyork text-yellow text-3xl font-bold">
            DRIP Inventory
          </div>
          <ul className="py-6 flex-grow overflow-auto space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
            {data?.lineItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                currencyCode={data?.currency.code!}
              />
            ))}
          </ul>
          <hr />
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Sub Total</span>
            <span>
              {" "}
              {subTotal}{" "}
              {cryptoPrice ? (
                <>({(cryptoPrice * Number(data?.subtotalPrice)).toFixed(2)})</>
              ) : null}{" "}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Ship Price</span>
            <span>
              {" "}
              {shipPrice}
              {cryptoPrice ? (
                <>
                  (
                  {(
                    cryptoPrice *
                    (Number(data?.totalPrice) - Number(data?.subtotalPrice))
                  ).toFixed(2)}
                  )
                </>
              ) : null}
            </span>
          </div>
          <hr />
          <div className="flex items-center justify-between py-1">
            <span className="font-bold">Total</span>
            <span className="text-2xl">
              {total}
              {cryptoPrice ? (
                <>({(cryptoPrice * Number(data?.totalPrice)).toFixed(2)})</>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
