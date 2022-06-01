
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, isSignInWithEmailLink, sendPasswordResetEmail, sendSignInLinkToEmail, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signOut, updatePassword } from "firebase/auth";
import { createOrUpdateUserApi, currentUserApi } from "../api/authApi";
import { auth } from "../config/firebase";
import { createContext, useContext, useEffect, useState } from 'react'
import { CartItemType, Product } from "../types";
import { getCart, updateCart } from "../api/cartApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
const AppContext = createContext<any>({})

export const useApp = () => useContext(AppContext)

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [user, setUser] = useState<any>(null)
  const [openCartDrawer, setOpenCartDrawer] = useState(false)
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false)
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const [openZoom, setOpenZoom] = useState(false);
  const [zoomUrl, setZoomUrl] = useState("");
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [couponApplied, setCouponApplied] = useState<CartItemType[]>([]);
  const [coupon, setCoupon] = useState("")
  const [intended, setIntended] = useState("")

  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState("")

  // const [variants, setVariants] = useState()
  // const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const roleBasedRedirect = (res: any) => {
    // check if intended router is not empty ""
    if (intended) {
      router.push(intended);
    } else {
      if (res.data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/history");
      }
    }
  };

  const signup = async (email: string) => {
    // console.log(email);
    if (process.env.firebaseRegisterRedirectUrl) {
      const actionCodeSettings = {
        url: process.env.firebaseRegisterRedirectUrl || "",
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );

      // save user email in local storage
      window.localStorage.setItem("emailForRegistration", email);
    }
  }

  const signinWithLink = async (email: string, password: string) => {
     const auth = getAuth();
     console.log("auth here ", auth);
     if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForRegistration');
        // console.log("emailForRegistration ", email);
        const result = await signInWithEmailLink(auth, email as string, window.location.href)
        
        if (result.user.emailVerified) {
          updatePassword(result.user, password)
          const idTokenResult = await result.user.getIdTokenResult();

           createOrUpdateUserApi(idTokenResult.token)
            .then((res: any) => {
              toast("Registration successful!")
              setUser(
                {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                  address: res.data.address
                }
              )
              router.push("/login");
            })
            .catch((err: any) => console.log(err));
          // redirect
          // router.push("/");
        }
     }
  }

  const loginWithGoogle = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result: any) => {
        createOrUpdateUserApi(result.user.accessToken).catch((err) => console.log(err));
      })
      .catch((error: Error) => {});
  };

  const login = async (email: string, password: string) => {
    // return  signInWithEmailAndPassword(auth, email, password);
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createOrUpdateUserApi(idTokenResult.token)
        .then((res) => {
          setUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
              address: res.data.address
            })
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
    } catch (error: any) {
      // console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
    // await console.log("logout");
  }

  const forgotPassword = async (email: string) => {
    setLoading(true)
    await sendPasswordResetEmail(auth, email, {url: process.env.firebaseForgotPasswordRedirect as string}).then((res: any)=>{
      toast.success("Email sent, check your email.")
    }).catch((error: any)=>{})
    setLoading(false)
  };

  const addToCart = (cartItem: CartItemType) => {
    // const { key, image, bookName, by  } = cartItem;
    // console.log("addToCart ", cartItem);
    
  const itemIndex = [...cart].findIndex(item => item._id === cartItem._id);
    if (itemIndex >= 0) {
        const quantity = cart[itemIndex].quantity + 1;
      let originalCart = cart;
      originalCart[itemIndex] = {...originalCart[itemIndex], quantity}
      setCart([...originalCart])
    } else {
      setCart([...cart, cartItem])
    }
  };
  const removeCartItem = (id: string) => {
    setCart([...cart].filter(item => item._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const changeQuantity = (id: string, quantity: number) => {
      const itemIndex = cart.findIndex((item) => item._id === id);

      if (quantity !== 0) {
        let originalCart = cart;
        originalCart[itemIndex] = {...originalCart[itemIndex], quantity}
        setCart(originalCart)
      } else {
      //   console.log("not greater than 1");
      //   // cart = cart.filter((item) => item._id !== payload.id);
      //   // cart.splice(payload, 1);
      //   setCart([...cart].filter(item => item._id !== id));
      }
    }

  const incrementCartItem = (id: string) => {
    // console.log("increment called");
    const itemIndex = cart.findIndex((item) => item._id === id);
    let originalCart = cart;
    originalCart[itemIndex] = {...originalCart[itemIndex], quantity: originalCart[itemIndex].quantity + 1}
    setCart([...originalCart])
    // console.log("increment called ",originalCart[itemIndex]);
  };
  const decrementCartItem = (id: string) => {
    // console.log("increment called");
    const itemIndex = cart.findIndex((item) => item._id === id);
    let originalCart = cart;
    
    if (cart[itemIndex].quantity > 1) {
      originalCart[itemIndex] = {...originalCart[itemIndex], quantity: originalCart[itemIndex].quantity - 1}
      setCart([...originalCart])
    } else {
      removeCartItem(id)
    }
  };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUserApi(idTokenResult.token)
          .then((res) => {
            setUser({
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                address: res.data.address,
                _id: res.data._id,
              });
          })
          .catch((err) => console.log(err));
      }
    });

    getCart().then((res) => {
      res.data.cart && setCart(res.data.cart)
    });

    // cleanup
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    const tracker = setTimeout(() => {
      updateCart(cart).then((res) => {
          // console.log("server cart updated", res.data);
        });
    }, 500);

    return () => {
      clearTimeout(tracker)
    }
  }, [cart])

  useEffect(() => {
  //  console.log("filteredProducts ", filteredProducts);
   
  }, [filteredProducts])
  
  
  return (
    <AppContext.Provider value={{
      filteredProducts, setFilteredProducts,
      openCartDrawer, setOpenCartDrawer, 
      openFilterDrawer, setOpenFilterDrawer, 
      openSearchDrawer, setOpenSearchDrawer,
      openConfirmationModal, setOpenConfirmationModal,
      openZoom, setOpenZoom,
      zoomUrl, setZoomUrl,
      user,
      signup,
      signinWithLink,
      loginWithGoogle,
      login,
      logout,
      forgotPassword,
      cart,
      setCart,
      addToCart,
      removeCartItem,
      clearCart,
      changeQuantity,
      incrementCartItem,
      decrementCartItem,
      couponApplied, setCouponApplied,
      intended, setIntended,
      loading, setLoading,
      sort, setSort,
      }}>
      {children}
    </AppContext.Provider>
  )
}
