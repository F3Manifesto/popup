const getAllCollectionProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 250, $cursor: String) {
    products(first: $first, after: $cursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          vendor
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                originalSrc
                altText
                width
                height
              }
            }
          }
        }
        cursor
      }
    }
  }
`
export default getAllCollectionProductsPathsQuery
