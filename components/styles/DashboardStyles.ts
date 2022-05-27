import styled from 'styled-components';
import { device, TableMixins } from './GlobalStyles';
export const DashboardStyles = styled.div`
${TableMixins}
    .content_wrapper {
    max-width: 1600px;
    /* background-color: #eee; */
    padding: 0em 2em;
    /* background-color: rgba(0, 0, 0, 0.1); */
    margin: 0 auto;
    /* background: #eee; */
    display: grid;
    grid-template-columns: 250px auto;
    @media only screen and ${device.laptop} {

    }
  }

  .right {
    flex: 1;
    padding: 1em 2em;
  }

  .products_container {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-gap: 2em;
  }

  .image_tag_container {
      display: block;
      height: 40px;
      width: 40px;
      position: relative;
  }

  .wishlist {
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }
  .whishlist_item {
    cursor: pointer;
  }

  .icon_container {
    height: 30px;
    width: 30px;
  }
  h1 {
    margin: 0px;
  }
  form {
    max-width: 600px;
  }
  label {
    margin-top: 1em;
  }
  .btn_white {
    border: none;
  }
  .btn {
    margin-top: 1em;
  }
`