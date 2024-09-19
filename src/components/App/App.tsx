import { useState, useEffect } from "react";
import css from "./App.module.css";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import { getImages } from "../api/api";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../../types";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>("");
  const [modalAltText, setModalAltText] = useState<string>("");

  const handleSubmit = (query: string) => {
    setImagesList([]);
    setPage(1);
    setSearchQuery(query);
  };

  const openModal = (url: string, alt: string) => {
    setIsOpen(true);
    setModalUrl(url);
    setModalAltText(alt);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalUrl("");
    setModalAltText("");
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImages = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const { results, total_pages: totalPages } = await getImages(
          searchQuery,
          page
        );

        setImagesList((prevImages) => [...prevImages, ...results]);
        setIsVisible(page < totalPages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  return (
    <>
      {isLoading && <Loader />}
      <SearchBar onSubmit={handleSubmit} />
      {isError && <ErrorMessage />}
      {!searchQuery && !isLoading ? (
        <div className={css.useraMessage}>Start your search</div>
      ) : searchQuery && !imagesList.length && !isLoading ? (
        <div className={css.useraMessage}>Nothing found</div>
      ) : (
        <ImageGallery images={imagesList} openModal={openModal} />
      )}
      {isVisible && <LoadMoreBtn setPage={setPage} />}
      <ImageModal
        modalIsOpen={modalIsOpen}
        url={modalUrl}
        alt={modalAltText}
        closeModal={closeModal}
      />
    </>
  );
}

export default App;
