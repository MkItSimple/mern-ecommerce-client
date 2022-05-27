import { useApp } from "../../states/AppContext";
import Backdrop from "../Backdrop";
import { SearchDrawerStyles } from "./SearchDrawerStyles";

const SearchDrawer = () => {
  const { setOpenSearchDrawer } = useApp()

  const closeSomething = () => {
    setOpenSearchDrawer(false)
  };

  return (
    <SearchDrawerStyles>
      <div className="search_container">
        <svg
          aria-hidden="true"
          focusable="false"
          role="presentation"
          className="icon icon-search"
          viewBox="0 0 64 64"
        >
          <path d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path>
        </svg>
        <input type="text" className="big" placeholder="Search our store" />
        <svg
          aria-hidden="true"
          focusable="false"
          role="presentation"
          className="icon icon-close"
          viewBox="0 0 64 64"
          onClick={closeSomething}
        >
          <path d="M19 17.61l27.12 27.13m0-27.12L19 44.74"></path>
        </svg>
      </div>
      <Backdrop closeSomething={closeSomething} />
    </SearchDrawerStyles>
  );
};

export default SearchDrawer;
