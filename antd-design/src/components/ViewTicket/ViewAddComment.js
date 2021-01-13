import React, { useState } from "react";

// import redux hook
import { useStore } from "react-redux";

// import icons
import { EditOutlined } from "@ant-design/icons";

// Import Components
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

function ViewAddComment({
  ticketId, 
  handleAddComment, 
  handleAddHistory,
}) {
  
  const [newComment, setNewComment] = useState("");

  /**
  * Get user information from the store
  */
  const { displayName } = useStore().getState().users.users; 
  
  /**
   * Add new Comment on Submit
   */
  // Helper funtion
  const postNewComment = () => {
    const newCommentObject = {
      author: displayName,
      comment: newComment,
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddComment(JSON.stringify(newCommentObject), ticketId);
  };

  // Helper function
  const postNewHistory = () => {
    const newHistoryObject = {
      author: displayName,
      action: "added a comment",
      ticketId,
      addedAt: new Date().toLocaleString()
    };
    handleAddHistory(JSON.stringify(newHistoryObject));
  };

  // Add new Comment and history on form Submit
  const addCommentOnSubmit = () => {
    postNewComment();
    postNewHistory();
    setNewComment("");
  };
  
  return (
    <Form 
      layout="vertical" 
      onFinish={addCommentOnSubmit} 
      style={{marginBottom: 32}}
    >
      <Form.Item
        name="new-comment"
        label="Add Comment"
        rules={[
          {            
            required: true,
            message: "Can not be empty!"
          }
        ]}
      >
        <TextArea          
          allowClear
          rows={4}
          placeholder="Type here to add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit" 
            style={{float: "right"}}
            icon={<EditOutlined />}
          >
            Add Comment
          </Button>
        </Form.Item>
    </Form>
  )
}

export default ViewAddComment;
