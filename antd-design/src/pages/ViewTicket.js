import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import {
  getTicketInformation,
  putTicketStatusToClosed
} from "../actions/ticketActions";
import { getHistory, addHistory } from "../actions/historyActions";

// Import Components
import {PageHeader} from "antd";

function ViewTicket({
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
    const {id} = useParams()

    useEffect(() => {
        getTicketInformation(id);
    }, [getTicketInformation, id]);

    // deconstruct information
    const {name} = ticketInformation
    
    return (
        <>
            <PageHeader
                title={name}
                onBack={() => window.history.back()}
            />
            <p>
                view ticket Components: {id}
            </p>
        </>
    )
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
})(ViewTicket);
