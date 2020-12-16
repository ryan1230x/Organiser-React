import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import components
import ViewTicketInformation from "../components/ViewTicketInformation";
import ViewTicketComments from "../components/ViewTicketComments";
import ViewTicketCloseComment from "../components/ViewTicketCloseComment";
import ViewTicketHistory from "../components/ViewTicketHistory";

// import react and action functions
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import {
  getTicketInformation,
  putTicketStatusToClose
} from "../actions/ticketActions";

function TicketView({
  addComment,
  getComments,
  comments,
  loadingComments,
  getTicketInformation,
  ticketInformation,
  putTicketStatusToClose
}) {
  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  // GET comments
  useEffect(() => {
    getComments(id);
    getTicketInformation(id);
  }, [getComments, getTicketInformation, id]);

  // GET history
  const [historys, setHistory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/history/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data));
  }, [id]);

  return (
    <main className="container">
      <ViewTicketInformation ticketInformation={ticketInformation} />
      {loadingComments === null ? (
        "Loading..."
      ) : (
        <ViewTicketComments
          comments={comments}
          ticketId={id}
          handleAddComment={addComment}
        />
      )}
      <ViewTicketCloseComment
        handleAddComment={addComment}
        handleputTicketStatusToClose={putTicketStatusToClose}
        ticketId={id}
      />
      <ViewTicketHistory historys={historys} />
    </main>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loadingComments: state.comments.loading,
  ticketInformation: state.tickets.ticketInformation
});

export default connect(mapStateToProps, {
  getComments,
  addComment,
  getTicketInformation,
  putTicketStatusToClose
})(TicketView);
