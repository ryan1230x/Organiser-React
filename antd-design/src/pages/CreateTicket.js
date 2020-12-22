import React from "react";

// Import redux and actions
import { connect } from "react-redux";
import { addTicket } from "../actions/ticketActions";

// Import Components
import { Form, Input, Button, DatePicker, Select } from "antd";
const { Option } = Select;

class CreateTicket extends React.Component {
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
    // Bind Event Listeners
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

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

  handleSubmit(e) {
    e.preventDefault();

    const newTicket = {
      reference: this.state.reference,
      name: this.state.name,
      requestedDate: this.state.requestedDate,
      address: this.state.address,
      network: this.state.network,
      service: this.state.service,
      clientPackage: this.state.clientPackage,
      portability: this.state.portability,
      landline: this.state.landline,
      contactNumber: this.state.contactNumber,
      status: "Pending",
      createdBy: "Ryan"
    };
    addTicket(JSON.stringify(newTicket));
    // this.handleReset();
    console.log(JSON.stringify(newTicket));
  }
  render() {
    return (
      <>
        <Form layout="inline">
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
            <Input type="number" />
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
            <Input type="text" />
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
            <DatePicker />
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
            <Input type="text" />
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
            <Select>
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
            <Select>
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
            <Select>
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
            <Select>
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
            <Input type="number" />
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
            <Input type="number" />
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

const mapStateToProps = (state) => ({
  ticket: state.tickets
});

export default connect(mapStateToProps, { addTicket })(CreateTicket);
