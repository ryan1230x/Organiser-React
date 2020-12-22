import React, { useEffect, useState } from "react";
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
import {
  PageHeader,
  Comment,
  Descriptions,
  Timeline,
  Row,
  Col,
  Input,
  Form,
  Button
} from "antd";

const { Textarea } = Input;

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
  const [newComment, setNewComment] = useState("");

  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  useEffect(() => {
    getTicketInformation(id);
    getComments(id);
    getHistory(id);
  }, [getTicketInformation, getComments, getHistory, id]);

  /**
   * Add new Comment on Submit
   */
  // Helper funtion
  const postNewComment = () => {
    const newCommentObject = {
      author: "Ryan",
      comment: newComment,
      ticketId: id,
      addedAt: new Date().toLocaleString()
    };
    addComment(JSON.stringify(newCommentObject), id);
  };

  // Helper function
  const postNewHistory = () => {
    const newHistoryObject = {
      author: "Ryan",
      action: "added a comment",
      ticketId: id,
      addedAt: new Date().toLocaleString()
    };
    addHistory(JSON.stringify(newHistoryObject));
  };

  // Add new Comment and history on form Submit
  const addCommentOnSubmit = (e) => {
    e.preventDefault();
    postNewComment();
    postNewHistory();
    setNewComment("");
  };

  // deconstruct ticket information
  const {
    name,
    address,
    landline,
    contactNumber,
    requestedDate,
    status,
    clientPackage,
    network,
    portability
  } = ticketInformation;

  return (
    <>
      <Row>
        <Col span={15}>
          {/* Page Header */}
          <PageHeader title={name} onBack={() => window.history.back()} />
          {/* Descriptions*/}
          <Descriptions>
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Descriptions.Item label="Address">{address}</Descriptions.Item>
            <Descriptions.Item label="Landline">{landline}</Descriptions.Item>
            <Descriptions.Item label="Contact Number">
              {contactNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Requested Date">
              {requestedDate}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            <Descriptions.Item label="Network">{network}</Descriptions.Item>
            <Descriptions.Item label="Client Package">
              {clientPackage}
            </Descriptions.Item>
            <Descriptions.Item label="Portability">
              {portability}
            </Descriptions.Item>
          </Descriptions>
          {/* Add Comment textarea and submit button */}
          <Col span={15}>
            <Form onSubmit={addCommentOnSubmit}>
              <Form.Item label="Add Comment">
                <Textarea
                  rows={4}
                  placeholder="Type here to add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Add Comment
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {/* Comments */}
          {comments.map((comment, index) => (
            <Comment
              key={index}
              author={comment.author}
              datetime={comment.addedAt}
              content={<p>{comment.comment}</p>}
            />
          ))}
        </Col>
        <Col span={9}>
          {/* Timeline / History */}
          <Timeline>
            {histories.map((history, index) => (
              <Timeline.Item>
                {history.author} {history.action} at {history.addedAt}
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </>
  );
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
