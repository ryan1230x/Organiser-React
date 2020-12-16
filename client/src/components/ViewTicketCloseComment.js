import React, { useState } from "react";

function ViewTicketCloseComment({
  handleAddComment,
  handleputTicketStatusToClose,
  ticketId
}) {
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const newCommentObject = {
      author: "Ryan",
      comment,
      ticketId,
      addedAt: new Date().toDateString()
    };
    const newStatus = {
      status: "closed"
    };
    handleAddComment(JSON.stringify(newCommentObject), ticketId);
    handleputTicketStatusToClose(JSON.stringify(newStatus), ticketId);
    setComment("");
    window.location.pathname = "/";
  };

  return (
    <section className="view-ticket-close-comment row">
      <div className="col-12 col-lg-9 no-padding">
        <h2 style={{ marginBottom: "1em" }}>Closing Comment</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              id="close-comment"
              className="form-control"
              name="close-comment"
              rows="7"
              draggable="false"
            ></textarea>
          </div>
          <div className="d-flex">
            <input
              type="submit"
              className="btn btn-success ml-auto"
              value="Close Ticket"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ViewTicketCloseComment;
