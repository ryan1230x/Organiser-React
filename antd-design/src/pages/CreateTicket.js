import React, { useState } from "react";

// Import routing components
import { Link } from "react-router-dom";

// Import redux and actions
import { connect } from "react-redux";
import { addTicket } from "../actions/ticketActions";

// Import icons
import { HomeOutlined, EditOutlined } from "@ant-design/icons";

// Import Components
import { 
  Form, 
  Input, 
  Button, 
  DatePicker, 
  Select, 
  notification, 
  PageHeader, 
  InputNumber,
  Breadcrumb
} from "antd";
const { Option } = Select;

function CreateTicket({ users, addTicket }) {
  
  /**
   * Component State 
   */
  const [reference, setReference]         = useState(null);
  const [name, setname]                   = useState("");
  const [requestedDate, setrequestedDate] = useState("");
  const [address, setaddress]             = useState("");
  const [network, setnetwork]             = useState("");
  const [service, setservice]             = useState("");
  const [clientPackage, setclientPackage] = useState("");
  const [portability, setportability]     = useState("");
  const [contactNumber, setcontactNumber] = useState(null);
  const [landline, setlandline]           = useState(null);

  const [form] = Form.useForm();

  /**
   * Descontruct the users information 
   */
  const { displayName } = users;

  /**
   * Network options
   */
  const networkOptions = [];

  /**
   * service options
   */
  const serviceOptions = [];

  /**
   * Package options 
   */
  const packageOptions = [];

  /**
   * Portability options
   */
  const portabilityOptions = [];

  /**
   * Requested Date, date format
   */
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  /**
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
   * Create a new ticket
   */
  const setNewTicket = () => {
    const newTicket = {
      reference,
      address,
      name,
      landline,
      contactNumber,
      network,
      portability,
      clientPackage,
      requestedDate,
      service,
      status: "Open",
      createdBy: displayName,
    };
    addTicket(JSON.stringify(newTicket));    
  };
  
  /**
   * Reset fields
   */
  const resetFields = () => {
    form.resetFields();
  };

  /**
   * On form submit
   */
  const onSubmit = () => {
    setNewTicket();
    resetFields();
    openNotificationWithIcon(
      "success",
      "Ticket Created Successfully",
      null
    );
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined />
            <span style={{marginLeft: 8}}>Home</span>
          </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <EditOutlined />
            <span style={{marginLeft: 8}}>Create Ticket</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title="Create A Ticket"
        subTitle="Fill in the form to create a new ticket"
      />
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onSubmit}
      >
        {/* Client Reference */}
        <Form.Item          
          label="Client Reference"
          name="reference"
          rules={[
            {
              required: true,
              message: "Please fill in this field",
              type: "number"
            }
          ]}        
        >
          <InputNumber
      	    style={{ width:"100%" }}
            min={0}             
            onChange={(number) => setReference(number)} 
            value={reference}
          />
        </Form.Item>
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Input 
            onChange={(e) => setname(e.target.value)} 
            value={name} 
            type="text"
          />
        </Form.Item>
        {/* Requested Date */}
        <Form.Item
          label="Requested Date"
          name="requestedDate"
          rules={[
            {
              required: true,
              message: "Required",
              type: "object"
            }
          ]}
        >
          <DatePicker
	          style={{ width: "100%" }}
            onChange={(_, dateString) => setrequestedDate(dateString)} 
            value={requestedDate}
            format={dateFormatList}            
          />
        </Form.Item>
        {/* Address */}
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Input 
            onChange={(e) => setaddress(e.target.value)} 
            value={address} 
            type="text"
          />
        </Form.Item>
        {/* Network */}
        <Form.Item
          label="Network"
          name="network"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Select 
            onChange={(value) => setnetwork(value)} 
            value={network}
          >
            {networkOptions.map((option, index) => (
              <Option 
                value={option.option} 
                key={index}
              >
                {option.option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Service */}
        <Form.Item
          label="Service"
          name="service"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Select 
            onChange={(value) => setservice(value)} 
            value={service}
          >
            <Option value="option1">Option1</Option>
            <Option value="option1">Option1</Option>
            <Option value="option1">Option1</Option>
          </Select>
        </Form.Item>
        {/* Package */}
        <Form.Item
          label="Package"
          name="clientPackage"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Select 
            onChange={(value) => setclientPackage(value)} 
            value={clientPackage}
          >
            <Option value="Basic">Basic</Option>
            <Option value="middle">middle</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
        </Form.Item>
        {/* Portability */}
        <Form.Item
          label="Portability"
          name="portability"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Select 
            onChange={(value) => setportability(value)} 
            value={portability}
          >
            {portabilityOptions.map((option, index) => (
              <Option 
                value={option.option} 
                key={index}
              >
                {option.option}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Landline number */}
        <Form.Item
          label="Landline Number"
          name="landline"
          rules={[
            {
              required: true,
              message: "Required"
            }
          ]}
        >
          <Input
	          style={{ width: "100%" }}
            onChange={(e) => setlandline(e.target.value)} 
            value={landline} 
          />
        </Form.Item>
        {/* Contact number */}
        <Form.Item
          label="Contact Number"
          name="contactNumber"
          rules={[
            {
              required: true,
              message: "Required",
            }
          ]}
        >
          <Input
	          style={{ width: "100%" }}
            onChange={(e) => setcontactNumber(e.target.value)} 
            value={contactNumber}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state) => ({
  users: state.users.users
});

export default connect(mapStateToProps, { addTicket })(CreateTicket);
