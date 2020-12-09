import React from "react";
import { useParams } from "react-router-dom";

// import components
import Heading from "../components/Heading";
import ViewTicketInformation from "../components/ViewTicketInformation";
import ViewTicketComments from "../components/ViewTicketComments";
import ViewTicketCloseComment from "../components/ViewTicketCloseComment";

function TicketView() {
  /**
   * Get the ticket id from the URL
   **/
  const { id } = useParams();

  return (
    <main>
      <Heading title="John Doe" subtitle="Calle Alemania" />
      <ViewTicketInformation />
      <ViewTicketComments />
      <ViewTicketCloseComment />
    </main>
  );
}

export default TicketView;
