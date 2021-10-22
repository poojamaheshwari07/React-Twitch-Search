import "bootstrap-icons/font/bootstrap-icons.css";
const Pagination = (props) => {
  return (
    <>
      <div className="row">
        <div className="col-md-11"></div>
        <div className="col-md-1">
          {props.prevPageExist && (
            <i
              onClick={props.onBackClick}
              role="button"
              className="bi bi-arrow-left"
            ></i>
          )}
          &nbsp;
          {props.nextPageExist && (
            <i
              onClick={props.onForwardClick}
              role="button"
              className="bi bi-arrow-right"
            ></i>
          )}
        </div>
      </div>
    </>
  );
};
export default Pagination;
