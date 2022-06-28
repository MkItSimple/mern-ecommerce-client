import { useState, useEffect, FormEvent, useCallback } from "react";
import { toast } from "react-toastify";
import { getSizeApi, updateSizeApi } from "../../../api/sizeApi";
import AdminNav from "../../../components/nav/AdminNav";
import Loading from "../../../components/Loading"
import VariantForm from "../../../components/forms/VariantForm";
import { useRouter } from "next/router";
import { useApp } from "../../../states/AppContext";
import Header from "../../../components/Header";
import { DashboardStyles } from "../../../components/styles/DashboardStyles";

const SizeUpdate = () => {
  const { user, loading, setLoading } = useApp();
  const router = useRouter();
  const slug = router.query.slug as string
  const [name, setName] = useState("");
  // const loadSize = useCallback(
  //   () => {
  //     slug && getSizeApi(slug).then((c: any) => {
  //       setName(c.data.size.name);
  //     })
  //   },
  //   [slug],
  // )

  const loadSize = useCallback(
    async () => {
      const res = await getSizeApi(slug)
      setName(res.data.size.name)
    },
    [slug],
  )
  
  useEffect(() => {
    loadSize();
  }, [loadSize]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setLoading(true);
    // updateSizeApi(slug, name, user.token)
    //   .then((res) => {
    //     setName("");
    //     toast.success(`"${res.data.name}" is updated`);
    //     router.push("/admin/size/size-create");
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     if (err.response.status === 400) toast.error(err.response.data);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });

    try {
      setLoading(true);
      const res = await updateSizeApi(slug, name, user.token)
      setName("")
      toast.success(`"${res.data.name}" is updated`)
      router.push("/admin/size/size-create");
    } catch (error: any) {
      if (error.response.status === 400) toast.error(error.response.data);
    } finally {
      setLoading(false);
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
            <h1 className="page_header">Size Update</h1>
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

export default SizeUpdate;
