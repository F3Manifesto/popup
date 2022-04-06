import { Product } from '@commerce/types'
import { getConfig, ShopifyConfig } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import { ProductEdge } from '../schema'
import { normalizeProduct } from '../utils/normalize'
import getAllCollectionProductsPathsQuery from '../utils/queries/get-collection-products-path-query'

type Variables = {
  first?: number
  field?: string
}

type ReturnType = {
  products: Product[]
}

const getAllProductCollection = async (options?: {
  variables?: any
  config?: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const products = await fetchAllProducts({
    config,
    query: getAllCollectionProductsPathsQuery,
    variables,
  })

  return {
    products:
      products?.map(({ node: p }: ProductEdge) => normalizeProduct(p)) ?? [],
  }
}

export default getAllProductCollection
