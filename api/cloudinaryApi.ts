import axios from "axios";
// axios.defaults.withCredentials = true;
// export const uploadImageApi = async (updatedImage: string) =>
//   await axios.post(`${process.env.apiUrl}/uploadimages`, {
//     image: updatedImage,
//   });

type Blubs = (string | Blob | ProgressEvent<FileReader>)[];
// type UploadType = { image: string[], image_card: Blubs, image_thumb: Blubs}
type UploadType = { image: string[] }
export const uploadImageApi = async (updatedImage: UploadType) =>
  await axios.post(`${process.env.apiUrl}/uploadimages`, updatedImage);

// type LetterUploadType = { image_card:  Blubs, image_thumb: Blubs}
// export const uploadLetterImageApi = async (updatedImage: LetterUploadType) =>
//   await axios.post(`${process.env.apiUrl}/uploadletterimages`, updatedImage);

// export const removeImageApi = async (public_ids: string) =>
//   await axios.post(`${process.env.apiUrl}/removeimage`, {
//     public_ids: public_ids,
//   });

// export const removeImageApi = async (public_ids: string[], card_public_ids: string[], thumb_public_ids: string[]) =>
export const removeImageApi = async (public_ids: string[]) =>
  await axios.post(`${process.env.apiUrl}/removeimage`, {
    public_ids,
    // card_public_ids,
    // thumb_public_ids,
  });

// export const removeImagesApi = async (public_ids: string[], card_public_ids: string[], thumb_public_ids: string[]) =>
export const removeImagesApi = async (public_ids: string[]) =>
  await axios.post(`${process.env.apiUrl}/removeimages`, {
    public_ids,
    // card_public_ids,
    // thumb_public_ids,
  });
