import update from "immutability-helper";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import AdminNav from '../../../components/nav/AdminNav';
import { ImageType, ProductFormInputs, ProductType, VariantType } from '../../../types';

import * as yup from "yup";
import Loading from '../../../components/Loading';
import { removePreviewSource } from '../../../hooks/useResize';
import { removeImagesApi, uploadImageApi } from '../../../api/cloudinaryApi';
import { updateProductApi } from '../../../api/productApi';
import { toast } from 'react-toastify';
import ProductForm from "../../../components/forms/ProductForm";
import FileUpload from "../../../components/forms/FileUpload";

import { ProductUpdateStyles } from '../../../components/styles/ProductUpdateStyles';
import { useApp } from "../../../states/AppContext";
import Header from "../../../components/Header";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";

const schema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().integer().required(),
  discount_price: yup.number().integer().required(),
  sale: yup.string().required(),
  shipping: yup.string().required(),
  quantity: yup.number().integer().required(),
  brand: yup.string().required(),
  color: yup.string().required(),
  size: yup.string().required(),
}).required();

const ProductPage = ({product, brands, colors, sizes}:{product:ProductType, brands: VariantType[], colors: VariantType[], sizes: VariantType[]}) => {
  const router = useRouter();
  const slug = router.query.slug;
  const [previewSource, setPreviewSource] = useState<string[]>([]);
  const {user, loading, setLoading} = useApp();

  // Temporarily Removed Existing Images IDs
  const [existingImages, setExistingImages] = useState<ImageType[]>([]);

  // Temporarily Removed Images IDs
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [imagesToSend, setImagesToSend] = useState<ImageType[]>([]);

  // Remove Preview Sources
  const handleRemove = (preview: string) => {
    let newPreviewSource = removePreviewSource(previewSource, preview);
    setPreviewSource(newPreviewSource);
  };

  // Collecting Existing Images IDs to REMOVE
  const handleRemoveExisting = (public_id: string) => {
    setRemovedImages((removedImages) => [...removedImages, public_id]);
    setExistingImages((existingImages) => existingImages.filter((i) => i.public_id !== public_id));
  };

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: ProductFormInputs) => {
    console.log("data ", data);

    // Delete images from cloudingary
    if (removedImages.length > 0) {
      setLoading(true);
      await removeImagesApi(removedImages);
    }

    // if there is new images to upload
    if (previewSource.length > 0) {
      setLoading(true)
      await uploadImageApi({ image: previewSource }).then( async (res) => {
        
        slug && updateProductApi(slug as string, {
          ...data,
          images: [...res.data.images, ...imagesToSend],
        }, user.token)
        .then((res) => {
          console.log(res);
          toast.success(`"${res.data.title}" is updated!`);
        })
      })
    } else {
      // console.log("images to be submitted ", imagesToSend);
      setLoading(true);
      slug && updateProductApi(slug as string, {
        ...data,
        images: imagesToSend,
      }, user.token).then((res) => {
          console.log(res);
          toast.success(`"${res.data.title}" is updated!`);
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

  const resetImagesHandler = (product: ProductType) => {
    setExistingImages(product.images);
    setPreviewSource([]);
  };

  // This is for drag and drop of images positioning
  const findCard = useCallback(
    (id: string) => {
      const card = existingImages.filter((c) => `${c.public_id}` === id)[0];
      return {
        card,
        index: existingImages.indexOf(card),
      };
    },
    [existingImages]
  );

  // This is for drag and drop of images positioning
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    console.log("moveCard ", dragIndex, hoverIndex);
    
    setExistingImages((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  useEffect(() => {
    const updatedImages: ImageType[] = [];
    existingImages.map((card, index) => {
      const newCard = { ...card, hover_index: index };
      updatedImages.push(newCard);
    });
    setImagesToSend(updatedImages);
  }, [existingImages]);

  const setFormValues = useCallback(
    (product: ProductType) => {
      setValue('quantity', product.quantity);
      setValue('size', product.size._id);
      setValue('color', product.color._id);
      setValue('brand', product.brand._id);
      setValue('shipping', product.shipping);
      setValue('discount_price', product.discount_price);
      setValue('price', product.price);
      setValue('description', product.description);
      setValue('title', product.title);
      setValue('sale', product.sale);

      // Sort images first by hover_index
      const sortedImages = product.images.sort((a: ImageType, b: ImageType) => (a.hover_index > b.hover_index ? 1 : -1));
      setExistingImages(sortedImages);
    },
    [setValue],
  )
  
  // set react hook form default input values
  useEffect(() => {
    if (product) {
      setFormValues(product)
      console.log(product.images);
    }
  }, [product, setFormValues])
  
  return (
    <>
    {loading && <Loading />}
    <DashboardStyles>
      {loading && <Loading />}
      <Header />
      <div className="content_wrapper">
        <div className="left">
          <AdminNav />
        </div>
        <div className="right">
          <div className="wrapper">
            <h1 className="page_header">Product Update</h1>
          <FileUpload
            product={product} existingImages={existingImages} previewSource={previewSource} handleRemoveExisting={handleRemoveExisting} handleRemove={handleRemove} moveCard={moveCard} findCard={findCard} handleFileInputChange={handleFileInputChange} resetImagesHandler={resetImagesHandler}          />
          <br />
          {/* <ProductForm /> */}
          {/* <ProductForm cho="choreyn" /> */}
          <ProductForm handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} values={{brands, colors, sizes}}/>
          </div>
        </div>
      </div>
    </DashboardStyles>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

  // const slug = context.params
  let productRes = null;

  if (params) {
    productRes = await axios.get(`${process.env.apiUrl}/product/${params.slug}`);
  }
  
  const brandsRes = await axios.get(`${process.env.apiUrl}/brands`);
  const colorsRes = await axios.get(`${process.env.apiUrl}/colors`);
  const sizesRes = await axios.get(`${process.env.apiUrl}/sizes`);

  return {
    props: {
      product: productRes ? productRes.data : {},
      brands: brandsRes.data,
      colors: colorsRes.data,
      sizes: sizesRes.data,
    },
  };
}

export default ProductPage

// http://localhost:3000/admin/product/nike-air-max-impact-3