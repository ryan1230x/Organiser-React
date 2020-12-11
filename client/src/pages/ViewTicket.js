import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import components
import ViewTicketInformation from "../components/ViewTicketInformation";
import ViewTicketComments from "../components/ViewTicketComments";
import ViewTicketCloseComment from "../components/ViewTicketCloseComment";
import ViewTicketHistory from "../components/ViewTicketHistory";

function TicketView() {
  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  // GET comments
  const [comments, setComment] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/comment/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setComment(data.data));
  }, []);

  // GET history
  const [historys, setHistory] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/history/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setHistory(data.data));
  }, []);

  // GET ticket information
  const [ticketInformation, setTicketInformation] = useState({});
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/ticket/?ticket_id=${id}`)
      .then((res) => res.json())
      .then((data) => setTicketInformation(data.data));
  }, []);

  return (
    <main className="container">
      <ViewTicketInformation ticketInformation={ticketInformation} />
      <ViewTicketComments comments={comments} />
      <ViewTicketCloseComment historys={historys} />
      {/*<ViewTicketHistory /> */}
    </main>
  );
}

export default TicketView;
