const getAllMaterialsQuery = /* GraphQL */ `
  {
    digitalaxMaterialV2S(first: 1000) {
      id
      name
      image
      tokenUri
      animation
      description
      attributes {
        value
        type
      }
    }
  }
`
export default getAllMaterialsQuery
