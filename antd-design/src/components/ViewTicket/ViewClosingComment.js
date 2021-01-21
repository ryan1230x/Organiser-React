import React, { useState } from "react"
import moment from "moment";

// import redux
import { useStore } from "react-redux";

// Import icons
import { CheckOutlined } from "@ant-design/icons"

// Import Components
import { 
  Form, 
  Input, 
  Typography, 
  Button,
  notification
} from "antd";
const { TextArea } = Input
const { Title } = Typography  

function ViewClosingComment({
  handleAddComment, 
  handleAddHistory, 
  ticketId,
  ticketInformation,
  handlePutTicketStatusToClosed
}) {

  /**
   * Component state
   */
  const [closingComment, setClosingComment] = useState(""); 
  const [form] = Form.useForm();

  /**
   * Get current User
   */
  const { displayName } = useStore().getState().users.users;

  /**
   * Decontruct ticket information
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
   * Reset the form
   */
  const resetForm = () => {
    form.resetFields();
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
   * Change the status to 'Closed'
   */
  const postClosingCommentHistory = () => {
    const closingCommentHistoryObject = {
      author: displayName,
      action: "closed the ticket",
      ticketId,
      addedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    handleAddHistory(JSON.stringify(closingCommentHistoryObject));
  };

  /**
   * Add closing comment
   */
  const postClosingComment = () => {
    const closingCommentObject = {
      author: displayName,
      comment: closingComment,
      ticketId,
      addedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    handleAddComment(JSON.stringify(closingCommentObject), ticketId);
  };

  /**
   * Updated ticket information
   */
  const updatedTicketInformation = () => {
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
      status: "Closed",
      createdBy
    };
    handlePutTicketStatusToClosed(JSON.stringify(updatedTicketInformation), ticketId);
    openNotificationWithIcon("info", "Ticket Closed", null)
  };

  /**
   * Add closing comment and history on form submit
   */
  const addClosingComment = () => {
    updatedTicketInformation();
    postClosingComment();
    postClosingCommentHistory();
    resetForm();
  };

  return (
    <>
      <Title level={3}>Closing Comment</Title>
      <Form 
        form={form}
        layout="vertical" 
        onFinish={addClosingComment} 
        style={{marginBottom: 32}}
      >
        <Form.Item
          name="closing-comment"
          label="Closing Comment"
          rules={[
            {
              required: true,
              message: "Can not be empty!"
            }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Add a closing comment here"
            value={closingComment}
            onChange={(e) => setClosingComment(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            htmlType="submit" 
            type="primary" 
            style={{float: "right"}}
            icon={<CheckOutlined />}
          >
            Add Closing Comment
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default ViewClosingComment;
