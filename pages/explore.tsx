import { useState } from "react";
import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import { getConfig } from "@framework/api";
import getAllProducts from "@framework/product/get-all-products";

import { Layout } from "@components/common";
import { Container, GridContainer } from "@components/ui";
import { ProductItem } from "@components/product";
import ProductTopBanner from "@components/common/ProductTopBanner";

import { filterProducts } from "@lib/filter";

import { getDripMarketplaceOffers } from "services/api.service";

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale });

  const { products } = await getAllProducts({
    // variables: { first: 12 },
    config,
    preview,
  });

  const { dripMarketplaceOffers } = await getDripMarketplaceOffers();

  console.log("dripMarketplaceOffers: ", dripMarketplaceOffers);

  const wrappedProducts = products.map((item) => {
    const collectionId = item?.slug?.split("-")[1];
    if (collectionId) {
      const foundDripItem = dripMarketplaceOffers.find(
        (dripItem: any) => dripItem?.id === collectionId
      );

      if (foundDripItem && foundDripItem != undefined) {
        return {
          ...item,
          amountSold: foundDripItem.amountSold,
          startTime: foundDripItem.startTime,
          endTime: foundDripItem.endTime,
          rarity: foundDripItem.garmentCollection?.rarity,
        };
      }
    }

    return item;
  });

  return {
    props: {
      products: wrappedProducts,
      dripMarketplaceOffers,
      // pages,
    },
    revalidate: 14400,
  };
}

export default function ExplorePage({
  products,
  dripMarketplaceOffers,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const filteredProducts = filterProducts(products, filter, sortBy) || [];
  // console.log('dripMarketplaceOffer: ', dripMarketplaceOffers)
  console.log("filteredProducts: ", filteredProducts);

  return (
    <>
      <div className="relative bg-yellow">
        <div className="relative top-0 w-full overflow-hidden">
          <>
            <ProductTopBanner
              showFilterbar
              isExplorePage={true}
              filter={filter}
              setFilter={setFilter}
              setSortBy={setSortBy}
            />
            {/* <ProductTiles products={products} /> */}
            <Container>
              <GridContainer>
                {filteredProducts.map((product, index) => {
                  return (
                    <ProductItem
                      key={product.id}
                      product={product}
                      imgProps={{
                        width: 540,
                        height: 540,
                      }}
                    />
                  );
                })}
              </GridContainer>
            </Container>
          </>
        </div>
      </div>
    </>
  );
}
ExplorePage.Layout = Layout;
// export default ExplorePage
