import { gql } from "graphql-request";

export const PAYABLE_TOKEN_REQUEST = gql`
  query payableTokenReport($id: ID) {
    payableTokenReport(id: $id) {
      id
      payload
      timestamp
    }
  }
`;

export const DRIP_MARKETPLACE_PURCHASE_HISTORES = gql`
  query dripF3MMarketplacePurchaseHistories($orderId: Int) {
    dripMarketplacePurchaseHistories: dripF3MMarketplacePurchaseHistories(
      where: { orderId: $orderId }
    ) {
      id
      orderId
      buyer
    }
  }
`;

export const DIGITALAX_GARMENT_V2_COLLECTION_BY_ID = gql`
  query digitalaxGarmentV2Collection($id: ID!) {
    digitalaxGarmentV2Collection: digitalaxF3MNFTCollection(id: $id) {
      id
      garments(first: 1000) {
        id
        name
        image
        animation
        description
        tokenUri
        primarySalePrice
        children {
          id
          tokenUri
        }
      }
      designer {
        id
        description
        name
        instagram
        twitter
        image
      }
    }
  }
`;

export const DRIP_MARKETPLACE_OFFER_BY_ID = gql`
  query dripF3MMarketplaceOffer($id: ID!) {
    dripMarketplaceOffer: dripF3MMarketplaceOffer(id: $id) {
      id
      startTime
      endTime
      amountSold
      garmentCollection {
        id
        rarity
        garments(first: 1000) {
          id
          name
          image
          animation
          description
          tokenUri
          primarySalePrice
          children {
            id
            tokenUri
          }
        }
        designer {
          id
          description
          name
          instagram
          twitter
          image
        }
      }
    }
  }
`;

export const DRIP_MARKETPLACE_OFFERS = gql`
  query dripF3MMarketplaceOffers {
    dripMarketplaceOffers: dripF3MMarketplaceOffers(first: 1000) {
      id
      startTime
      endTime
      amountSold
      garmentCollection {
        id
        rarity
        garments {
          id
          owner
          image
          name
          children {
            id
            childId
            tokenUri
          }
        }
      }
    }
  }
`;

// For Profile Page
export const DIGITALAX_MARKETPLACE_V2_OFFER = gql`
  query digitalaxMarketplaceV2Offers($garmentCollection: String!) {
    digitalaxMarketplaceV2Offers(
      where: { garmentCollection: $garmentCollection }
    ) {
      id
      primarySalePrice
      startTime
      endTime
      amountSold
      garmentCollection {
        garments(first: 1000) {
          id
          owner
        }
      }
    }
  }
`;

