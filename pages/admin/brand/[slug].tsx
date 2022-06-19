import { useState, useEffect, FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { getBrandApi, updateBrandApi } from "../../../api/brandApi";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/Loading"
import VariantForm from "../../../components/forms/VariantForm";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";
import Header from "../../../components/Header";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";

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
    <DashboardStyles>
      {loading && <Loading />}
      <Header />
      <div className="content_wrapper">
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
      </div>
    </DashboardStyles>
  );
};

export default BrandUpdate;

{/* 
<h1 className="page_header">Brand Update</h1>
<VariantForm
  handleSubmit={handleSubmit}
  name={name}
  setName={setName}
/>      
*/}
