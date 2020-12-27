import React, { useState } from "react";

// Import Components
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

function ViewAddComment({ticketId, handleAddComment, handleAddHistory}) {
  const [newComment, setNewComment] = useState("");
  
  /**
   * Add new Comment on Submit
   */
  // Helper funtion
  const postNewComment = () => {
    const newCommentObject = {
      author: "Ryan",
      comment: newComment,
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddComment(JSON.stringify(newCommentObject), ticketId);
  };

  // Helper function
  const postNewHistory = () => {
    const newHistoryObject = {
      author: "Ryan",
      action: "added a comment",
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddHistory(JSON.stringify(newHistoryObject));
  };

  // Add new Comment and history on form Submit
  const addCommentOnSubmit = () => {
    console.log("click");
    postNewComment();
    postNewHistory();
    setNewComment("");
  };
  
  return (
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
  )
}

export default ViewAddComment;