// DIGITALAX GARMENTS (eth, polygon)
export const DIGITALAX_GARMENTS_BY_OWNER = gql`
  query digitalaxGarments($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarments(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

export const DIGITALAX_GARMENTS = gql`
  query digitalaxGarments($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGarments(first: $first, where: { id_in: $ids, id_gt: $lastID }) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

// (polygon only)
export const DIGITALAX_GARMENT_V2S_BY_OWNER = gql`
  query digitalaxGarmentV2S($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarmentV2S(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      owner
      designer
      tokenUri
      image
      animation
      name
      description
    }
  }
`;

// (polygon digi bundle)
export const DIGITALAX_SUBSCRIPTIONS_BY_OWNER = gql`
  query digitalaxSubscriptions($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxSubscriptions(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      name
      owner
      tokenUri
      image
      animation
      designer
    }
  }
`;

// polygon digifizzy 1155
export const DIGITALAX_SUBSCRIPTION_COLLECTORS_BY_OWNER = gql`
  query digitalaxSubscriptionCollectors(
    $owner: ID!
    $first: Int!
    $lastID: ID!
  ) {
    digitalaxSubscriptionCollectors(
      first: $first
      where: { id: $owner, id_gt: $lastID }
    ) {
      id
      childrenOwned {
        id
        owner
        amount
        tokenUri
        token {
          id
          image
          animation
          name
          description
          totalSupply
          tokenUri
        }
      }
    }
  }
`;

// staked fashion NFTs polygon
export const DIGITALAX_NFT_STAKERS_BY_ADDRESS = gql`
  query digitalaxNFTStakers($staker: ID!) {
    digitalaxNFTStakers(where: { id: $staker }) {
      id
      garments {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// staked fashion NFTs ethereum
export const DIGITALAX_GARMENT_STAKED_TOKENS_BY_ADDRESS = gql`
  query digitalaxGarmentStakedTokens($staker: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGarmentStakedTokens(
      first: $first
      where: { staker: $staker, id_gt: $lastID }
    ) {
      id
      staker
    }
  }
`;

// genesis NFTs ethereum
export const DIGITALAX_GENESIS_NFTS_BY_ADDRESS = gql`
  query digitalaxGenesisNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGenesisNFTs(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// genesis NFTs by ids ethereum
export const DIGITALAX_GENESIS_NFTS = gql`
  query digitalaxGenesisNFTs($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGenesisNFTs(
      first: $first
      where: { id_in: $ids, id_gt: $lastID }
    ) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// staked genesis NFTs ethereum
export const DIGITALAX_GENESIS_STAKED_TOKENS_BY_ADDRESS = gql`
  query digitalaxGenesisStakedTokens($staker: ID!, $first: Int!, $lastID: ID!) {
    digitalaxGenesisStakedTokens(
      first: $first
      where: { staker: $staker, id_gt: $lastID }
    ) {
      id
      staker
    }
  }
`;

// get collection id by garment id polygon
export const DIGITALAX_GARMENT_V2_COLLECTION_BY_GARMENT_ID = gql`
  query digitalaxGarmentV2Collections($garmentIDs: [ID!]) {
    digitalaxGarmentV2Collections(where: { garments_contains: $garmentIDs }) {
      id
      rarity
      garmentAuctionID
    }
  }
`;

// get pode tokens by owner
export const PODE_NFT_V2S_BY_ADDRESS = gql`
  query podeNFTv2S($owner: ID!, $first: Int!, $lastID: ID!) {
    podeNFTv2S(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      tokenUri
      name
      animation
    }
  }
`;

// get staked pode tokens by staker
export const PODE_NFT_V2_STAKERS_BY_ADDRESS = gql`
  query podeNFTv2Stakers($staker: ID!, $first: Int!, $lastID: ID!) {
    podeNFTv2Stakers(first: $first, where: { id: $staker, id_gt: $lastID }) {
      id
      garments {
        id
      }
    }
  }
`;

// polygon digitalax 1155
export const DIGITALAX_COLLETOR_V2_BY_OWNER = gql`
  query digitalaxCollectorV2($owner: ID!) {
    digitalaxCollectorV2(id: $owner) {
      id
      childrenOwned {
        id
        owner
        amount
        tokenUri
        token {
          id
          image
          animation
          name
          description
          totalSupply
          tokenUri
        }
      }
    }
  }
`;

// gdn membership token polygon
export const GDN_MEMBERSHIP_NFTS_BY_OWNER = gql`
  query gdnmembershipNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    gdnmembershipNFTs(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      owner
      name
      description
      image
      animation
      tokenUri
    }
  }
`;

// digitalax look (loot for fashion) nfts mainnet
export const DIGITALAX_LOOK_NFTS_BY_OWNER = gql`
  query digitalaxLookNFTs($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxLookNFTs(first: $first, where: { owner: $owner, id_gt: $lastID }) {
      id
      name
      owner
      background
      texture
      pattern
      color
      shape
      flare
      form
      line
      element
      tokenUri
    }
  }
`;

export const DIGITALAX_GARMENT_V2_COLLECTIONS = gql`
  query digitalaxGarmentV2Collections($ids: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxGarmentV2Collections(
      first: $first
      where: { id_in: $ids, id_gt: $lastID }
    ) {
      id
      garments(first: 1000) {
        id
      }
    }
  }
`;

export const DIGITALAX_GARMENT_V2_COLLECTIONS_BY_GARMENT_IDS = gql`
  query digitalaxGarmentV2Collections(
    $garmentIDs: [ID!]
    $first: Int!
    $lastID: ID!
  ) {
    digitalaxGarmentV2Collections(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

export const DIGITALAX_LOOK_GOLDEN_TICKETS_BY_OWNER = gql`
  query digitalaxLookGoldenTickets($owner: ID!, $first: Int!, $lastID: ID!) {
    digitalaxLookGoldenTickets(
      first: $first
      where: { owner: $owner, id_gt: $lastID }
    ) {
      id
      name
      description
      animation
      image
      owner
      tokenUri
    }
  }
`;

// staked nfts by id list on polygon
export const DIGITALAX_NFT_STAKERS_BY_GARMENTS = gql`
  query digitalaxNFTStakers($garmentIDs: [ID!], $first: Int!, $lastID: ID!) {
    digitalaxNFTStakers(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        designer
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// whitelisted staked nfts on dlta by id list on polygon
export const GUILD_WHITELISTED_NFT_STAKERS_BY_GARMENTS = gql`
  query guildWhitelistedNFTStakers(
    $garmentIDs: [ID!]
    $first: Int!
    $lastID: ID!
  ) {
    guildWhitelistedNFTStakers(first: $first, where: { id_gt: $lastID }) {
      id
      garments(first: 1000, where: { id_in: $garmentIDs }) {
        id
        owner
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;

// get staked pode tokens by staker
export const GUILD_WHITELISTED_NFT_STAKERS_BY_STAKER = gql`
  query guildWhitelistedNFTStakers($staker: ID!, $first: Int!, $lastID: ID!) {
    guildWhitelistedNFTStakers(
      first: $first
      where: { id: $staker, id_gt: $lastID }
    ) {
      id
      garments {
        id
        owner
        tokenAddress
        tokenUri
        image
        animation
        name
        description
      }
    }
  }
`;
