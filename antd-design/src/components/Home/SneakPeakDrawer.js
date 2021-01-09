import React from "react";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation } from "../../actions/ticketActions";
import { addComment, getComments } from "../../actions/commentActions";
import { addHistory } from "../../actions/historyActions";

// Import components
import ViewDescriptions from "../ViewTicket/ViewDescriptions";
import ViewComments from "../ViewTicket/ViewComments";
import ViewAddComment from "../ViewTicket/ViewAddComment";
import ViewClosingComment from "../ViewTicket/ViewClosingComment";
import {
  Drawer, 
  Row, 
  Col,
} from "antd";

function SneakPeakDrawer({
  ticketId,
  onClose,
  visible,
  addComment,
  addHistory,
  ticketInformation,
  comments,
  loadingComments
}) {

  const { name } = ticketInformation;

  return (
    <Drawer
      title={name}
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
                  <ViewClosingComment
                    handleAddComment={addComment}
                    handleAddHistory={addHistory}
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
});

export default connect(mapStateToProps, { 
  getTicketInformation, 
  getComments,
  addComment,
  addHistory
})(SneakPeakDrawer);
