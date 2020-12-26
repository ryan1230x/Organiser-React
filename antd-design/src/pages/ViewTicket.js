import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import {
  getTicketInformation,
  putTicketStatusToClosed
} from "../actions/ticketActions";
import { getHistory, addHistory } from "../actions/historyActions";

// Import Icons
import { HomeOutlined, EditOutlined } from '@ant-design/icons';

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
  Button,
  Typography,
  Breadcrumb
} from "antd";

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;


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

  const [newComment, setNewComment] = useState("");
  const [closingComment, setClosingComment] = useState("");

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
  const addCommentOnSubmit = () => {
    console.log("click");
    postNewComment();
    postNewHistory();
    setNewComment("");
  };

  /**
   * Closing comment
   */
  // Helper function
  const postClosingCommentHistory = () => {
    const closingCommentHistoryObject = {
      author:"Ryan",
      action: "closed the ticket",
      ticketId: id,
      addedAt: new Date().toLocaleString()
    };
    addHistory(JSON.stringify(closingCommentHistoryObject));
  }

  // Helper function
  const postClosingComment = () => {
    const closingCommentObject = {
      author: "Ryan",
      comment: closingComment,
      ticketId: id,
      addedAt: new Date().toLocaleString()
    };
    addComment(JSON.stringify(closingCommentObject));
  }

  // Add closing comment and history on form submit
  const addClosingComment = () => {
    postClosingCommentHistory()
    postClosingComment()
    setClosingComment("");
  }

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
          {/* Breadcrumb */}
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">
                <HomeOutlined />
                <span style={{marginLeft: 8}}>Home</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <EditOutlined />
              <span style={{marginLeft: 8}}>{name}</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          {/* Page Header */}
          <PageHeader 
            title={<Title level={1}>{name}</Title>}            
            style={{marginBottom: 32}}
          />
          {/* Descriptions*/}
          <Descriptions style={{marginBottom: 32}}>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Name">{name}</Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Address">{address}</Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Landline">{landline}</Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Contact Number">
              {contactNumber}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Requested Date">
              {requestedDate}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Status">{status}</Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Network">{network}</Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Client Package">
              {clientPackage}
            </Descriptions.Item>
            <Descriptions.Item labelStyle={{fontWeight: "bold"}} label="Portability">
              {portability}
            </Descriptions.Item>
          </Descriptions>          
        </Col>
        {/* Add Comment textarea and submit button */}
        <Col span={15}>
          <Form layout="vertical" onFinish={addCommentOnSubmit} style={{marginBottom: 32}}>
            <Form.Item>
              <TextArea
                rows={4}
                placeholder="Type here to add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" style={{float: "right"}}>
                Add Comment
              </Button>
            </Form.Item>
          </Form>
          {/* Comments */}
          {comments.length <= 0 ? null : (<Title level={3}>Comments</Title>)}
          {comments.map((comment, index) => (
            <Comment
              style={{background: "white", padding: 16, marginBottom: 16, borderRadius: 7}}
              key={index}
              author={<Text type="secondary">{comment.author}</Text>}
              datetime={<Text type="secondary">{comment.addedAt}</Text>}
              content={<Paragraph copyable>{comment.comment}</Paragraph>}
            />
          ))}
        </Col>
        <Col span={9}>          
          {/* Timeline / History */}
          <section style={{            
            marginLeft: 16,
            paddingLeft:16,
            paddingTop: histories.length < 0 ? 32 : 0, 
            borderRadius: 7             
          }}>          
          <Timeline reverse>
            {histories.map((history, index) => (
              <Timeline.Item key={index}>
                <Paragraph>
                  {history.author} {history.action} at {history.addedAt}
                </Paragraph>
              </Timeline.Item>
            ))}
          </Timeline>
          </section>          
        </Col>
      </Row>
      {/* Closing comment */}
      <Row>
        <Col span={15} style={{margin: "32px 0px"}}>
          <Title level={3}>Closing Comment</Title>
          <Form layout="vertical" onFinish={addClosingComment} style={{marginBottom: 32}}>
            <Form.Item>
              <TextArea
                rows={4}
                placeholder="Add a closing comment here"
                value={closingComment}
                onChange={(e) => setClosingComment(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" style={{float: "right"}}>
                Add Closing Comment
              </Button>
            </Form.Item>
          </Form>
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
