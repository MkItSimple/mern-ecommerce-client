
export const ItemTypes = {
  BOX: "box",
  FOOD: "food",
  GLASS: "glass",
  PAPER: "paper",
  CARD: "card",
};


export interface CheckoutItemType {
brand: string,
color: string,
image: string,
price: number,
discount_price: number,
sale: string,
quantity: number,
size: string,
title: string,
_id: string
}

export interface AddressType {
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
}

type Variant = { _id: string, name: string, slug: string}
export interface CartItemType {
  _id:string,
  title:string,
  description:string,
  brand: Variant
  color: Variant,
  size: Variant,
  images_thumb: [
    {
      public_id: string,
      url: string
    }
  ]
  price:number
  discount_price: number,
sale: string,
  quantity:number,
  shipping: string
}

// // Type Cart
// export interface Cart {
//     products: [
//       {
//         product: Product[],
//         count: number,
//         color: string,
//         price: number,
//       },
//     ],
//     cartTotal: number,
//     totalAfterDiscount: number,
// }

// Type User
export interface User {
    name: string,
    email: string,
    token: string,
    role: string,
    _id: string,
    address: AddressType
}


export interface CheckoutCart {
    _id : string,
    products : [ 
        {
            _id: string,
            title: string,
            brand: string,
            color: string,
            size: string,
            image: string,
            quantity: number,
            price: number
        }
    ],
    cartTotal : number,
    orderdBy : User,
    totalAfterDiscount : number
}


// Type Coupon
export interface Coupon { _id: string, name: string; expiry: string; discount: number; }

// Type Brand
export interface VariantType {
    _id: string,
    name: string,
    slug: string
}

// // Type Color
// export interface Color {
//     _id: string,
//     name: string,
//     slug: string
// }

// // Type Size
// export interface Size {
//     _id: string,
//     name: string,
//     slug: string
// }

export interface Rating {
    _id: string,
    star: number,
    postedBy: User
}

export interface ProductType {
    _id: string,
    title: string,
    slug: string,
    description: string,
    price: number,
    discount_price: number,
    sale: string,
    quantity: number,
    sold: number,
    images: Image[],
    // images_card: Image[],
    // images_thumb: Image[],
    shipping: string
    brand: VariantType,
    color: VariantType,
    size: VariantType,
    ratings: Rating[]
}

// Type Product
export interface Product {
    _id: string,
    title: string,
    slug: string,
    description: string,
    price: number,
    discount_price: number,
    sale: string,
    quantity: number,
    sold: number,
    images: Image[],
    // images_card: Image[],
    // images_thumb: Image[],
    shipping: string
    brand: VariantType,
    color: VariantType,
    size: VariantType,
    ratings: Rating[]
}

export interface UpdatedProduct {
    title?: string,
    description?: string,
    price?: number,
    discount_price?: number,
    sale?: string,
    quantity?: number,
    sold?: number,
    images?: Image[],
    images_card?: Image[],
    images_thumb?: Image[],
    shipping?: string
    brand?: string,
    color?: string,
    size?: string
}

export interface NewProduct {
    title: string,
    description: string,
    price: number,
    discount_price: number,
    sale: string,
    shipping: string
    quantity: number,
    brand: string,
    color: string,
    size: string,
    images?: Image[],
    // images_card?: Image[],
    // images_thumb?: Image[],
    // ratings: []
}

// Type Product
export interface Image {
    public_id: string,
    url: string,
    hover_index: number
}

export interface ImageType {
    public_id: string,
    url: string,
    hover_index: number
}

export enum ModalType {
    MODAL_SEARCH = "MODAL_SEARCH",
    MODAL_CONFIRMATION = "MODAL_CONFIRMATION",
}

export interface CartItemType {
    _id: string, 
    title: string, 
    description: string, 
    brand: VariantType, 
    color: VariantType, 
    size: VariantType, 
    images: ImageType[], 
    price: number, 
    discount_price: number,
    shipping: string
}

export interface OrderType {
    products: [
      {
        _id:string,
        title:string,
        brand:string,
        color:string,
        size:number,
        image:string,
        quantity:number,
        price:number,
        shipping: string
        },
    ],
    paymentIntent: {},
    orderStatus: string,
    orderdBy: string,
  }

export interface ProductFormInputs {
  title: string,
  description: string,
  price: number,
  discount_price: number,
  sale: string,
  shipping: string,
  quantity: number,
  brand: string,
  color: string,
  size: string,

}

export enum Sort {
    SORT = "Sort",
    BEST_SELLING = "Best selling",
    A_TO_Z = "Alphabetically, A-Z",
    Z_TO_A = "Alphabetically, Z-A",
    PRICE_LOW_TO_HIGH = "Price, low to high",
    PRICE_HIGH_TO_LOW = "Price, high to low"
}

// "Best selling", "Alphabetically, A-Z", "Alphabetically, Z-A", "Price, low to high", "Price, high to low"

/*
[title, description, price, discount_price, sale, shipping, quantity, brand, color, size, images, ratings]
*/