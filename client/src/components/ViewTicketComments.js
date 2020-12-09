import React from "react";

function ViewTicketComment() {
  return (
    <article className="view-ticket-comment">
      <div className="comment-head">
        <span>{/* Comment head goes here */}</span>
      </div>
      <div className="comment-body">
        <p>{/* Comment body goes here */}</p>
      </div>
    </article>
  );
}

function ViewTicketCommentsList() {
  return (
    <section className="view-ticket-comment-list">
      <h4>Comments</h4>
      <div className="comment-list-container">{/* Comments go here */}</div>
    </section>
  );
}

function ViewTicketComments() {
  return (
    <section>
      <ViewTicketCommentsList />
    </section>
  );
}

export default ViewTicketComments;
