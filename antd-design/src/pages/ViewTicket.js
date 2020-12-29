import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import {
  getTicketInformation,
  putTicketStatusToClosed
} from "../actions/ticketActions";
import { getHistory, addHistory } from "../actions/historyActions";

// Import Components
import ViewBreadCrumbs from "../components/ViewTicket/ViewBreadCrumbs";
import ViewDescriptions from "../components/ViewTicket/ViewDescriptions";
import ViewAddComment from "../components/ViewTicket/ViewAddComment";
import ViewComments from "../components/ViewTicket/ViewComments";
import ViewTimeline from "../components/ViewTicket/ViewTimeline";
import ViewClosingComment from "../components/ViewTicket/ViewClosingComment";

// Import Components
import { PageHeader, Row, Col, Typography } from "antd";
const { Title } = Typography;

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
  const { id } = useParams();

  useEffect(() => {
    getTicketInformation(id);
    getComments(id);
    getHistory(id);
  }, [getTicketInformation, getComments, getHistory, id]);

  const { name } = ticketInformation;

  return (
    <>
      {loadingComments && loadingHistories ? (
        "Loading..."
      ) : (
        <>
          <Row>
            <Col span={15}>
              <ViewBreadCrumbs ticketInformation={ticketInformation} />
              <PageHeader
                title={<Title level={1}>{name}</Title>}
                style={{ marginBottom: 32 }}
              />
              <ViewDescriptions ticketInformation={ticketInformation} />
            </Col>
            <Col span={15}>
              <ViewAddComment
                handleAddHistory={addHistory}
                handleAddComment={addComment}
                ticketId={id}
              />
              <ViewComments comments={comments} />
            </Col>
            <Col span={9}>
              <ViewTimeline histories={histories} />
            </Col>
          </Row>
          <Row>
            <Col span={15} style={{ margin: "32px 0px" }}>
              <ViewClosingComment
                handleAddComment={addComment}
                handleAddHistory={addHistory}
                ticketId={id}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  ticketInformation: state.tickets.ticketInformation,
  histories: state.histories.histories,
  loadingComments: state.comments.loading,
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
