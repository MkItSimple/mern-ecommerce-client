import { Slider } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getLowestPrice, getHighestPrice, getProductsByFilters, getSlugs, getUniquesByBrands, getUniquesByColors, getUniquesBySizes, numberWithCommas } from "../../hooks/useFunctions";
import { useApp } from "../../states/AppContext";
import { Product, VariantType } from "../../types";
import ChevronDown from "../svg/ChevronDown";
import { FilterFormStyles } from "./FilterFormStyles";

interface FilterFormProps {
  params: {
    products: Product[],
    brands: VariantType[],
    colors: VariantType[],
    sizes: VariantType[],
  }
}
const FilterForm = ({params}: FilterFormProps) => {
  const router = useRouter();
  const { sort } = useApp();

  const [allVariants, _] = useState<{
    brands: string[],
    colors: string[],
    sizes: string[],
    price: number[],
  }>({
    brands: getSlugs(params.brands),
    colors: getSlugs(params.colors),
    sizes: getSlugs(params.sizes),
    price: [getLowestPrice(params.products), getHighestPrice(params.products)],
  });

  const {setFilteredProducts} = useApp();

  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [sizeFilters, setSizeFilters] = useState<string[]>([]);
 
  const [selectedBrands, setSelectedBrands] = useState<VariantType[]>([]);
  const [selectedColors, setSelectedColors] = useState<VariantType[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<VariantType[]>([]);
  
  const [visibleBrands, setVisibleBrands] = useState<VariantType[]>(params.brands);
  const [visibleColors, setVisibleColors] = useState<VariantType[]>(params.colors);
  const [visibleSizes, setVisibleSizes] = useState<VariantType[]>(params.sizes);

  const [priceFilters, setPriceFilters] = useState<number[]>([getLowestPrice(params.products), getHighestPrice(params.products)]);

  // To update visible variant options
   const getUniquesByBrandsHandler = (newChecked: string[]) => {
    let newVisibleVariants = getUniquesByBrands(params.products, newChecked);
    setVisibleColors(newVisibleVariants.uniqueColors);
    setVisibleSizes(newVisibleVariants.uniqueSizes);
  };

  const getUniquesByColorsHandler = (newChecked: string[]) => {
    let newVisibleVariants = getUniquesByColors(params.products, newChecked);
    setVisibleBrands(newVisibleVariants.uniqueBrands);
    setVisibleSizes(newVisibleVariants.uniqueSizes);
  };

  const getUniquesBySizesHandler = (newChecked: string[]) => {
    let newVisibleVariants = getUniquesBySizes(params.products, newChecked);
    setVisibleBrands(newVisibleVariants.uniqueBrands);
    setVisibleColors(newVisibleVariants.uniqueColors);
  };


  // To show brands you selected on top of filter form
  const setSelectedBrandsHandler = (newChecked: string[]) => {
    setSelectedBrands(
      params.brands.filter((brand) => newChecked.lastIndexOf(brand.slug) !== -1)
    )
  }

  // To show colors you selected on top of filter form
  const setSelectedColorsHandler = (newChecked: string[]) => {
    setSelectedColors(
      params.colors.filter((color) => newChecked.lastIndexOf(color.slug) !== -1)
    )
  }

  // To show sizes you selected on top of filter form
  const setSelectedSizesHandler = (newChecked: string[]) => {
    setSelectedSizes(
      params.sizes.filter((size) => newChecked.lastIndexOf(size.slug) !== -1)
    )
  }

  const onBrandChange = (value: string) => {
    // to check or uncheck by adding and removing to filter array
    const currentIndex = brandFilters.indexOf(value);
    let newChecked = [...brandFilters];
    currentIndex === -1
      ? (newChecked = [...newChecked, value])
      : newChecked.splice(currentIndex, 1);
    setBrandFilters(newChecked);

    // Update the URL params
    const brandUrlParam = newChecked.length > 0 ? `brand=${newChecked.join(',')}&` : "";
    const colorUrlParam = colorFilters.length > 0 ? `color=${colorFilters.join(',')}&` : "";
    const sizeUrlParam = sizeFilters.length > 0 ? `size=${sizeFilters.join(',')}&` : "";
    const priceUrlParam = priceFilters.length > 0 ? `price=${priceFilters.join(',')}` : "";
    router.push(`/?${brandUrlParam + '' + colorUrlParam + '' + sizeUrlParam}`, undefined, { shallow: true });

    // To show variants you selected on top
    setSelectedBrandsHandler(newChecked);

    // To update visible variant options
    // getUniquesByBrandsHandler(newChecked)
    if (newChecked.length !== 0) {
      getUniquesByBrandsHandler(newChecked);
    } else {
      setVisibleColors(params.colors);
      setVisibleSizes(params.sizes);
    }
  };
  const onColorChange = (value: string) => {
    // to check or uncheck by adding and removing to filter array
    const currentIndex = colorFilters.indexOf(value);
    let newChecked = [...colorFilters];
    currentIndex === -1
      ? (newChecked = [...newChecked, value])
      : newChecked.splice(currentIndex, 1);
    setColorFilters(newChecked);

    // Update the URL params
    const brandUrlParam = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : "";
    const colorUrlParam = newChecked.length > 0 ? `color=${newChecked.join(',')}&` : "";
    const sizeUrlParam = sizeFilters.length > 0 ? `size=${sizeFilters.join(',')}&` : "";
    const priceUrlParam = priceFilters.length > 0 ? `price=${priceFilters.join(',')}` : "";
    router.push(`/?${brandUrlParam + '' + colorUrlParam + '' + sizeUrlParam + '' + priceUrlParam}`, undefined, { shallow: true });

    // To show variants you selected on top of this filter form
    setSelectedColorsHandler(newChecked);

     // To update visible variant options
    // getUniquesByColorsHandler(newChecked)
    if (newChecked.length !== 0) {
      getUniquesByColorsHandler(newChecked);
    } else {
      setVisibleBrands(params.brands);
      setVisibleSizes(params.sizes);
    }
  };
  const onSizeChange = (value: string) => {
    const currentIndex = sizeFilters.indexOf(value);
    let newChecked = [...sizeFilters];
    currentIndex === -1
      ? (newChecked = [...newChecked, value])
      : newChecked.splice(currentIndex, 1);
    setSizeFilters(newChecked);

    // Update the URL params
    const brandUrlParam = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : "";
    const colorUrlParam = colorFilters.length > 0 ? `color=${colorFilters.join(',')}&` : "";
    const sizeUrlParam = newChecked.length > 0 ? `size=${newChecked.join(',')}&` : "";
    const priceUrlParam = priceFilters.length > 0 ? `price=${priceFilters.join(',')}` : "";
    router.push(`/?${brandUrlParam + '' + colorUrlParam + '' + sizeUrlParam + '' + priceUrlParam}`, undefined, { shallow: true });

    // To show variants you selected on top
    setSelectedSizesHandler(newChecked);

     // To update visible variant options
    // getUniquesBySizesHandler(newChecked)
    if (newChecked.length !== 0) {
      getUniquesBySizesHandler(newChecked);
    } else {
      setVisibleBrands(params.brands);
      setVisibleColors(params.colors);
    }
  };

  const onPriceChange = (event: Event, newValue: number | number[]) => {
    setPriceFilters(newValue as number[]);
  };

  const udpateByPrice = useCallback(
    () => {
      const brandUrlParam = brandFilters.length > 0 ? `brand=${brandFilters.join(',')}&` : "";
      const colorUrlParam = colorFilters.length > 0 ? `color=${colorFilters.join(',')}&` : "";
      const sizeUrlParam = sizeFilters.length > 0 ? `size=${sizeFilters.join(',')}&` : "";
      const priceUrlParam = priceFilters.length > 0 ? `price=${priceFilters.join(',')}` : "";
      // const sortParam = sort ? `sort=${sort}` : "";
      router.push(`/?${brandUrlParam + '' + colorUrlParam + '' + sizeUrlParam + '' + priceUrlParam}`, undefined, { shallow: true });
    },
    [brandFilters, colorFilters, sizeFilters, priceFilters, router],
  );

  // step 1
  useEffect(() => {
    const {brand, color, size, price} = router.query
    const brandQuery = brand ? (brand as string).split(',') : [];
    const colorQuery = color ? (color as string).split(',') : [];
    const sizeQuery = size ? (size as string).split(',') : [];
    const priceQuery = price ? (price as string).split(',') : [];
    
    setFilteredProducts(getProductsByFilters(sort, params.products, allVariants, {
      brands: brandQuery,
      colors: colorQuery,
      sizes: sizeQuery,
      price: [Number(priceQuery[0]), Number(priceQuery[1])],
    }))

  }, [router.query, allVariants, params.products, setFilteredProducts, sort])

  // Get product quantity for earch variant
  const quantityByBrand = (brand: string) => {
    return params.products.filter((product: Product) => product.brand.name === brand).length;
  };
  const quantityByColor = (color: string) => {
    return params.products.filter((product: Product) => product.color.name === color).length;
  };
  const quantityBySize = (size: string) => {
    return params.products.filter((product: Product) => product.size.name === size).length;
  };

  return (
    <FilterFormStyles>
      <ul className="selected_variants">
        {selectedBrands.map((brand) => (
          <li key={brand._id}>
            <span className="text">{brand.name}</span>
            <span
              className="removeFilter"
              onClick={() =>
               {
                  setBrandFilters(brandFilters.filter((x) => x !== brand.slug));
                  setSelectedBrands(selectedBrands.filter((x) => x.slug !== brand.slug));
               }
              }
            >
              X 
            </span>
          </li>
        ))}
        {selectedColors.map((color) => (
          <li key={color._id}>
            <span className="text">{color.name}</span>
            <span
              className="removeFilter"
              onClick={() =>
                {
                  setColorFilters(colorFilters.filter((x) => x !== color.slug));
                  setSelectedColors(selectedColors.filter((x) => x.slug !== color.slug));
               }
              }
            >
              X
            </span>
          </li>
        ))}
        {selectedSizes.map((size) => (
          <li key={size._id}>
            <span className="text">{size.name}</span>
            <span
              className="removeFilter"
              onClick={() =>
                {
                  setSizeFilters(sizeFilters.filter((x) => x !== size.slug));
                  setSelectedSizes(selectedSizes.filter((x) => x.slug !== size.slug));
                }
              }
            >
              X
            </span>
          </li>
        ))}
      </ul>
      <div className="accordion">
        <div>
          <input
            type="checkbox"
            name="example_accordion"
            id="section1"
            className="accordion__input"
          />
          <label htmlFor="section1" className="accordion__label">
            <span className="header_text">Brand</span>
            <ChevronDown />
          </label>
          <div className="accordion__content ">
            {visibleBrands &&
              visibleBrands.map((brand) => (
                <div key={brand.name}>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={brand.name}
                    name={brand.name}
                    onChange={() => onBrandChange(brand.slug)}
                    checked={brandFilters.indexOf(brand.slug) !== -1}
                  />
                  <label htmlFor={brand.name}>
                    <span className="tag__checkbox"></span>
                    <span className="tag__text">
                      {brand.name} ({quantityByBrand(brand.name)})
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="example_accordion"
            id="section2"
            className="accordion__input"
          />
          <label htmlFor="section2" className="accordion__label">
            <span className="header_text">Color</span>
            <ChevronDown />
          </label>
          <div className="accordion__content ">
            {visibleColors &&
              visibleColors.map((color) => (
                <div key={color.name}>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={color.name}
                    name={color.name}
                    onChange={() => onColorChange(color.slug)}
                    // checked={() => {}}
                    checked={colorFilters.indexOf(color.slug) !== -1}
                  />
                  <label htmlFor={color.name}>
                    <span className="tag__checkbox"></span>
                    <span className="tag__text">
                      {color.name} ({quantityByColor(color.name)})
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            name="example_accordion"
            id="section3"
            className="accordion__input"
          />
          <label htmlFor="section3" className="accordion__label">
            <span className="header_text">Size</span>
            <ChevronDown />
          </label>
          <div className="accordion__content ">
            {visibleSizes &&
              visibleSizes.map((size) => (
                <div key={size.name}>
                  <input
                    className="custom-checkbox"
                    type="checkbox"
                    id={size.name}
                    name={size.name}
                    onChange={() => onSizeChange(size.slug)}
                    // checked={() => {}}
                    checked={sizeFilters.indexOf(size.slug) !== -1}
                  />
                  <label htmlFor={size.name}>
                    <span className="tag__checkbox"></span>
                    <span className="tag__text">
                      {size.name} ({quantityBySize(size.name)})
                    </span>
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="example_accordion"
            id="section4"
            className="accordion__input"
          />
          <label htmlFor="section4" className="accordion__label">
            <span className="header_text">Price</span>
            <ChevronDown />
          </label>
          <div className="accordion__content">
            <div className="price_range_label">
              <span className="lowest_price">
                ₱{numberWithCommas(priceFilters[0])}
              </span>
              <span className="highest_price">
                ₱{numberWithCommas(priceFilters[1])}
              </span>
            </div>

            <Slider
              getAriaLabel={() => 'Temperature range'}
              value={priceFilters}
              onChange={onPriceChange}
              min={getLowestPrice(params.products)}
              max={getHighestPrice(params.products)}
            />
          </div>
        </div>
      </div>

    </FilterFormStyles>
  );
};

export default FilterForm;