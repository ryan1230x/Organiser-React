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
import { getHistory } from "../actions/historyActions";

function TicketView({
  addComment,
  getComments,
  comments,
  loadingComments,
  getTicketInformation,
  ticketInformation,
  putTicketStatusToClose,
  getHistory,
  histories
}) {
  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  // GET comments
  useEffect(() => {
    getComments(id);
    getTicketInformation(id);
    getHistory(id);
  }, [getComments, getTicketInformation, getHistory, id]);

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
      <ViewTicketHistory histories={histories} />
    </main>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loadingComments: state.comments.loading,
  ticketInformation: state.tickets.ticketInformation,
  histories: state.histories.histories
});

export default connect(mapStateToProps, {
  getComments,
  addComment,
  getTicketInformation,
  putTicketStatusToClose,
  getHistory
})(TicketView);
