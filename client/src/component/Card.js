import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Addnote } from "../component/Addnote";

export const Card = ({ id, title, desc , date}) => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const data={"id":id,"title":title,"desc":desc}
  

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:9090/api/notes/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
    window.location.reload();
  };

  return (
    <>
      <div className="col-md-4 single-note-item all-category" style={{}}>
        <div className="card card-body">
          <span className="side-stick" />
          <h5
            className="note-title text-truncate w-75 mb-0"
            data-noteheading="Book a Ticket for Movie"
          >
            {title}
            {/* <i className="point fa fa-circle ml-1 font-10" /> */}
          </h5>
          <p className="note-date font-12 text-muted">{date}</p>
          <div className="note-content">
            <p
              className="note-inner-content text-muted"
              data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
            >
              {desc}
            </p>
          </div>
          <div className="d-flex align-items-center">
            <span className="m-1">
              <i className="fa fa-star favourite-note" />
            </span>
            <span className="m-1" onClick={handleDelete}>
              <i className="fa fa-trash remove-note" />
            </span>
            <span className="m-2" onClick={handleShow}>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
          </div>
        </div>
      </div>

      {show && <Addnote handleClose={handleClose} show={show} data={data} edit={true} />}
    </>
  );
};
