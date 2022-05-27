import React from "react";

const LocalSearch = ({ keyword, setKeyword } : { keyword: string, setKeyword: (value: string) => void}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.currentTarget.value.toLocaleLowerCase());
  };

  return (
    <>
      <input
        name="search"
        type="search"
        placeholder="Filter search ..."
        value={keyword}
        onChange={handleSearchChange}
        className="regular"
      />
    </>
  );
};

export default LocalSearch;
