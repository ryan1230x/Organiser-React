import React from "react";

function ViewTicketHistoryItem(props) {
  const { author, addedAt, action } = props.history;
  return (
    <article className="view-ticket-history-item d-flex justify-content-between">
      <div className="history-item-time d-flex align-items-center justify-content-between">
        <ion-icon name="time"></ion-icon>
        <p style={{marginLeft: "0.5em"}}>{addedAt}</p>
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
  console.log(props)
  return (
    <section className="view-ticket-history-list">
      <div className="view-ticket-history-container">
        {/* History items go here */}
        {props.historys.map((history, index) => (
          <ViewTicketHistoryItem key={index} history={history} />
        ))}
      </div>
    </section>
  );
}

function ViewTicketHistory(props) {
  const { historys } = props;
  return (
    <section className="view-ticket-history">
      <div className="row">
        <div className="col-12 col-lg-9 no-padding">
          <ViewTicketHistoryList historys={historys} />
        </div>
      </div>
    </section>
  );
}

export default ViewTicketHistory;
