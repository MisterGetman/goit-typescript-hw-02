import { FC } from "react";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  openModal: (url: string, description: string) => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <li>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image.urls.regular, image.alt_description)}
      />
    </li>
  );
};

export default ImageCard;
