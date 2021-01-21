import React, { useState } from "react";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation, putTicketStatusToClosed, putTicketStatusToOpen } from "../../actions/ticketActions";
import { addComment, getComments } from "../../actions/commentActions";
import { addHistory } from "../../actions/historyActions";
import { getTags, deleteTag, addTag } from "../../actions/tagActions";

// import icons
import { TagsOutlined } from "@ant-design/icons";

// Import components
import ViewDescriptions from "../ViewTicket/ViewDescriptions";
import ViewComments from "../ViewTicket/ViewComments";
import ViewAddComment from "../ViewTicket/ViewAddComment";
import ViewClosingComment from "../ViewTicket/ViewClosingComment";
import TagDrawer from "./TagDrawer";
import {
  Drawer, 
  Row, 
  Col,
  Button,
  Tag,
  notification
} from "antd";

function SneakPeakDrawer({
  ticketId,
  onClose,
  visible,
  addComment,
  addHistory,
  getTags,
  deleteTag,
  addTag,
  ticketInformation,
  comments,
  loadingComments,
  ticketTags,
  putTicketStatusToOpen,
  putTicketStatusToClosed
}) {

  /**
  * Component state
  */
  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);

  /**
  * Deconstruct name form ticket information that is being
  * pass through props
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
  * Helper functions to open and close the tag drawer
  */
  const onTagDrawerClose = () => {
    setTagDrawerVisible(false);
  };

  const showTagDrawer = () => {
    getTags(ticketId);
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
    putTicketStatusToOpen(JSON.stringify(updatedTicketInformation), ticketId);
    openNotificationWithIcon("info", "Ticket Reopened", null);
  };

  return (
    <Drawer
      title={
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center"
          }}
        > 
          <span style={{ marginRight: 15 }}>{name}</span>
          {ticketTags.map((tag, index) => (
            <Tag 
              key={index}
              color={tag.color}
            >
              {tag.tag}
            </Tag>
          ))}
          <div style={{ marginLeft: "auto"}}>
          {status === "Closed" ? (
            
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
              onClick={() => {
                getTags(ticketId);
                showTagDrawer();          
              }}
            >
              Add Ticket Tag
            </Button>
          )}
          </div>
        </div>
      }
      closable={false} 
      onClose={onClose} 
      visible={visible} 
      width={900}
    >
      <Row>
        <Col span={24}>
          {/* 
            check if there is ticket information, if true display
            the descriptions and comments 
          */}
          {ticketInformation === undefined ? null : (
            <>
            {loadingComments ? (
              "...loading"
              ) : (
                <>
                  <ViewDescriptions 
                    ticketInformation={ticketInformation}
                  />
                  <ViewAddComment
                    handleAddComment={addComment}
                    handleAddHistory={addHistory}
                    ticketId={ticketId}
                  />
                  <ViewComments comments={comments} /> 
                  {status === "Open" && (
                    <ViewClosingComment
                      handlePutTicketStatusToClosed={putTicketStatusToClosed}
                      ticketInformation={ticketInformation}
                      handleAddComment={addComment}
                      handleAddHistory={addHistory}
                      ticketId={ticketId}
                    />
                  )}
                  <TagDrawer
                    width={450}
                    closable={false}
                    visible={isTagDrawerVisible}
                    onClose={onTagDrawerClose}
                    tags={ticketTags}
                    handleAddTag={addTag}
                    handleDeleteTag={deleteTag}
                    ticketId={ticketId}
                  />
                </>                      
              )}
            </>
          )}
        </Col>
      </Row>
    </Drawer>
  )
}

const mapStateToProps = (state) => ({
  ticketInformation: state.tickets.ticketInformation,
  loadingComments: state.comments.loading,
  ticketTags: state.tags.ticketTags,
});

export default connect(mapStateToProps, { 
  getTicketInformation, 
  getComments,
  addComment,
  addHistory,
  addTag,
  deleteTag,
  getTags,
  putTicketStatusToOpen,
  putTicketStatusToClosed
})(SneakPeakDrawer);
