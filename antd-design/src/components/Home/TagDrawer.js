import React, { useState } from "react";
import PropTypes from "prop-types";

// import actions + redux 
import { addTag, deleteTag } from "../../actions/tagActions";
import { useDispatch } from "react-redux";

// import icons
import { DeleteOutlined, MinusCircleOutlined } from "@ant-design/icons";

// import components
import { 
  Drawer, 
  Row, 
  Col,
  Form,
  Input,
  Button,
  Radio,
  Tag,
  Tooltip,
  Badge
} from "antd";

function TagDrawer({
  ticketId,
  onClose,
  visible,
  tags,
}) {
  
  /**
  * Component state
  */
  const [tagInput, setTagInput]         = useState("");
  const [colorValue, setColorValue]     = useState("blue");
  const [tagBadgeIcon, setTagBadgeIcon] = useState(false);

  const [form] = Form.useForm();

  /**
   * init redux hook
   */
  const dispatch = useDispatch();

  /**
  * All available tag colors
  */
  const tagColors = ["blue", "orange", "green", "red"];

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
    const newTagObject = {
      ticketId,
      tag: tagInput.toUpperCase(),
      color: colorValue
    };
    dispatch(addTag(JSON.stringify(newTagObject), ticketId));
    resetFields();
  }; 

  return (
    <Drawer
      closable={false}
      onClose={onClose}
      visible={visible}
      width={450}
    >
      <Row>
        <Col span={24}>
        <Form 
          form={form} 
          onFinish={onSubmit} 
          layout="vertical"
        >
          <Form.Item
            label="Add a Tag"
            name="add-a-tag"
            rules={[
              {
                type: "string",
                required: true,
                message: "Required"
              }
            ]}
          >
            <Input 
              onChange={(e) => setTagInput(e.target.value)}
              value={tagInput}
              type="text"
            />
          </Form.Item>
          <h3>Choose a color</h3>
          <Form.Item>
            <Radio.Group 
              onChange={(e) => setColorValue(e.target.value)} 
              value={colorValue}
            >
              {tagColors.map((color, index) => (
                <Radio 
                  value={color} 
                  key={index}
                >
                  {color}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              type="primary" 
              style={{ 
                float: "right", 
                width: "100%" 
              }}
            >
              Add Tag
            </Button>
          </Form.Item>
        </Form>
        <h3>Tags</h3>
        <section 
          style={{ 
            background: "#f5f5f5", 
            padding: 15, 
            borderRadius: 3 
          }}>
          {/*
            If there are any tags display the delete icon 
          */}
          {tags.length > 0 && (
            <div style={{ float: "right" }}>
              <Tooltip title="Delete a Tag">
                <Button 
                  onClick={() => setTagBadgeIcon(!tagBadgeIcon)} 
                  icon={<DeleteOutlined />} 
                />
              </Tooltip>
            </div>
          )}
        {/*
          If there are no tags display message otherwise display all the tags that belong to 
          the ticket
        */}
        {tags.length === 0 ? (
          "Fill the form above to add a tag!"
        ) : 
          tags.map((tag, index) => {
            if (!tagBadgeIcon) {
              return (
                <Tag 
                  key={index} 
                  color={tag.color}
                >
                  {tag.tag}
                </Tag>
              )
            } else {              
              return (
                <Badge 
                  key={index} 
                  style={{ 
                    color: '#f5222d', 
                    right: 6, 
                    cursor: "pointer"
                  }} 
                  count={<MinusCircleOutlined />}
                  onClick={() => dispatch(deleteTag((tag.tag_id)))}
                >
                  <Tag 
                    key={index}
                    color={tag.color}
                  >
                    {tag.tag}
                  </Tag>
                </Badge>
              )
            }
          })
        }
        </section>
        </Col>
      </Row>
    </Drawer>
  )
}

TagDrawer.propTypes = {
  ticketId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  tags: PropTypes.array.isRequired
}

export default TagDrawer; 
