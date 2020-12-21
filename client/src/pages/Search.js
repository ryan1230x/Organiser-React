import React, {useEffect} from 'react'

// Import components
import Heading from "../components/Heading";

// import redux and actions
import {connect} from "react-redux";
import {searchForTicket} from "../actions/ticketActions";

// import custom hooks
import {useQuery} from "../hooks"
import { Link } from 'react-router-dom';

function SearchItem({ticket}) {
	const{
		name, 
		address, 
		clientPackage, 
		network, 
		reference, 
		ticketId
	} = ticket
	return (
		<article 
			style={{
				border:"1px solid #aaa",
				padding:15,
				borderRadius:3,
				marginBottom:15
			}}>
			<section>
			<p>
				<strong>Reference: </strong>
					{reference}
				</p>
				<p>
					<strong>Name: </strong>
					{name}
				</p>
				<p>
					<strong>Address: </strong>
					{address}
				</p>
				<p>
					<strong>Package: </strong>
					{clientPackage}
				</p>
				<p>
					<strong>Network: </strong>
					{network}
				</p>
			</section>
			<div style={{marginTop:15}}>
				<Link className="btn btn-primary" to={`/ticket/${ticketId}`}>See ticket</Link>
			</div>
		</article>
	)
}

function Search({
  tickets,
  loadingTickets,
  searchForTicket
}) {
	// get URL parameter -> {"q":"foo"}
	const queryParameter = useQuery().get("q");

  useEffect(() => {
		searchForTicket(queryParameter);
		console.log(queryParameter)
		console.log(tickets)
	}, [searchForTicket, queryParameter])
	

	const getAllClosedTickets = tickets.filter((ticket) => {
		const {status} = ticket;
		if(status.toLowerCase() === "closed") {
			return ticket;
		}
	});

	const getAllOpenTickets = tickets.filter((ticket) => {
		const {status} = ticket;
		if(status.toLowerCase() === "status") {
			return ticket;
		}
	});

  return (
  	<main className="container">
  	  <Heading title="Search Page" subtitle="Open Installations" />  
			{getAllOpenTickets.map((item, index) => (
					<SearchItem key={index} ticket={item}  />
				))
			}
			<Heading subtitle="Closed Installations" />
			{getAllClosedTickets.map((item, index) => (
					<SearchItem key={index} ticket={item}  />
				))
			}
  	</main>
  );
}

const mapStateToProps = (state) => ({
  tickets: state.tickets.tickets,
  loadingTickets: state.tickets.loading
})

export default connect(mapStateToProps, {searchForTicket})(Search);