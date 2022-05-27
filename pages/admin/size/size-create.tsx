import React, { FormEvent, useState } from "react";
import styled from "styled-components";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { createSizeApi, removeSizeApi } from "../../../api/size";
import { VariantType } from "../../../types";
import { TableMixins } from "../../../components/styles/GlobalStyles";
import axios from "axios";
import { GetServerSideProps } from "next";
import VariantForm from "../../../components/forms/VariantForm";
import Link from "next/link";
import IconUpdate from "../../../components/svg/IconUpdate";
import IconDelete from "../../../components/svg/IconDelete";
import LocalSearch from "../../../components/forms/LocalSearch";
import Loading from "../../../components/Loading";
import { useApp } from "../../../states/AppContext";

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
const SizeCreate = ({renderedSizes}: {renderedSizes: VariantType[]}) => {
  const { user, loading, setLoading } = useApp();
  const [sizes, setSizes] = useState(renderedSizes)

  const [name, setName] = useState("");
  // step 1
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    createSizeApi(name, user.token)
      .then((res: any) => {
        setSizes([...sizes, res.data]);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err: any) => {
        // console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug: string) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSizeApi(slug, user.token)
        .then((res) => {
          setSizes(sizes.filter((size) => size._id !== res.data._id));
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
          <h1 className="page_header">Create Size</h1>
          <VariantForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            <table>
            <tr>
              <th>Size</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {sizes.filter(searched(keyword)).map((i) => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td className="action">
                  <Link href={`/admin/size/${i.slug}`}>
                    <IconUpdate />
                  </Link>
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

  const sizesRes = await axios.get(`${process.env.apiUrl}/sizes`);
  return {
    props: {
      renderedSizes: sizesRes.data,
    },
  };
}
export default SizeCreate;
