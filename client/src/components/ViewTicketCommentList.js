import React from "react";

// Import components
import ViewTicketCommentItem from "./ViewTicketCommentItem";


function ViewTicketCommentsList({comments}) {  
    return (
      <section className="view-ticket-comment-list">
        <div className="comment-list-title d-flex align-items-center">
          {
            comments.length === 0 ? "" :  
            (<h2 style={{margin:"1em 0"}}>
              Comments
            </h2>)
          }
        </div>
        <div className="comment-list-container">
          {
            comments === undefined ? "" : 
              comments.map((comment, index) => (
                <ViewTicketCommentItem key={index} comment={comment} />
              ))
          }     
        </div>
      </section>
    );
};

export default ViewTicketCommentsList;