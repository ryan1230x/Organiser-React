import React, { useEffect, useState } from "react";

// import components for routing
import { useParams } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getComments, addComment } from "../actions/commentActions";
import { getTicketInformation, putTicketStatusToClosed, putTicketStatusToOpen } from "../actions/ticketActions";
import { getHistory, addHistory } from "../actions/historyActions";
import { getTags, addTag, deleteTag } from "../actions/tagActions";

// Import Components
import ViewBreadCrumbs from "../components/ViewTicket/ViewBreadCrumbs";
import ViewDescriptions from "../components/ViewTicket/ViewDescriptions";
import ViewAddComment from "../components/ViewTicket/ViewAddComment";
import ViewComments from "../components/ViewTicket/ViewComments";
import ViewTimeline from "../components/ViewTicket/ViewTimeline";
import ViewClosingComment from "../components/ViewTicket/ViewClosingComment";
import TagDrawer from "../components/Home/TagDrawer";

import { TagsOutlined } from "@ant-design/icons";

// Import Components
import {
  PageHeader,
  Row,
  Col,
  Button,  
  Tag,
  notification
} from "antd";

function ViewTicket({
  getComments,
  getHistory,
  getTicketInformation,
  getTags,
  comments,
  histories,
  ticketTags,
  ticketInformation,
  loadingComments,
  loadingHistories,
  loadingTags,
  putTicketStatusToOpen,
  users
}) {

  /**
  * Component state
  */
  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);

  /**
  * Get the ticket id from the URL
  * URL-> /ticket/:id
  */   
  const { id } = useParams();

  /**
  * Once the Home page is rendered run the functions
  */
  useEffect(() => {
    getTicketInformation(id);
    getComments(id);
    getHistory(id);
    getTags(id);
  }, [getTicketInformation, getComments, getHistory, getTags, id]);

  /**
  * Deconstruct ticket information
  */
  const { 
    reference,
    address, 
    name, 
    landline, 
    contactNumber,
    network,
    portability,
    clientPackage,
    requestedDate,
    service,
    status,
    createdBy
  } = ticketInformation;

  /**
   * helper functions to open and close drawer
   */
  const onTagClose = () => {
    setTagDrawerVisible(false);
  };

  const showTagDrawer = () => {
    setTagDrawerVisible(true);
  };

  /**
   * Set Notification
   * @param {string} type of the notification success, info, error or warning
   * @param {string} message of the notification
   * @param {string | void} description of the notification
   */
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  }

  /**
   * Reopen closed ticket
   */
  const onClickReopenTicket = () => {
    const updatedTicketInformation = {
      reference,
      address,
      name,
      landline,
      contactNumber,
      network,
      portability,
      clientPackage,
      requestedDate,
      service,
      status: "Open",
      createdBy
    };
    putTicketStatusToOpen(JSON.stringify(updatedTicketInformation), id);
    openNotificationWithIcon("info", "Ticket Reopened", null);
  };

  /**
   * PageHeader extra actions
   */
  const pageheaderExtra = [
    status === "Closed" ? (
      <Button
        key="1"
        type="primary"
        onClick={() => onClickReopenTicket()}
      >
        Reopen Ticket
      </Button>
    ) : (
      <Button
        key="2"
        icon={<TagsOutlined />}                  
        onClick={showTagDrawer}
      >
        Add Ticket Tag
      </Button>
    )
  ];

  return (
    <>
      {/*
        if the comments, histories or tags are loading display
        loading message otherwise display the ticket information
      */}
      { loadingComments && loadingHistories && loadingTags ? (
        "Loading..."
      ) : (
      <>
        <Row>
          <Col span={17}>
            <ViewBreadCrumbs
              ticketInformation={ticketInformation}
            />
            <PageHeader
              onBack={() => window.history.back()}
              title={`${reference} ${name}`}              
              style={{marginBottom: 32}}
              extra={pageheaderExtra}
              tags={
                ticketTags.map((tag, index) => (
                  <Tag 
                    key={index} 
                    color={tag.color}
                  >
                    {tag.tag}
                  </Tag>
                ))
              }
            />            
            <ViewDescriptions
              ticketInformation={ticketInformation}
            />
          </Col>
          <Col span={17}>
            {/* If the ticket is open show the textarea to add comments */}
            {status === "Open" && (
              <ViewAddComment              
                ticketId={id}
              />
            )}
            <ViewComments 
              comments={comments}
              usersInfo={users}
            />
          </Col>
          <Col span={5}>
            <ViewTimeline
              histories={histories}
            />
          </Col>
        </Row>
        <Row>          
          <Col
            span={17}
            style={{margin: "32px 0px"}}
          >            
            {/* If the ticket is open show the textarea to add closing comment */}
            {status === "Open" && (              
              <ViewClosingComment
                ticketInformation={ticketInformation}
                ticketId={id}
              />)}            
          </Col>
        </Row>
        <TagDrawer
          tags={ticketTags}
          closable={false}
          onClose={onTagClose}
          visible={isTagDrawerVisible}
          ticketId={id}
        />
      </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  ticketInformation: state.tickets.ticketInformation,
  histories: state.histories.histories,
  ticketTags: state.tags.ticketTags,
  loadingComments: state.comments.loading,
  loadingHistories: state.histories.loading,
  loadingTags: state.tags.loading,
  users: state.users.users
});

export default connect(mapStateToProps, {
  addComment,  
  addHistory,
  addTag,
  putTicketStatusToClosed,
  putTicketStatusToOpen,
  getComments,
  getHistory,
  getTicketInformation,
  getTags,
  deleteTag
})(ViewTicket);
