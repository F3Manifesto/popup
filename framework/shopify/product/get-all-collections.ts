import { CollectionEdge } from '../schema'
import { getConfig, ShopifyConfig } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'
import { Collection } from '@commerce/types'
import { normalizeCollection } from '../utils/normalize'

type ReturnType = {
  categories: Collection[]
}

const getAllCollections = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.collections?.edges ?? []

  // const categories: Array<any> = edges.map(
  //   ({
  //     node: { id: entityId, title: name, handle, description, image },
  //   }: CollectionEdge) => ({
  //     entityId,
  //     name,
  //     path: `/${handle}`,
  //     description,
  //     image,
  //   })
  // )

  const categories =
    edges?.map(({ node: p }: CollectionEdge) => normalizeCollection(p)) ?? []

  return {
    categories,
  }
}

export default getAllCollections
