import React from 'react'
import { ImageType, ProductType } from '../../types';
import { Card } from '../cards/Card';
import { FileUploadStyles } from './FileUploadStyles';

interface FileUploadProps {
    product?: ProductType
    existingImages?: ImageType[];
    previewSource: string[];
    handleRemoveExisting?: (public_id: string) => void;
    handleRemove: (preview: string) => void;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
    findCard?: (id: string) => {
        card: ImageType;
        index: number;
    };
    handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
    resetImagesHandler: (product: ProductType) => void;
}

const FileUpload = ({
    product, existingImages, previewSource, 
    handleRemoveExisting, handleRemove, moveCard, findCard, handleFileInputChange, resetImagesHandler
}:FileUploadProps) => {
    return (
      <FileUploadStyles>
      <div className="badges_container">
        {existingImages &&
          existingImages.map((image, index) => (

            <Card
              key={image.public_id}
              index={index}
              id={image.public_id}
              url={image.url}
              moveCard={moveCard}
              remove={() => handleRemoveExisting && handleRemoveExisting(existingImages[index].public_id)}
              findCard={findCard}
              />
          ))}

          {previewSource &&
          previewSource.map((ps, index) => (

            <Card
              key={index}
              index={index}
              id={index}
              url={previewSource[index]}
              moveCard={moveCard}
              remove={() => handleRemove(previewSource[index])}
              findCard={findCard}
              />
          ))}
      </div>
      <div>
        <label className="regular upload_btn">
          Upload more images
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={handleFileInputChange}
          />
        </label>
        <div className="regular reset_images_btn" onClick={() => product && resetImagesHandler(product)}>reset images</div>
      </div>
      </FileUploadStyles>
    )
  };

export default FileUpload