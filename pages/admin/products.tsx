import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import { removeImagesApi } from '../../api/cloudinaryApi';
import { removeProductApi } from '../../api/productApi';
import AdminProductCard from '../../components/cards/AdminProductCard';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import AdminNav from '../../components/nav/AdminNav'
import { DashboardStyles } from '../../components/styles/DashboardStyles';
import { useApp } from '../../states/AppContext';
import { ProductType } from '../../types';

export async function getServerSideProps() {

  const res = await axios.get(`${process.env.apiUrl}/products/50`);
  return {
    props: {
      renderedProducts: res.data,
    },
  };
}

const Products = ({ renderedProducts } : { renderedProducts: ProductType[] }) => {
  const [products, setProducts] = useState<ProductType[]>(renderedProducts);
  const { user, loading, setLoading } = useApp();

  const handleRemove = async (slug: string) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      setLoading(true);
      let images: string[] = [];

      const product  = products.filter((p) => p.slug === slug);
      product[0].images.map((image) => {  
        images.push(image.public_id)
      })
      
      await removeImagesApi(images)

      await removeProductApi(slug, user.token)
        .then((res: any) => {
          // loadAllProducts();
          setProducts(products.filter((p) => p.slug !== slug))
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err: any) => {
          if (err.response.status === 400) toast.error(err.response.data);
          // console.log(err);
        });

      setLoading(false);
    }
  };
  
  return (
    <DashboardStyles>
      {loading && <Loading />}
      <Header />
      <div className="content_wrapper">
        <div className="left">
          <AdminNav />
        </div>
        <div className="right">
        <h1 className="page_header">All Products</h1>
        <div className="products_container">
            {products.map((product, index) => (
            <AdminProductCard
              key={index}
              product={product}
              handleRemove={handleRemove}
            />))}
        </div>
      </div>
      </div>
    </DashboardStyles>
  )
}

export default Products