import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types";

interface ImageGalleryProps {
  images: Image[];
  openModal: (url: string, description: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images = [], openModal }) => {
  return (
    <ul className={css.list}>
      {images.map((image) => (
        <ImageCard key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
