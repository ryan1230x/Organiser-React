import React from "react";

// import redux
import { useStore } from "react-redux";

// import icons
import { DeleteOutlined } from "@ant-design/icons"

// Import Components
import { Typography, Comment, Avatar, Tooltip } from "antd";
const { Title, Paragraph, Text } = Typography;

function ViewComments({ comments }) {  

  /**
   * Get current user
   */
  const { displayName } = useStore().getState().users.users; 
  let { status } = useStore().getState().tickets.ticketInformation;

  /**
   * Define actions for comments
   */
  const actions = [
    <Tooltip title="Delete Comment">
      <span>      
        <DeleteOutlined />
        <span> Delete comment</span>
      </span>
    </Tooltip>
  ];

  return (
    <>
    {comments.length <= 0  ? 
      null : 
      (<Title level={3}>{`${comments.length} Comments`}</Title>)}

    {comments.map((comment, index) => (
      <Comment
        key={index}
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
          comment.author === displayName && actions || null
        }
      />
    ))}
    </>
  );
};

export default ViewComments;
