import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import {
  getCouponsApi,
  removeCouponApi,
  createCouponApi,
} from "../../api/couponApi";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { TableMixins } from "../../public/GlobalStyles";
import { Coupon } from "../../types";
import { useApp } from "../../states/AppContext";
import AdminNav from "../../components/nav/AdminNav";
import Loading from "../../components/Loading";
import { DashboardStyles } from "../../components/styles/DashboardStyles";
import Header from "../../components/Header";
import { DeleteOutlined } from "@ant-design/icons";

const RootDiv = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px auto;

  ${TableMixins}

  .right {
    padding: 0em 2em;
  }
  .wrapper {
    max-width: 600px;
  }
  .page_header {
    text-align: left;
  }
  input {
    margin-bottom: 1em;
  }
`;

const CreateCouponPage = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState<Date | null>(null);
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const { user, loading, setLoading } = useApp();

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCouponsApi().then((res: any) => setCoupons(res.data));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    expiry && user && createCouponApi({ name, expiry, discount }, user.token)
      .then((res: any) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName("");
        setDiscount("");
        setExpiry(null);
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err: any) => console.log("create coupon err", err));
  };

  const handleRemove = (couponId: string) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      user && removeCouponApi(couponId, user.token)
        .then((res: any) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err: any) => console.log(err));
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
        <div className="wrapper">
          <h1 className="page_header">Create New Coupons</h1>
          <form onSubmit={handleSubmit}>
            <label className="text-muted">Coupon Name</label>
            <input
              type="text"
              className="full regular"
              onChange={(e) => setName(e.target.value)}
              value={name}
              autoFocus
              required
            />
            <label className="text-muted">Discount %</label>
            <input
              type="number"
              className="full regular"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
              required
            />

            <label className="text-muted">Expiry</label>
            <DatePicker
              className="full regular"
              selected={new Date()}
              // value={expiry}
              onChange={(date: Date | null) => date && setExpiry(date)}
              required
            />

            <button className="btn_black regular">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Edit/Remove</th>
              </tr>
              {coupons.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    {/* <span onClick={() => handleRemove(c._id)}>Remove</span> */}
                    <DeleteOutlined onClick={() => handleRemove(c._id)}/>
                  </td>
                </tr>
              ))}
            <br />
          </table>
         </div>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default CreateCouponPage;
