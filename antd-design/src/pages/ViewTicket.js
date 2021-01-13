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
import { getTags, addTag, deleteTag } from "../actions/tagActions";

// Import Components
import ViewBreadCrumbs from "../components/ViewTicket/ViewBreadCrumbs";
import ViewDescriptions from "../components/ViewTicket/ViewDescriptions";
import ViewAddComment from "../components/ViewTicket/ViewAddComment";
import ViewComments from "../components/ViewTicket/ViewComments";
import ViewTimeline from "../components/ViewTicket/ViewTimeline";
import ViewClosingComment from "../components/ViewTicket/ViewClosingComment";
import TagDrawer from "../components/Home/TagDrawer.js";

import { TagsOutlined, EyeOutlined } from "@ant-design/icons";

// Import Components
import {
  PageHeader,
  Row,
  Col,
  Typography,
  Button,  
  Tag
} from "antd";
const { Title } = Typography;

function ViewTicket({
  addComment,
  addHistory,  
  getComments,
  addTag,
  getHistory,
  getTicketInformation,
  getTags,
  comments,
  histories,
  tags,
  ticketInformation,
  loadingComments,
  loadingHistories,
  loadingTags,
  putTicketStatusToClosed,
  deleteTag,
  users
}) {

  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);

  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  useEffect(() => {
    getTicketInformation(id);
    getComments(id);
    getHistory(id);
    getTags(id);
  }, [getTicketInformation, getComments, getHistory, getTags, id]);

  const onTagClose = () => {
    setTagDrawerVisible(false);
  };

  const showTagDrawer = () => {
    setTagDrawerVisible(true);
  };

  const { name, address } = ticketInformation;

  return (
    <>
      { loadingComments && loadingHistories && loadingTags ? (
        "Loading..."
      ) : (
      <>
        <Row>
          <Col span={15}>
            <ViewBreadCrumbs
              ticketInformation={ticketInformation}
            />
            <PageHeader
              onBack={() => window.history.back()}
              title={name}
              subTitle={address}
              style={{marginBottom: 32}}
              extra={[
                <Button
                  key="1"
                  icon={<TagsOutlined />}                  
                  onClick={showTagDrawer}
                >
                  Add Ticket Tag
                </Button>                
              ]}
              tags={
                tags.map((tag, index) => (
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
          <Col span={15}>
            <ViewAddComment
              handleAddHistory={addHistory}
              handleAddComment={addComment}
              ticketId={id}
            />
            <ViewComments 
              comments={comments}
              usersInfo={users}
            />
          </Col>
          <Col span={9}>
            <ViewTimeline
              histories={histories}
            />
          </Col>
        </Row>
        <Row>
          <Col
            span={15}
            style={{margin: "32px 0px"}}
          >
            <ViewClosingComment
              handleAddComment={addComment}
              handleAddHistory={addHistory}
              ticketId={id}
            />
          </Col>
        </Row>
        <TagDrawer
          handleAddTag={addTag}
          handleDeleteTag={deleteTag}
          tags={tags}
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
  tags: state.tags.tags,
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
  getComments,
  getHistory,
  getTicketInformation,
  getTags,
  deleteTag
})(ViewTicket);
