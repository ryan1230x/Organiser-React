import React, { useState } from "react"

// Import icons
import { CheckOutlined } from "@ant-design/icons"

// Import Components
import { Form, Input, Typography, Button } from "antd";
const { TextArea } = Input
const { Title } = Typography  

function ViewClosingComment({handleAddComment, handleAddHistory, ticketId}) {
  const [closingComment, setClosingComment] = useState("");

  /**
   * Closing comment
   */
  // Helper function
  const postClosingCommentHistory = () => {
    const closingCommentHistoryObject = {
      author:"Ryan",
      action: "closed the ticket",
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddHistory(JSON.stringify(closingCommentHistoryObject));
  }

  // Helper function
  const postClosingComment = () => {
    const closingCommentObject = {
      author: "Ryan",
      comment: closingComment,
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddComment(JSON.stringify(closingCommentObject), ticketId);
  }

  // Add closing comment and history on form submit
  const addClosingComment = () => {
    postClosingCommentHistory()
    postClosingComment()
    setClosingComment("");
  }

  return (
    <>
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