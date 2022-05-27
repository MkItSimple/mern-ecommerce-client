import { useState, useEffect, FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { getBrandApi, updateBrandApi } from "../../../api/brandApi";
import styled from "styled-components";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/Loading"
import VariantForm from "../../../components/forms/VariantForm";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";

const RootDiv = styled.div`
  max-width: 1500px;
  /* background-color: rgba(0, 0, 0, 0.1); */
  margin: 0 auto;
  /* background: #eee; */
  display: grid;
  grid-template-columns: 250px auto;

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

const BrandUpdate = () => {
  const { user, loading, setLoading } = useApp();
  const router = useRouter();
  const slug = router.query.slug as string

  const [name, setName] = useState("");

  const loadBrand = useCallback(
    () => {
      slug && getBrandApi(slug).then((c: any) => {
        setName(c.data.brand.name);
      })
    },
    [slug],
  )
  
  useEffect(() => {
    loadBrand();
  }, [loadBrand]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    slug && updateBrandApi(slug, name, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        router.push("/admin/brand/brand-create");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <>
    {loading && <Loading />}
    <RootDiv>
      <div className="left">
        <AdminNav />
      </div>
      <div className="right">
        <div className="wrapper">
          <h1 className="page_header">Brand Update</h1>
          <VariantForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </RootDiv>
    </>
  );
};

export default BrandUpdate;
