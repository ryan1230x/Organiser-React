import React from "react";
import PropTypes from "prop-types";

// import redux and actions
import { useDispatch, useStore } from "react-redux";
import { deleteComment } from "../../actions/commentActions";

// import icons
import { DeleteOutlined } from "@ant-design/icons"

// Import Components
import { Typography, Comment, Avatar, Tooltip, notification } from "antd";
const { Title, Paragraph, Text } = Typography;

function ViewComments({ comments }) {  

  /**
   * Init Redux hook
   */
  const dispatch = useDispatch();

  /**
   * Get current user
   */
  const { displayName } = useStore().getState().users.users; 
  let { status } = useStore().getState().tickets.ticketInformation;

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
   * on click delete comment
   */
  const onDelete = (id) => {
    dispatch(deleteComment(id));
    openNotificationWithIcon("info", "Comment successfully deleted", null);
  };

  return (
    <>
    {comments.length <= 0  ? 
      null : 
      (<Title level={3}>{`${comments.length} Comments`}</Title>)}

    {comments.map((comment) => (
      <Comment
        key={comment.id}
        avatar={
        <Avatar
          style={{ 
            color: '#f56a00', 
            backgroundColor: '#fde3cf'
          }}
          alt="user profile"
        >
          {comment.author[0].toUpperCase()}
        </Avatar>
        }
        author={<Text>{comment.author}</Text>}
        datetime={
          <Tooltip title={comment.addedAt}>
            <span>{comment.addedAt}</span>
          </Tooltip>
        }
        content={
          <Paragraph 
            copyable              
            style={{whiteSpace: "pre-line"}}
          >
            {comment.comment}
          </Paragraph>          
        }
        actions={        
          status === "Open" && 
          comment.author === displayName && 
          [
            <Tooltip key="1" title="Delete Comment">
              <span onClick={() => onDelete(comment.commentId)}>      
                <DeleteOutlined />
                <span> Delete comment</span>
              </span>
            </Tooltip>
          ]
        }
      />
    ))}
    </>
  );
};

ViewComments.propTypes = {
  comments: PropTypes.array.isRequired
}

export default ViewComments;
