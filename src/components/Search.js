import { useState } from "react";
const Search = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const searchInputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    props.onSearch(searchInput);
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="my-3">
          <div className="row">
            <form onSubmit={formSubmissionHandler}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search Channel..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  value={searchInput}
                  onChange={searchInputChangeHandler}
                  onBlur={searchInputChangeHandler}
                />
                <button type="submit" className="btn btn-outline-primary">
                  search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
