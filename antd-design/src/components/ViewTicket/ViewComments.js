import React from "react";

// Import Components
import { Typography, Comment, Avatar, Tooltip } from "antd";
const { Title, Paragraph, Text } = Typography;

function ViewComments({ comments }) {
  return (
    <>
    {comments.length <= 0  ? 
        null : 
        (<Title level={3}>{`${comments.length} Comments`}</Title>)}
    {comments.map((comment, index) => (
      <Comment
        avatar={
          <Avatar
            src=""
            alt="user profile picture"
          >
            RH
          </Avatar>
        }
        style={{border: "1px solid #ccc",background: "white", padding: 16, marginBottom: 16, borderRadius: 7}}
        key={index}
        author={<Text type="secondary">{comment.author}</Text>}
        datetime={
          <Tooltip title={comment.addedAt}>
            <span>{comment.addedAt}</span>
          </Tooltip>
        }
        content={<Paragraph copyable>{comment.comment}</Paragraph>}
      />
    ))}
    </>
  )
}

export default ViewComments;
