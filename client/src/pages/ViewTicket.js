import React, { useEffect } from "react";
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
  putTicketStatusToClosed
} from "../actions/ticketActions";
import { getHistory, addHistory } from "../actions/historyActions";

function TicketView({
  addComment,
  getComments,
  comments,
  loadingComments,
  getTicketInformation,
  ticketInformation,
  putTicketStatusToClosed,
  getHistory,
  addHistory,
  histories,
  loadingHistories
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
      {loadingComments && loadingHistories ? (
        "Loading..."
      ) : (
        <>
          <ViewTicketInformation ticketInformation={ticketInformation} />
          <ViewTicketComments
            comments={comments}
            ticketId={id}
            handleAddComment={addComment}
            handleAddHistory={addHistory}
          />
          <ViewTicketCloseComment
            handleAddComment={addComment}
            handleputTicketStatusToClosed={putTicketStatusToClosed}
            ticketId={id}
          />
          <ViewTicketHistory histories={histories} />
        </>
      )}
    </main>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  loadingComments: state.comments.loading,
  ticketInformation: state.tickets.ticketInformation,
  histories: state.histories.histories,
  loadingHistories: state.histories.loading
});

export default connect(mapStateToProps, {
  getComments,
  addComment,
  getTicketInformation,
  putTicketStatusToClosed,
  getHistory,
  addHistory
})(TicketView);
