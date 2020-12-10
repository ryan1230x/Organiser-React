import React from "react";

function ViewTicketComment(props) {
  const { author, comment, added_at } = props.comment
  console.log(props.comment);
  return (
    <article className="view-ticket-comment">
      <div className="comment-head">
        <span>Note added at { added_at } by { author }</span>
      </div>
      <div className="comment-body">
        <p>{ comment }</p>
      </div>
    </article>
  );
}

function ViewTicketCommentsList(props) {
  return (
    <section className="view-ticket-comment-list">
      <h2>Comments</h2>
      <div className="comment-list-container">
        {
          props.comments.map((comment, index) => (
            <ViewTicketComment key={index} comment={comment} />
          ))
        }        
      </div>
    </section>
  );
}

function ViewTicketComments(props) {
  const { comments } = props
  return (
    <section>
      <ViewTicketCommentsList comments={comments} />
    </section>
  );
}

export default ViewTicketComments;
