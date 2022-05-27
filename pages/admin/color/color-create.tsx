import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { createColorApi, removeColorApi } from "../../../api/colorApi";
import { VariantType } from "../../../types";
import { TableMixins } from "../../../components/styles/GlobalStyles";
import axios from "axios";
import { GetServerSideProps } from "next";
import VariantForm from "../../../components/forms/VariantForm";
import IconUpdate from "../../../components/svg/IconUpdate";
import IconDelete from "../../../components/svg/IconDelete";
import LocalSearch from "../../../components/forms/LocalSearch";
import { useApp } from "../../../states/AppContext";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";

const RootDiv = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px auto;

  ${TableMixins}

  .right {
    padding: 1em 2em;
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
  button {
    min-width: 77px;
  }
  
`;
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
    <>
      {loading && <Loading />}
      <RootDiv>
      <div className="left">
        <AdminNav />
      </div>
      <div className="right">
        <div className="wrapper">
          <h1 className="page_header">Create Color</h1>
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
                  <IconUpdate onClickFunction={() => router.push(`/admin/color/${i.slug}`)}/>
                </td>
                <td className="action">
                  <IconDelete onClickFunction={() => handleRemove(i.slug)}/>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </RootDiv>
    </>
    
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
