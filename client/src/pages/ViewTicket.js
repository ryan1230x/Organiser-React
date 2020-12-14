import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import components
import ViewTicketInformation from "../components/ViewTicketInformation";
import ViewTicketComments from "../components/ViewTicketComments";
import ViewTicketCloseComment from "../components/ViewTicketCloseComment";
import ViewTicketHistory from "../components/ViewTicketHistory";

// import react and action functions
import {connect} from "react-redux"
import {getComments, addComment} from "../actions/commentActions";

function TicketView({addComment, getComments, comments, loading}) {
  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  // GET comments
  useEffect(() => {
    getComments(id)
  }, [getComments]);

  // GET history
  const [historys, setHistory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/history/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data));
  }, [id]);

  // GET ticket information
  const [ticketInformation, setTicketInformation] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/ticket/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setTicketInformation(data.data));
  }, [id]);

  return (
    <main className="container">
      <ViewTicketInformation ticketInformation={ticketInformation} />
      {loading === null ? "Loading..." : (<ViewTicketComments comments={comments} ticketId={id} handleAddComment={addComment} />)}
      <ViewTicketCloseComment />
      <ViewTicketHistory historys={historys} />
    </main>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loading: state.comments.loading
});

export default connect(mapStateToProps, {getComments, addComment})(TicketView);
