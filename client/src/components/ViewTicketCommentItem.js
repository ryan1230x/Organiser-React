import React from "react";

function ViewTicketCommentItem({comment}) {
    return (
      <article className="view-ticket-comment">
        <div className="comment-head">
          <span>Note added at <strong>{ comment.addedAt }</strong> by { comment.author }</span>
        </div>
        <div className="comment-body">
          <p>{ comment.comment }</p>
        </div>
      </article>
    );
}

export default ViewTicketCommentItem;