import React, { useState } from "react";
import moment from "moment";

// import redux hook
import { useStore } from "react-redux";

// import icons
import { EditOutlined } from "@ant-design/icons";

// Import Components
import { Form, Input, Button, notification} from "antd";
const { TextArea } = Input;

function ViewAddComment({
  ticketId, 
  handleAddComment, 
  handleAddHistory,
}) {

  /**
   * Component state
   */
  const [newComment, setNewComment] = useState("");
  const [form] = Form.useForm();

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
  * Get user information from the store
  */
  const { displayName } = useStore().getState().users.users; 

  /**
   * Reset form
   */
  const resetForm = () => {
    form.resetFields();
  };

  /**
   * Add new Comment
   */
  const postNewComment = () => {
    const newCommentObject = {
      author: displayName,
      comment: newComment,
      ticketId,
      addedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    handleAddComment(JSON.stringify(newCommentObject), ticketId);
  };

  /**
   * Add new History 
   */
  const postNewHistory = () => {
    const newHistoryObject = {
      author: displayName,
      action: "added a comment",
      ticketId,
      addedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
    handleAddHistory(JSON.stringify(newHistoryObject));
  };

  /**
   * Add new Comment and history on form Submit
   */
  const addCommentOnSubmit = () => {   
    postNewComment();
    postNewHistory();
    resetForm();
    openNotificationWithIcon( "success", "Comment Added Succesfully", null);
  };
  
  return (
    <Form
      form={form}
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
