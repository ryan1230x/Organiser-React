import React, { useEffect, useState } from "react";

import TicketTable from "../components/TicketTable";

function Home() {
  const [tickets, setTicket] = useState([]);

  useEffect(() => {
    fetch("http://localhost/2020-organiser/api/ticket/")
      .then((res) => res.json())
      .then((data) => setTicket(data.data));
  }, []);
  return (
    <main className="container">
      <TicketTable tickets={tickets} />
    </main>
  );
}

export default Home;
