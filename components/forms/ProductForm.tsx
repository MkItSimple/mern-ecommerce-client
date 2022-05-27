import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import React, { BaseSyntheticEvent } from 'react'
import { FieldError, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { getValueText } from '../../hooks/useFunctions';
import { ProductFormInputs, VariantType } from '../../types';
import FormInput from './FormInput';
import FormSelectInput from './FormSelectInput';

interface ProductFormProps {
    // submitHandler: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>,
    handleSubmit: UseFormHandleSubmit<ProductFormInputs>,
    onSubmit: (data: ProductFormInputs) => Promise<void>,
    register: UseFormRegister<ProductFormInputs>,
    errors: {
        title?: FieldError | undefined,
        description?: FieldError | undefined,
        price?: FieldError | undefined,
        discount_price?: FieldError | undefined,
        sale?: FieldError | undefined,
        shipping?: FieldError | undefined,
        quantity?: FieldError | undefined,
        brand?: FieldError | undefined,
        color?: FieldError | undefined,
        size?: FieldError | undefined,
    },
    values: {
        brands: VariantType[]
        colors: VariantType[]
        sizes: VariantType[]
    }
        
}

const ProductForm = ({handleSubmit, onSubmit, register, errors, values} : ProductFormProps) => {
    const router = useRouter();
    const { brands, colors, sizes } = values;

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          type="text"
          register={register}
          error={errors.title}
          label="Title"
          className="full regular"
        />

        <FormInput
          id="description"
          type="text"
          register={register}
          error={errors.description}
          label="Description"
          className="full regular"
        />

        <FormInput
          id="price"
          type="number"
          register={register}
          error={errors.price}
          label="Price"
          className="full regular"
        />

        <FormInput
          id="discount_price"
          type="number"
          register={register}
          error={errors.discount_price}
          label="Discount Price"
          className="full regular"
        />

        <FormSelectInput
          id="sale"
          register={register}
          error={errors.sale}
          label="Sale?"
          className="full regular"
          options={
            [
              {value: "No", text: "No"},
              {value: "Yes", text: "Yes"}
            ]
          }
        />

        <FormSelectInput
          id="shipping"
          register={register}
          error={errors.shipping}
          label="Shipping?"
          className="full regular"
          options={
            [
              {value: "No", text: "No"},
              {value: "Yes", text: "Yes"}
            ]
          }
        />

        <FormInput
          id="quantity"
          type="number"
          register={register}
          error={errors.quantity}
          label="Quantity"
          className="full regular"
        />

        <FormSelectInput
          id="brand"
          register={register}
          error={errors.brand}
          label="Brand"
          className="full regular"
          options={getValueText(brands)}
        />

        <FormSelectInput
          id="color"
          register={register}
          error={errors.color}
          label="Color"
          className="full regular"
          options={getValueText(colors)}
        />

        <FormSelectInput
          id="size"
          register={register}
          error={errors.size}
          label="Size"
          className="regular"
          options={getValueText(sizes)}
        />

        <br />
        <button className="btn btn_black regular">Submit</button>
        <button onClick={() => router.push("/admin/products")} className="btn_white cancel regular">Cancel</button>
      </form>
    )
  };

export default ProductForm