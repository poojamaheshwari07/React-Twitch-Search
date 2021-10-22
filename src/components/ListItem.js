import React from "react";
const ListItem = (props) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col-md-auto  d-lg-block">
            <img
              className="img-thumbnail"
              src={props.thumbnail_url}
              alt={props.id}
            />
          </div>
          <div className="col ps-2 py-1 d-flex flex-column position-static">
            <h5 className="mb-0">{props.title}</h5>
            <div className="card-text">Game Name - {props.game_name}</div>
            <div className="card-text">Display Name - {props.display_name}</div>
            <div className="card-text mb-auto">{props.game_name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
