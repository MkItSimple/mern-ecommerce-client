

import { VariantType, Product } from "../types";
import Header from "../components/Header"
import FilterDrawer from "../components/drawers/FilterDrawer"
import axios from "axios";
import styled from 'styled-components';
import { GetServerSideProps } from "next";
import ProductCard from "../components/cards/ProductCard";
import { device } from "../components/styles/GlobalStyles";
import CartDrawer from "../components/drawers/CartDrawer";
import { useApp } from "../states/AppContext";
import SearchDrawer from "../components/drawers/SearchDrawer";
import SortingSelection from "../components/SortingSelection";
import FilterForm from "../components/forms/FilterForm";
import IconFilter from "../components/svg/IconFilter";

const ProductsStyles = styled.div`
  .content_wrapper {
    max-width: 1600px;
    padding: 1.7em 2.2em 0em 2.2em;
    margin: 0 auto;
    display: flex;
    @media only screen and ${device.tablet} {
      padding: 1.7em 2em 0em 2em;
    }
  }

  .left {
    width: 270px;
    padding-right: 2em;
    @media only screen and ${device.tablet} {
      display: none;
    }
  }

  .right {
    flex: 1;
  }

  .filter_container {
    display: flex;
    align-items: end;
    justify-content: end;
    box-sizing: border-box;
    margin-bottom: 1em;
    z-index: 5;

    @media only screen and ${device.tablet} {
      position: -webkit-sticky;
      position: sticky; 
      top: 90px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
    }}
  }

  .filter_button {
    display: flex;
    align-items: center;
    span {
      font-size: var(--fontSizeMedium);
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 1em;
      vertical-align: middle;
      fill: var(--colorWhite);
    }
    display: none;
    @media only screen and ${device.tablet} {
      display: block;
    }}
  }

  .products_container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;

    @media only screen and ${device.desktop} {
    }
    @media only screen and ${device.laptopL} {
    }
    @media only screen and ${device.laptop} {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and ${device.tablet} {
      grid-template-columns: 1fr 1fr 1fr;
      padding-top: 2em;
    }
    @media only screen and ${device.mobileL} {
      grid-template-columns: 1fr 1fr;
    }
  }
`
const Shop = ({products, brands, colors, sizes}: {products: Product[], brands: VariantType[], colors:VariantType[], sizes:VariantType[]}) => {
  const { openCartDrawer, openSearchDrawer, openFilterDrawer, setOpenFilterDrawer } = useApp();
  const {filteredProducts} = useApp();

  const params = {
    products,
    brands,
    colors,
    sizes,
  }

  return (
    <>
    {openFilterDrawer && <FilterDrawer params={params}/>}
    {openCartDrawer && <CartDrawer />}
    {openSearchDrawer && <SearchDrawer />}
    <Header />
    <ProductsStyles>
      <div className="content_wrapper">
        <div className='left'>
          {!openFilterDrawer && <FilterForm params={params}/>}
        </div>
        <div className='right'>
          <div className="filter_container">
            <div
              className="btn_custom regular filter_button"
              onClick={() => setOpenFilterDrawer(true)}
            >
              <IconFilter />
              <span>Filter</span>
            </div>
            <SortingSelection />
          </div>
          <div className="products_container">
            {filteredProducts.map((p: Product, index: string) => (
              <ProductCard key={index} product={p}/>
            ))}
          </div>
        </div>
      </div>
    </ProductsStyles>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
export const getServerSideProps: GetServerSideProps = async () => {

  const productsRes = await axios.get('http://localhost:8001/api/products/100');
  const brandsRes = await axios.get('http://localhost:8001/api/brands');
  const colorsRes = await axios.get('http://localhost:8001/api/colors');
  const sizesRes = await axios.get('http://localhost:8001/api/sizes');

  return {
    props: {
      products: productsRes.data,
      brands: brandsRes.data,
      colors: colorsRes.data,
      sizes: sizesRes.data,
    },
  };
}

export default Shop;