import React, { FormEvent, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { createColorApi, removeColorApi } from "../../../api/colorApi";
import { VariantType } from "../../../types";
import axios from "axios";
import { GetServerSideProps } from "next";
import VariantForm from "../../../components/forms/VariantForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useApp } from "../../../states/AppContext";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";
import Header from "../../../components/Header";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const ColorCreate = ({renderedColors}: {renderedColors: VariantType[]}) => {
  const router = useRouter();
  const { user, loading, setLoading } = useApp();
  const [colors, setColors] = useState(renderedColors)
  const [name, setName] = useState("");
  
  // step 1
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    createColorApi(name, user.token)
      .then((res: any) => {
        setColors([...colors, res.data]);
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
      removeColorApi(slug, user.token)
        .then((res) => {
          // dispatch(removeColor(res.data._id));
          setColors(colors.filter((color) => color._id !== res.data._id));
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
            <h1 className="page_header">Add New Color</h1>
            <VariantForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
            <LocalSearch keyword={keyword} setKeyword={setKeyword} />
              <table>
              <tr>
                <th>Color</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {colors.filter(searched(keyword)).map((i) => (
                <tr key={i._id}>
                  <td>{i.name}</td>
                  <td className="action">
                    <EditOutlined onClick={() => router.push(`/admin/color/${i.slug}`)}/>
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
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  const colorsRes = await axios.get(`${process.env.apiUrl}/colors`);

  return {
    props: {
      renderedColors: colorsRes.data,
    },
  };
}

export default ColorCreate;
