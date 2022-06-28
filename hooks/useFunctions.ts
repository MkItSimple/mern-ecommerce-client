
import { CartItemType, Product, Sort, VariantType } from "../types";

export const getCartTotal = (arr: CartItemType[]) =>
    arr.reduce((total, item) => (total += item.price * item.quantity), 0);

export const getValueText = (array: any[]) => {
    let valueText = [];
    for (let i = 0; i < array.length; i++) {
      const element = {value: array[i]._id, text: array[i].name};
      valueText.push(element);
    }
    
    return valueText;
  };

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getHighestPrice = (products: Product[]): number => {
  return Math.max.apply(Math, products.map(function(p: any) { return p.price; }))
};

export const getLowestPrice = (products: Product[]): number => {
  return Math.min.apply(Math, products.map(function(p: any) { return p.price; }))
};


export const getIds = (variants: VariantType[]) => {
  let ids: string[] = []
  variants.map((v) => { ids.push(v._id) })
  return ids;
};
export const getSlugs = (variants: VariantType[]) => {
  let slugs: string[] = []
  variants.map((v) => { slugs.push(v.slug) })
  return slugs;
};


// Extract new unique colors and sizes from products by brandFilters
export const getUniquesByBrands = (products: Product[], brandFilters: string[]) => {
  let colors: VariantType[] = [];
  let sizes: VariantType[] = [];
  let newVisibleVariants: {
    uniqueColors: VariantType[],
    uniqueSizes: VariantType[],
  } = {
    uniqueColors: [],
    uniqueSizes: [],
  };

  products.map((product) => {
    // check products with this brand
    if (
      brandFilters.length !== 0 &&
      brandFilters.lastIndexOf(product.brand.slug) !== -1
    ) {
      colors.push(product.color);
      sizes.push(product.size);
    }
  });

  let uniqueColors: VariantType[] = [...new Set(colors.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );

  let uniqueSizes: VariantType[] = [...new Set(sizes.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );

  newVisibleVariants = {
    ...newVisibleVariants,
    uniqueColors,
    uniqueSizes,
  };

  return newVisibleVariants;
};

export const getUniquesByColors = (products: Product[], colorFilters: string[]) => {
  let brands: VariantType[] = [];
  let sizes: VariantType[] = [];
  let newVisibleVariants: {
    uniqueBrands: VariantType[],
    uniqueSizes: VariantType[],
  } = {
    uniqueBrands: [],
    uniqueSizes: [],
  };

  products.map((product) => {
    // check products with this color
    if (
      colorFilters.length !== 0 &&
      colorFilters.lastIndexOf(product.color.slug) !== -1
    ) {
      brands.push(product.brand);
      sizes.push(product.size);
    }
  });

  const uniqueBrands = [...new Set(brands.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );
  const uniqueSizes = [...new Set(sizes.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );

  newVisibleVariants = {
    ...newVisibleVariants,
    uniqueBrands,
    uniqueSizes,
  };

  return newVisibleVariants;
};

export const getUniquesBySizes = (products: Product[], sizeFilters: string[]) => {
  let brands: VariantType[] = [];
  let colors: VariantType[] = [];
  let newVisibleVariants: {
    uniqueBrands: VariantType[],
    uniqueColors: VariantType[],
  } = {
    uniqueBrands: [],
    uniqueColors: [],
  };

  products.map((product) => {
    if (
      sizeFilters.length !== 0 &&
      sizeFilters.lastIndexOf(product.size.slug) !== -1
    ) {
      brands.push(product.brand);
      colors.push(product.color);
    }
  });

  const uniqueBrands = [...new Set(brands.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );
  const uniqueColors = [...new Set(colors.map((o) => JSON.stringify(o)))].map(
    (string) => JSON.parse(string)
  );

  newVisibleVariants = {
    ...newVisibleVariants,
    uniqueBrands,
    uniqueColors,
  };

  return newVisibleVariants;
};


export const getProductByBrand = (complexProducts: Product[]) => {
  let products = [];
    for (let index = 0; index < complexProducts.length; index++) {
      // const brand = complexProducts[index].brand;
      // brand.find((x) => x.slug === "word-balance");
      if (complexProducts[index].brand.slug == "nike") {
        products.push(complexProducts[index]);
      }
    }
    return products;
}
interface ComplexProduct {
    _id: string;
    size: {
        _id: string;
        name: string;
        slug: string;
    };
    color: {
        _id: string;
        name: string;
        slug: string;
    };
    brand: {
        _id: string;
        name: string;
        slug: string;
    };
    price: number;
    title: string;
}

export interface VariantsType {
    brands: string[],
    colors: string[],
    sizes: string[],
    price: number[],
  }

export const getProductsByFilters = (sort: string, products: Product[], allVariants: VariantsType, filterVariants: VariantsType) => {
  const brands = filterVariants.brands.length > 0 ? filterVariants.brands : allVariants.brands;
  const colors = filterVariants.colors.length > 0 ? filterVariants.colors : allVariants.colors;
  const sizes = filterVariants.sizes.length > 0 ? filterVariants.sizes : allVariants.sizes;
  let lowestPrice = filterVariants.price[0] > 0 ? filterVariants.price[0] : allVariants.price[0];
  let highestPrice = filterVariants.price[1] > 0 ? filterVariants.price[1] : allVariants.price[1];
  let sortedArray: Product[] = [];

  const newArray = products.filter(function (el) {
    return brands.includes(el.brand.slug) && colors.includes(el.color.slug) && sizes.includes(el.size.slug) && el.price >= lowestPrice && el.price <= highestPrice
  });

  switch (sort) {
    case Sort.SORT: 
      // console.log("SORT");
      break;
    case Sort.BEST_SELLING: 
      // console.log("BEST_SELLING");
      sortedArray = newArray?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
      break;
    case Sort.A_TO_Z: 
      // console.log("A_TO_Z");
      sortedArray = newArray.sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
      })
      break;
    case Sort.Z_TO_A: 
      // console.log("Z_TO_A");
      sortedArray = newArray.sort(function(a, b){
          if(a.title > b.title) { return -1; }
          if(a.title < b.title) { return 1; }
          return 0;
      })
      break;
    case Sort.PRICE_LOW_TO_HIGH: 
      // console.log("PRICE_LOW_TO_HIGH");
      sortedArray = newArray?.sort((a, b) => (a.price > b.price ? 1 : -1))
      break;
    case Sort.PRICE_HIGH_TO_LOW: 
      // console.log("PRICE_HIGH_TO_LOW");
      sortedArray = newArray?.sort((a, b) => (a.price < b.price ? 1 : -1))
      break;
    default:
      sortedArray = newArray
      break;
  }

  return sortedArray;
}
