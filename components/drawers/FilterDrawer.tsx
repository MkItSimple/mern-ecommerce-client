import React from "react";
import { useApp } from "../../states/AppContext";
import { Product, VariantType } from "../../types";
import Backdrop from "../Backdrop";
import FilterForm from "../forms/FilterForm";
import DrawerHeader from "./DrawerHeader";
import { FilterDrawerStyles } from "./FilterDrawerStyles";

interface FilterDrawerProps {
  params: {
    products: Product[],
    brands: VariantType[],
    colors: VariantType[],
    sizes: VariantType[],
  }
}
const FilterDrawer = ({params}: FilterDrawerProps) => {
  const { setOpenFilterDrawer } = useApp();

  return (
    <FilterDrawerStyles>
      <div className="drawer">
        <DrawerHeader
          text="Filter"
          closeSomething={() => setOpenFilterDrawer(false)}
        />
        <div className="cart_items_container">
          <FilterForm params={params}/>
        </div>
      </div>
      <Backdrop closeSomething={() => setOpenFilterDrawer(false)} />
    </FilterDrawerStyles>
  );
};

export default FilterDrawer;
