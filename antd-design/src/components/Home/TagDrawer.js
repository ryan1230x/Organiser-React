import React, { useState } from "react";

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
  handleAddTag,
  tags,
}) {

  const [tagInput, setTagInput] = useState("");
  const [colorValue, setColorValue] = useState("blue");
  const [tagBadgeIcon, setTagBadgeIcon] = useState(false);

  const onSubmit = () => {
    const newTagObject = {
      ticketId,
      tag: tagInput.toUpperCase(),
      color: colorValue
    };

    handleAddTag(JSON.stringify(newTagObject), ticketId);
    setTagInput("");
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
        <Form onFinish={onSubmit} layout="vertical">
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
              <Radio value="blue">Blue</Radio>
              <Radio value="orange">Orange</Radio>
              <Radio value="green">Green</Radio>
              <Radio value="red">Red</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" style={{ float: "right", width: "100%" }}>
              Add Tag
            </Button>
          </Form.Item>
        </Form>
        <h3>Tags</h3>
        <section style={{ background: "#f5f5f5", padding: 15, borderRadius: 3 }}>
          {tags.length > 0 && (
            <div style={{ float: "right" }}>
              <Tooltip title="Delete a Tag">
                <Button onClick={() => setTagBadgeIcon(!tagBadgeIcon)} icon={<DeleteOutlined />} />
              </Tooltip>
            </div>
          )}
        {tags.length === 0 ? (
          "There are currently no tags"
        ) : 
          tags.map((tag, index) => {            
            if (!tagBadgeIcon) {
              return (
                <Tag key={index} color={tag.color}>{tag.tag}</Tag>
              )
            } else {
              return (
                <Badge style={{ color: '#f5222d', right: 6, cursor: "pointer" }} count={<MinusCircleOutlined />}>
                  <Tag key={index} color={tag.color}>{tag.tag}</Tag>
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

export default TagDrawer; 
