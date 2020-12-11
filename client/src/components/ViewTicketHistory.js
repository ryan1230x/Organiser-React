import React from "react";

function ViewTicketHistoryItem(props) {
  const { author, addedAt, action } = props.history;
  return (
    <article className="view-ticket-history-item d-flex align-item-center justify-content-between">
      <div className="history-item-time">
        <ion-icon name="time"></ion-icon>
        <p>{addedAt}</p>
      </div>
      <div className="history-item-activity">
        <p>
          {action} by {author}
        </p>
      </div>
    </article>
  );
}

function ViewTicketHistoryList(props) {
  return (
    <section className="view-ticket-history-list">
      <h2>Ticket Histroy</h2>
      <div className="view-ticket-history-container">
        {/* History items go here */}
        {props.historys.map((history, index) => (
          <ViewTicketHistoryItem key={index} histroy={history} />
        ))}
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
