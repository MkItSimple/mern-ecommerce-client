import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ShippingFormStyles } from "./ShippingFormStyles";
import { useState } from "react";
import { saveUserAddress } from "../../api/userApi";
import { toast } from "react-toastify";
import { User } from "../../types";
import { useRouter } from "next/router";
import { useApp } from "../../states/AppContext";

const schema = yup.object({
  firstName: yup.string().required("First Name"),
  lastName: yup.string().required("First Name"),
  street: yup.string().required("Street"),
  city: yup.string().required("City"),
  postalCode: yup.string().required("Postal Code/ Zip Code"),
  country: yup.string().required("County"),
}).required();

export interface IFormInputs {
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  postalCode: string,
  country: string,
}
const ShippingForm = ({user}: {user: User}) => {
  const router = useRouter();

  const { loading, setLoading } = useApp();

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: user.address.firstName,
      lastName: user.address.lastName,
      street: user.address.street,
      city: user.address.city,
      postalCode: user.address.postalCode,
      country: user.address.country,
    }
  });
  const onSubmit = async (data: IFormInputs) => {
    // const datetime = new Date(data.datetime);
    const DataToSend = {
      firstName: data.firstName,
      lastName: data.lastName,
      street: data.street,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
    }
      setLoading(true);
      user && saveUserAddress(user.token, DataToSend).then((res) => {

      if (res.data.ok) {
         setLoading(false);
        toast.success("Address saved");
         //update user address in redux
        const updatedUserAddress = {
          ...user,
          address: DataToSend
        }
      }
    });
  };

  return (
    <ShippingFormStyles>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col1">
        <div className="form_group">
          <label htmlFor="country">Country / Region</label>
          <input type="text" className="regular" {...register("country")} />
          {errors.country && <span role="alert" className="error">{errors.country.message}</span>}
        </div>
      </div>

      <div className="col2">
        <div className="form_group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className="regular" {...register("firstName")} />
          {errors.firstName && <span role="alert" className="error">{errors.firstName.message}</span>}
        </div>

        <div className="form_group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className="regular" {...register("lastName")} />
          {errors.lastName && <span role="alert" className="error">{errors.lastName.message}</span>}
        </div>
      </div>

      <div className="col1">
        <div className="form_group">
          <label htmlFor="street">Unit or Home No. and Street name</label>
          <input type="text" className="regular" {...register("street")} />
          {errors.street && <span role="alert" className="error">{errors.street.message}</span>}
        </div>
      </div>

      <div className="col2">
        <div className="form_group">
          <label htmlFor="postalCode">Postal code</label>
          <input type="text" className="regular" {...register("postalCode")} />
          {errors.postalCode && <span role="alert" className="error">{errors.postalCode.message}</span>}
        </div>

        <div className="form_group">
          <label htmlFor="city">City</label>
          <input type="text" className="regular" {...register("city")} />
          {errors.city && <span role="alert" className="error">{errors.city.message}</span>}
        </div>
      </div>
      <input
            className="submit btn_white regular save_address"
            type="submit"
            value={loading ? "Saving..." : "Save Address"}
            data-testid="submit"
          />
      </form>
      
      <button className="btn_black big" onClick={() => router.replace("/products")}>Continue to shopping</button>
      <button className="btn_no_border big" onClick={() => router.replace("/cart")}>Return to cart</button>
    </ShippingFormStyles>
  );
};

export default ShippingForm;
