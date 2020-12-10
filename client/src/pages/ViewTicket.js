import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import components
import Heading from "../components/Heading";
import ViewTicketInformation from "../components/ViewTicketInformation";
import ViewTicketComments from "../components/ViewTicketComments";
import ViewTicketCloseComment from "../components/ViewTicketCloseComment";
import ViewTicketHistory from "../components/ViewTicketHistory";

function TicketView() {
  // Get the ticket id from the URL 
  // URL-> /ticket/:id
  const { id } = useParams();

  // GET all comments
  const [comments, setComment] = useState([]);
  useEffect(() => {
    fetch(`http://localhost/2020-organiser/api/comment/?ticket_id=${id}`)
      .then(res => res.json())
      .then(data => setComment(data.data));
  }, []);

  return (
    <main className="container">
      <Heading title="John Doe" subtitle="Calle Alemania" />
      <ViewTicketInformation />
      <ViewTicketComments comments={comments} />
      {/*<ViewTicketCloseComment />
      <ViewTicketHistory /> */}
    </main>
  );
}

export default TicketView;
