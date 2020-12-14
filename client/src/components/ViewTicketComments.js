import React, {useState} from "react";

// Import components
import ViewTicketCommentsList from "./ViewTicketCommentList";


function ViewTicketComments({handleAddComment, comments, ticketId}) {
  console.log(comments);
  const [newComment, setNewComment] = useState("");
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newCommentObject = {
      author: "Ryan",
      comment: newComment,
      ticketId
    };
    handleAddComment(JSON.stringify(newCommentObject));
  }

  return (
    <section className="row">
      <div className="col-12 col-lg-9 no-padding">
        <section className="view-ticket-add-comment">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <textarea 
                id="add-comment" 
                className="form-control"
                name="add-comment"
                rows="7"
                draggable="false"
                placeholder="Type here to add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex">
              <input 
                type="submit" 
                value="Add Comment" 
                className="btn btn-primary ml-auto"
              />
            </div>
          </form>
        </section>
        <ViewTicketCommentsList comments={comments} />
      </div>
    </section>
  );
};

export default ViewTicketComments;
