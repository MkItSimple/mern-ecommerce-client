import { yupResolver } from '@hookform/resolvers/yup'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import CartDrawer from '../../components/drawers/CartDrawer'
import ProductForm from '../../components/forms/ProductForm'
import Header from '../../components/Header'
import AdminNav from '../../components/nav/AdminNav'
import { DashboardStyles } from '../../components/styles/DashboardStyles'
import { useApp } from '../../states/AppContext'
import { ProductFormInputs, ProductType, VariantType } from '../../types'

import * as yup from "yup";
import Loading from '../../components/Loading'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import FileUpload from '../../components/forms/FileUpload'
import { removePreviewSource } from '../../hooks/useResize'
import { uploadImageApi } from '../../api/cloudinaryApi'
import { createProductApi } from '../../api/productApi'
import { toast } from 'react-toastify'

const schema = yup.object({
  title: yup.string().required("title is required"),
  description: yup.string().required("description is required"),
  price: yup.number().integer().required("pride is required"),
  discount_price: yup.number().integer("must be a number").required("title is required"),
  sale: yup.string().required(),
  shipping: yup.string().required(),
  quantity: yup.number().integer().required(),
  brand: yup.string().required(),
  color: yup.string().required(),
  size: yup.string().required(),
}).required();

const Product = ({brands, colors, sizes}: {brands: VariantType[], colors: VariantType[], sizes: VariantType[]}) => {
  const { user, openCartDrawer, loading, setLoading } = useApp();
   const [previewSource, setPreviewSource] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ProductFormInputs) => {
    // if there is new images to upload
    if (previewSource.length > 0) {
      setLoading(true);
      await uploadImageApi({ image: previewSource }).then( async (res) => {
        
        createProductApi({
          ...data,
          images: [...res.data.images],
        }, user.token)
        .then((res) => {
          // console.log(res);
          toast.success(`"${res.data.title}" is created!`);
        })
      })
    } else {
      // console.log("images to be submitted ", imagesToSend);
      setLoading(true);
     createProductApi(data, user.token).then((res) => {
        toast.success(`"${res.data.title}" is created!`);
      });
    }
    setLoading(false);
  }

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      // console.log(reader.result);
      setPreviewSource((previewSource) => [...previewSource, reader.result as string]);
    };
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
     let files = e.target.files;
     if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await readFile(file)
      }
    }
  };

  // Remove Preview Sources
  const handleRemove = (preview: string) => {
    let newPreviewSource = removePreviewSource(previewSource, preview);
    setPreviewSource(newPreviewSource);
  };

  const resetImagesHandler = (product: ProductType) => {
    setPreviewSource([]);
  };

  return (
    <>
    {loading && <Loading />}
    <DashboardStyles>
      { openCartDrawer && <CartDrawer/>}
       <Header />
      <div className="page_content_wrapper">
        <div className="left">
          <AdminNav />
        </div>
        <div className="right">
            <h1 className="page_header">Product Create</h1>
            {/* <FileUpload /> */}
            <FileUpload 
            previewSource={previewSource} 
            handleRemove={handleRemove} 
            // moveCard={moveCard} findCard={findCard} 
            handleFileInputChange={handleFileInputChange} 
            resetImagesHandler={resetImagesHandler}          />
            <ProductForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} values={{brands, colors, sizes}} />
          </div>
      </div>
    </DashboardStyles>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const brandsRes = await axios.get('http://localhost:8001/api/brands');
  const colorsRes = await axios.get('http://localhost:8001/api/colors');
  const sizesRes = await axios.get('http://localhost:8001/api/sizes');

  return {
    props: {
      brands: brandsRes.data,
      colors: colorsRes.data,
      sizes: sizesRes.data,
    },
  };
}

export default Product