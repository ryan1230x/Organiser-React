import React from "react";

// Import Components
import { Typography, Comment } from "antd";
const { Title, Paragraph, Text } = Typography;

function ViewComments({comments}) {
  return (
    <>
    {comments.length <= 0 ? null : (<Title level={3}>Comments</Title>)}
    {comments.map((comment, index) => (
      <Comment
        style={{background: "white", padding: 16, marginBottom: 16, borderRadius: 7}}
        key={index}
        author={<Text type="secondary">{comment.author}</Text>}
        datetime={<Text type="secondary">{comment.addedAt}</Text>}
        content={<Paragraph copyable>{comment.comment}</Paragraph>}
      />
    ))}
    </>
  )
}

export default ViewComments;