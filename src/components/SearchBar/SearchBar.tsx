import { ChangeEvent, FormEvent, FC, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: ChangeEvent & { target: HTMLInputElement }) => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      onSubmit(value);
    } else {
      toast.error("Can not be blank!");
    }
  };

  return (
    <header>
      <div>
        <Toaster />
      </div>
      <form className={css.header} onSubmit={handleSubmit}>
        <input
          className={css.headerInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
