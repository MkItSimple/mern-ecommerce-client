import React, { FormEvent, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { createBrandApi, removeBrandApi } from "../../../api/brandApi";
import { VariantType } from "../../../types";
import axios from "axios";
import { GetServerSideProps } from "next";
import VariantForm from "../../../components/forms/VariantForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";
import Loading from "../../../components/Loading";
import Header from "../../../components/Header";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


const BrandCreate = ({renderedBrands}: {renderedBrands: VariantType[]}) => {
  const router = useRouter();
  const { user, openCartDrawer } = useApp();
  const [brands, setBrands] = useState(renderedBrands)

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  // step 1
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    createBrandApi(name, user.token)
      .then((res: any) => {
        setBrands([...brands, res.data]);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug: string) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeBrandApi(slug, user.token)
        .then((res) => {
          setBrands(brands.filter((brand) => brand._id !== res.data._id));
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword: string) => (item: VariantType) => item.name.toLowerCase().includes(keyword);

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
            <h1 className="page_header">Add New Brand</h1>
            <VariantForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              <table>
              <tr>
                <th>Brand</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {brands.filter(searched(keyword)).map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td className="action">
                    <EditOutlined onClick={() => router.push(`/admin/brand/${i.slug}`)}/>
                  </td>
                  <td className="action">
                    <DeleteOutlined onClick={() => handleRemove(i.slug)}/>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </DashboardStyles>
    // <DashboardStyles>
    //   <div className="left">
    //     <AdminNav />
    //   </div>
    //   <div className="right">
    //     <div className="wrapper">
    //       <h1 className="page_header">Add New Brand</h1>
    //       <VariantForm
    //         handleSubmit={handleSubmit}
    //         name={name}
    //         setName={setName}
    //       />
    //       <LocalSearch keyword={keyword} setKeyword={setKeyword} />
    //         <table>
    //         <tr>
    //           <th>Brand</th>
    //           <th>Edit</th>
    //           <th>Delete</th>
    //         </tr>
    //         {brands.filter(searched(keyword)).map((i) => (
    //           <tr key={i._id}>
    //             <td>{i.name}</td>
    //             <td className="action">
    //               <IconUpdate onClickFunction={() => router.push(`/admin/brand/${i.slug}`)}/>
    //             </td>
    //             <td className="action">
    //               <IconDelete onClickFunction={() => handleRemove(i.slug)}/>
    //             </td>
    //           </tr>
    //         ))}
    //       </table>
    //     </div>
    //   </div>
    // </DashboardStyles>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  const brandsRes = await axios.get(`${process.env.apiUrl}/brands`);

  return {
    props: {
      renderedBrands: brandsRes.data,
    },
  };
}

export default BrandCreate;
