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
import { addTag, getTags } from "../actions/tagActions";

// Import Components
import ViewBreadCrumbs from "../components/ViewTicket/ViewBreadCrumbs";
import ViewDescriptions from "../components/ViewTicket/ViewDescriptions";
import ViewAddComment from "../components/ViewTicket/ViewAddComment";
import ViewComments from "../components/ViewTicket/ViewComments";
import ViewTimeline from "../components/ViewTicket/ViewTimeline";
import ViewClosingComment from "../components/ViewTicket/ViewClosingComment";

// Import icons
import { TagsOutlined } from "@ant-design/icons"

// Import Components
import { PageHeader, Row, Col, Typography, Button, Tag, Modal, Select } from "antd";
const { Title } = Typography;

// Tag options
const options = [
  {label: "pending", value:"blue", icon: <TagsOutlined />},
  {label: "incident",value:"orange"},
  {label: "waiting"}
];

// Tag render
function tagRender(props) {
  const { icon, label, value, closeable, onClose } = props; 
  return (
    <Tag icon={icon} color={value} closable={closeable} onClose={onClose}>
      { label }
    </Tag>
  );
}


function ViewTicket({
  addComment,
  addHistory,
  addTag,
  getComments,
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
}) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  /**
   * modal helper functions
   */
  const showModal = () => {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  // Get the ticket id from the URL
  // URL-> /ticket/:id
  const { id } = useParams();

  useEffect(() => {
    getTicketInformation(id);
    getComments(id);
    getHistory(id);
    getTags(id);
  }, [getTicketInformation, getComments, getHistory, getTags, id]);

  
  const { name } = ticketInformation;

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
              title={<Title level={1}>{name}</Title>}            
              style={{marginBottom: 32}}
              extra={[
                <Button 
                  key="1" 
                  icon={<TagsOutlined />}
                  onClick={showModal}
                >
                  Add Ticket Tag
                </Button>
              ]}
              tags={
                tags.map((tag, index) => (
                  <Tag style={{textTransform: "uppercase"}} color={tag.color} key={index}>{tag.tag}</Tag>
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
            <ViewComments comments={comments} />
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
        {/* Modal */}
        <Modal title="Add a tag" onOk={handleOk} visible={isModalVisible} onCancel={handleCancel}>
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              defaultValue={tags.map((tag, index) => (
                <Tag key={index} color={tag.color}>{tag.tag}</Tag>
              ))}
              options={options}
              style={{width: "100%"}}
            />
        </Modal>
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
  loadingTags: state.tags.loading
});

export default connect(mapStateToProps, {
  addComment,
  addTag,
  addHistory,
  putTicketStatusToClosed,
  getComments,
  getHistory,
  getTicketInformation,
  getTags
})(ViewTicket);
