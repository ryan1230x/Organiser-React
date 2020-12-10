import React, { useState } from "react";

function ViewTicketCloseComment() {
  const [comment, setComment] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    alert(comment);
  };

  return (
    <section className="view-ticket-close-comment">
      <h2>Closing Comment</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlfor="close-comment">Add Comment</label>
          <textarea
            onChange={(e) => setComment(e.target.value)}
            id="close-comment"
            className="form-control"
            name="close-comment"
            row="5"
            col="5"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary" value="Close Ticket" />
      </form>
    </section>
  );
}

export default ViewTicketCloseComment;
