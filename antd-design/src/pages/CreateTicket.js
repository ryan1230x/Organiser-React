import React, { Component } from "react";

// Import redux and actions
import { connect } from "react-redux";
import { addTicket } from "../actions/ticketActions";

// Import Components
import { Form, Input, Button, DatePicker, Select, notification } from "antd";
const { Option } = Select;

class CreateTicket extends Component {
  /**
   * component constructor and state
   */
  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      name: "",
      requestedDate: "",
      address: "",
      network: "",
      service: "",
      clientPackage: "",
      portability: "",
      landline: "",
      contactNumber: ""
    };

    /**
     * Bind Event Listeners to this keyword `this`
     */
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.postTicket = this.postTicket.bind(this);
  }

  /**
   * @param {string} type success, info, error or warning
   * @param {string} the message title
   * @param {string} the description of the notification
   */
  openNotificationWithIcon(type, message, description) {
    notification[type]({
      message,
      description
    });
  }

  /**
   * handle onChange event and store in state
   */
  handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  /**
   * clear and reset all form inputs
   */
  handleReset() {
    this.setState({
      reference: "",
      name: "",
      requestedDate: "",
      address: "",
      network: "",
      service: "",
      clientPackage: "",
      portability: "",
      landline: "",
      contactNumber: ""
    });
  }

  /**
   * @description Helper function, prepare the ticket data and convert into JSON format
   */
  postTicket() {
    const {
      reference,
      name,
      requestedDate,
      address,
      network,
      service,
      clientPackage,
      portability,
      landline,
      contactNumber
    } = this.state;

    const newTicketObject = {
      reference,
      name,
      requestedDate,
      address,
      network,
      service,
      clientPackage,
      landline,
      portability,
      contactNumber,
      createdBy: "Ryan",
      status: "Pending" // Default: set to pending
    };

    if (addTicket(JSON.stringify(newTicketObject))) {
      this.openNotificationWithIcon(
        "success",
        "Ticket Created",
        "The ticket was created successfully"
      );
    }
  }

  /**
   * submit form data
   */
  handleSubmit(e) {
    e.preventDefault();
    this.postTicket();
    console.log("form submitted with data");
  }

  render() {
    /**
     * Deconstructor all data from state
     */
    const {
      reference,
      name,
      requestedDate,
      address,
      network,
      service,
      clientPackage,
      portability,
      landline,
      contactNumber
    } = this.state;

    /**
     * Deconstruct functions
     */
    const { handleSubmit, onChange } = this;

    return (
      <>
        <Form autocomplete="off" onFinish={handleSubmit} layout="inline">
          {/* Client Reference */}
          <Form.Item
            label="Client Reference"
            name="reference"
            rules={[
              {
                type: "number",
                required: true,
                message: "Required",
                min: 0
              }
            ]}
          >
            <Input onChange={onChange} value={reference} type="number" />
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
            <Input onChange={onChange} value={name} type="text" />
          </Form.Item>
          {/* Requested Date */}
          <Form.Item
            label="Requested Date"
            name="requestedDate"
            rules={[
              {
                required: true,
                message: "Required",
                type: Object
              }
            ]}
          >
            <DatePicker onChange={onChange} value={requestedDate} />
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
            <Input onChange={onChange} value={address} type="text" />
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
            <Select onChange={onChange} value={network}>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
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
            <Select onChange={onChange} value={service}>
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
            <Select onChange={onChange} value={clientPackage}>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
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
            <Select onChange={onChange} value={portability}>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
              <Option value="option1">Option1</Option>
            </Select>
          </Form.Item>
          {/* Landline number */}
          <Form.Item
            label="Landline Number"
            name="landline"
            rules={[
              {
                type: "number",
                required: true,
                message: "Required"
              }
            ]}
          >
            <Input onChange={onChange} value={landline} type="number" />
          </Form.Item>
          {/* Contact number */}
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              {
                type: "number",
                required: true,
                message: "Required"
              }
            ]}
          >
            <Input onChange={onChange} value={contactNumber} type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default connect(null, { addTicket })(CreateTicket);
