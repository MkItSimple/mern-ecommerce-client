import { useState, useEffect, FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { getColorApi, updateColorApi } from "../../../api/colorApi";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/Loading"
import VariantForm from "../../../components/forms/VariantForm";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";
import Header from "../../../components/Header";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";

const ColorUpdate = () => {
  const { user, loading, setLoading } = useApp();
  const router = useRouter();
  const slug = router.query.slug as string
  const [name, setName] = useState("");
  const loadColor = useCallback(
    () => {
      slug && getColorApi(slug).then((c: any) => {
        setName(c.data.color.name);
      })
    },
    [slug],
  )
  
  useEffect(() => {
    loadColor();
  }, [loadColor]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    slug && updateColorApi(slug, name, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        router.push("/admin/color/color-create");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
            <h1 className="page_header">Color Update</h1>
            <VariantForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />
          </div>
        </div>
      </div>
    </DashboardStyles>
  );
};

export default ColorUpdate;

{/* 
<h1 className="page_header">Color Update</h1>
<VariantForm
  handleSubmit={handleSubmit}
  name={name}
  setName={setName}
/>      
*/}
