import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { 
  useDispatch, 
  useStore, 
  useSelector 
} from "react-redux";

// Import actions
import { 
  getAllSnippetsForUser, 
  addSnippetForUser, 
  deleteSnippet 
} from "../../actions/snippetActions";

// import icons
import { DeleteOutlined } from "@ant-design/icons";

// import components
import { 
  Drawer, 
  Row, 
  Col,
  Form,
  Input,
  Button,
  Collapse,
  Typography,
  Tooltip
} from "antd";
const { Panel } = Collapse;

function Snippet({ onClose, visible }) {
  
  /**
  * Component state
  */
  const [snippetTitle, setSnippedTitle] = useState("");
  const [snippetBody, setSnippetBody]   = useState("");

  const [form] = Form.useForm();

  /**
   * Get username
   */
  const { displayName } = useStore().getState().users.users;

  /**
   * Get all users snippets
   */
  const snippets = useSelector(state => state.snippets.snippets);

  /**
   * init redux hooks 
   */
  const dispatch = useDispatch();

  /**
   * Get all the users snippets
   */
  useEffect(() => {
    dispatch(getAllSnippetsForUser(displayName));
  }, []);

  /**
   * Reset form input
   */
  const resetFields = () => {
    form.resetFields();
  };

  /**
  * Creates a new tag on form submit
  */
  const onSubmit = () => {    
    const newSnippit = {
      title:snippetTitle,
      body: snippetBody,
      createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      author: displayName
    };
    dispatch(addSnippetForUser(JSON.stringify(newSnippit)));
    resetFields();
  }; 


  return (
    <Drawer
      closable={false}
      onClose={onClose}
      visible={visible}
      width={650}
    >
      <Row>
        <Col span={24}>
        <Form 
          form={form} 
          onFinish={onSubmit} 
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="snippet-title"
            rules={[
              {
                type: "string",
                required: true,
                message: "Required"
              }
            ]}
          >
            <Input 
              allowClear
              placeholder="Snippet title"
              value={snippetTitle}
              onChange={(e) => setSnippedTitle(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Body"
            name="snippet-body"       
            rules={[
              {
                type: "string",
                required: true,
                message: "Required"
              }
            ]}
          >
            <Input.TextArea
              rows={10}
              autoSize
              allowClear
              onChange={(e) => setSnippetBody(e.target.value)}
              value={snippetBody}
              placeholder="Type snippet here..."
            />
          </Form.Item>          
          <Form.Item>
            <Button 
              htmlType="submit" 
              type="primary" 
              style={{ 
                float: "right"                
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Col>
      </Row>
      <h3>Snippets</h3>
      {snippets.length === 0 ? (
        "Fill the form above to create a snippet"
      ) : (
        <Collapse expandIconPosition="right" accordion>
        {snippets.map((snippet, index) => (
            <Panel 
              key={index} 
              header={(<b>{snippet.title}</b>)}
              extra={
                <Tooltip title="Delete Snippet">
                  <Button
                    onClick={() => dispatch(deleteSnippet(snippet.snippetId))}
                    icon={<DeleteOutlined />} 
                  />
                </Tooltip>
              }
            >
              <Typography.Paragraph
                copyable               
                style={{ 
                  whiteSpace: "pre-line", 
                  position: "relative",
                  maxWidth: "70ch"
                }}
              >
                {snippet.body}
              </Typography.Paragraph>
            </Panel>
        ))}
      </Collapse>
      )}
    </Drawer>
  )
}

Snippet.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}

export default Snippet; 
