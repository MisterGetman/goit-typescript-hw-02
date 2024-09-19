import { FC, Dispatch, SetStateAction } from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  setPage: Dispatch<SetStateAction<number>>;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ setPage }) => {
  return (
    <div className={css.btnContainer}>
      <button
        className={css.loadMoreBtn}
        type="button"
        onClick={() => setPage((current: number) => current + 1)}
      >
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
