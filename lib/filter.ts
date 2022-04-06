export const filterProducts = (prods: Array<any>, filter: string, sortBy: string, isCollection: boolean = false) => {

    console.log('filter: ', filter)
    console.log('sortBy: ', sortBy)

    let filteredProducts = [...prods];
    if (filter.length) {
      filteredProducts = prods.filter(
        (prod) =>
          prod.name.toLowerCase().includes(filter.toLowerCase()) ||
          prod.designer?.name.toLowerCase().includes(filter.toLowerCase()) ||
          prod.garment?.name.toLowerCase().includes(filter.toLowerCase()) ||
          prod.owners?.find(
            (item: any) => item.username && item.username.toLowerCase().includes(filter.toLowerCase()),
          ),
      );
    }
    if (sortBy) {
      switch (sortBy) {
        case '1':
          filteredProducts.sort((a, b) => {
            if (parseInt(a.startTime) < parseInt(b.startTime)) return 1;
            if (parseInt(a.startTime) > parseInt(b.startTime)) return -1;
            return 0;
          });
          break;
        case '2':
          isCollection
          ? filteredProducts.sort((a, b) => {
            const aPrice = a.totalSold
            const bPrice = b.totalSold
            if (BigInt(aPrice) < BigInt(bPrice)) return 1
            if (BigInt(aPrice) > BigInt(bPrice)) return -1
            return 0;
          })
          : filteredProducts.sort((a, b) => {
            const aPrice = a.price?.value || 0
            const bPrice = b.price?.value || 0
            if (BigInt(aPrice) < BigInt(bPrice)) return 1
            if (BigInt(aPrice) > BigInt(bPrice)) return -1
            return 0;
          });
          break;
        case '3':
          isCollection
          ? filteredProducts.sort((a, b) => {
            const aPrice = a.totalSold
            const bPrice = b.totalSold
            if (BigInt(aPrice) > BigInt(bPrice)) return 1
            if (BigInt(aPrice) < BigInt(bPrice)) return -1
            return 0;
          })
          : filteredProducts.sort((a, b) => {
            const aPrice = a.price?.value || 0
            const bPrice = b.price?.value || 0
            if (BigInt(aPrice) > BigInt(bPrice)) return 1
            if (BigInt(aPrice) < BigInt(bPrice)) return -1
            return 0;
          });
          break;
        case '4':
          filteredProducts.sort((a, b) => {
            const aAmount = a.amountSold
            const bAmount = b.amountSold
            if (BigInt(aAmount) < BigInt(bAmount)) return 1
            if (BigInt(aAmount) > BigInt(bAmount)) return -1
            return 0;
          });
          break;
        case '5':
          filteredProducts = isCollection
            ? filteredProducts.filter((prod) => prod?.products.find((item: any) => item?.rarity === 'Exclusive'))
            : filteredProducts.filter((prod) => prod.rarity === 'Exclusive')
          break;
        case '6':
          filteredProducts = isCollection
            ? filteredProducts.filter((prod) => prod?.products.find((item: any) => item?.rarity === 'Semi-Rare'))
            : filteredProducts.filter((prod) => prod.rarity === 'Semi-Rare')
          break;
        case '7':
          filteredProducts = isCollection
            ? filteredProducts.filter((prod) => prod?.products.find((item: any) => item?.rarity === 'Common'))
            : filteredProducts.filter((prod) => prod.rarity === 'Common')
          break;
      }
    }
    return filteredProducts;
  };