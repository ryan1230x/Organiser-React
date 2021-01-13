import React, { useState } from "react";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation } from "../../actions/ticketActions";
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
  Tag
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
  tags,
  ticketInformation,
  comments,
  loadingComments
}) {

  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);

  const onTagDrawerClose = () => {
    setTagDrawerVisible(false);
  };

  const showTagDrawer = () => {
    getTags(ticketId);
    setTagDrawerVisible(true);
  };

  const { name } = ticketInformation;

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
          {tags.map((tag, index) => (
            <Tag 
              key={index}
              color={tag.color}
            >
              {tag.tag}
            </Tag>
          ))}
          <Button 
            icon={<TagsOutlined />}
            style={{ marginLeft:"auto"}}
            onClick={() => {
              getTags(ticketId);
              showTagDrawer();
            }}
            >
              Add Ticket Tag
            </Button>
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
                  <ViewClosingComment
                    handleAddComment={addComment}
                    handleAddHistory={addHistory}
                    ticketId={ticketId}
                  />
                  <TagDrawer
                    width={450}
                    closable={false}
                    visible={isTagDrawerVisible}
                    onClose={onTagDrawerClose}
                    tags={tags}
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
  tags: state.tags.tags
});

export default connect(mapStateToProps, { 
  getTicketInformation, 
  getComments,
  addComment,
  addHistory,
  addTag,
  deleteTag,
  getTags
})(SneakPeakDrawer);
