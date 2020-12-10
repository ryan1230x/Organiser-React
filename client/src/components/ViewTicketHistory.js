import React from "react";

function ViewTicketHistoryItem(props) {
  // destructure here
  const {} = props.history;
  return (
    <article className="view-ticket-history-item">
      <div className="history-item-time"></div>
      <div className="history-item-activity"></div>
    </article>
  );
}

function ViewTicketHistoryList(props) {
  return (
    <section className="view-ticket-history-list">
      <h2>Ticket Histroy</h2>
      <div className="view-ticket-history-container">
        {/* History items go here */}
        {/* props.historys.map((history, index) => (
          <ViewTicketHistroyItem key={index} histroy={history} />
        )) */}
      </div>
    </section>
  );
}

function ViewTicketHistory(props) {
  const { histroys } = props;
  return (
    <section>
      <ViewTicketHistoryList historys={histroys} />
    </section>
  );
}

export default ViewTicketHistory;
