import React from "react";

function ViewTicketAddComment() {
  return(
    <section className="view-ticket-add-comment">
      <h2 style={{marginBottom: "1em"}}>Add Comment</h2>
      <form>
        <div className="form-group">
          <textarea 
            id="add-comment" 
            className="form-control"
            name="add-comment"
            rows="7"
            draggable="false"
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
  )
}

function ViewTicketComment(props) {
  const { author, comment, added_at } = props.comment
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
      <div className="comment-list-title d-flex align-items-center">
        <h2 style={{margin:"1em 0"}}>
          {props.comments.length} Comments
        </h2>
      </div>
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
    <section className="row">
      <div className="col-12 col-lg-9 no-padding">
        <ViewTicketCommentsList comments={comments} />
        <ViewTicketAddComment />
      </div>
    </section>
  );
}

export default ViewTicketComments;
