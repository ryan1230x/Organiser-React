import React, { useEffect } from "react";

// Import redux and actions from reducer
import { connect } from "react-redux";
import { getTickets } from "../actions/ticketActions";

// Import components
import TicketTable from "../components/TicketTable";

function Home({ getTickets, tickets, loadingTickets }) {
  useEffect(() => {
    getTickets();
  }, [getTickets]);

  return (
    <main className="container">
      <TicketTable tickets={tickets} isLoadingTickets={loadingTickets} />
    </main>
  );
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
  loadingTickets: state.tickets.loading
});

export default connect(mapStateToProps, { getTickets })(Home);
