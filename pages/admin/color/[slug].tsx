import { useState, useEffect, FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { getColorApi, updateColorApi } from "../../../api/colorApi";
import styled from "styled-components";
import AdminNav from "../../../components/nav/AdminNav";
import VariantForm from "../../../components/forms/VariantForm";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";
import Loading from "../../../components/Loading";

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

const ColorUpdate = () => {
  const { user, loading, setLoading } = useApp();
  const router = useRouter();
  const slug = router.query.slug as string

  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    slug && updateColorApi(slug, name, user.token)
      .then((res) => {
        // dispatch(editColor({ id: res.data._id, name: res.data.name }));
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        // history.push("/admin/color");
        router.push("/admin/color/color-create");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const loadColor = useCallback(
    () => {
      slug && getColorApi(slug).then((c) => {
        setName(c.data.color.name);
      })
    },
    [slug],
  )
  
  useEffect(() => {
    loadColor();
  }, [loadColor]);

  return (
    <>
      {loading && <Loading />}
      <RootDiv>
        <div className="left">
          <AdminNav />
        </div>
        <div className="right">
          <div className="wrapper">
            <h1 className="page_header">Color Update</h1>
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

export default ColorUpdate;
