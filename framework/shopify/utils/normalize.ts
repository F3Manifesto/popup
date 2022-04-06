import { Product, Collection } from '@commerce/types'

import {
  Product as ShopifyProduct,
  Collection as ShopifyCollection,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
} from '../schema'
import collectionDesigners from '@data/collection-designers.json'
import type { Cart, LineItem } from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName === 'Color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
  }
}

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 },
    }) => ({
      id,
      name: title,
      sku: sku ?? id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) =>
        normalizeProductOption({
          id,
          name,
          values: [value],
        })
      ),
    })
  )
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    collections,
    vendor,
    images,
    variants,
    description,
    handle,
    priceRange,
    options,
    ...rest
  } = productNode

  const collection: any = collections?.edges[0]?.node || {}

  const collectionInfo: any = collectionDesigners.find(
    (item) => item?.handle?.toLowerCase() === collection?.handle?.toLowerCase()
  )
  const designers: string[] | null = collectionInfo?.designers || null

  const limited: boolean | null = collectionInfo?.limited || null

  const product = {
    id,
    name,
    vendor,
    description,
    collection,
    designers,
    limited,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options ? options.map((o) => normalizeProductOption(o)) : [],
    ...rest,
  }

  return product
}

export function normalizeCollection(
  collectionNode: ShopifyCollection
): Collection {
  // const {
  //   id,
  //   title: name,
  //   image,
  //   description,
  //   handle,
  //   ...rest
  // } = collectionNode

  // const collect = {
  //   id,
  //   name,
  //   image: normalizeImage(image),
  //   description,
  //   path: `/${handle}`,
  //   slug: handle?.replace(/^\/+|\/+$/g, ''),
  //   ...rest,
  // }

  // console.log('collectionNode: ', collectionNode)

  return {
    id: collectionNode.id,
    name: collectionNode.title,
    description: collectionNode.description,
    path: `/${collectionNode.handle}`,
    handle: collectionNode.handle,
    image: {
      url: collectionNode.image?.originalSrc,
      alt: collectionNode.image?.altText ?? '',
    },
  }
}

export function normalizeCart(checkout: Checkout): Cart {
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2?.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2?.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: [],
  }
}

function normalizeLineItem({
  node: { id, title, variant, quantity },
}: CheckoutLineItemEdge): LineItem {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.product?.id),
    name: `${title}`,
    quantity,
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? '',
      name: variant?.title!,
      image: {
        url: variant?.image?.originalSrc,
      },
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2?.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    path: variant?.product?.onlineStoreUrl,
    discounts: [],
    options: [
      {
        value: variant?.title,
      },
    ],
  }
}
