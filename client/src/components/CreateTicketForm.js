import React from "react";

// Import redux and actions
import {connect} from "react-redux";
import {addTicket} from "../actions/ticketActions";

class CreateTicketForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reference:"",
            name: "",
            requestedDate: "",
            address: "",
            network: "",
            service: "",
            clientPackage: "",
            portability: "",
            landline: "",
            contactNumber: ""
        }
        // Bind Event Listeners
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]:value
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
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const newTicket =  {
            reference:     this.state.reference,
            name:          this.state.name,
            requestedDate: this.state.requestedDate,
            address:       this.state.address,
            network:       this.state.network,
            service:       this.state.service,
            clientPackage: this.state.clientPackage,
            portability:   this.state.portability,
            landline:      this.state.landline,
            contactNumber: this.state.contactNumber,
            status:"Pending",
            createdBy:"Ryan",
        };
        addTicket(JSON.stringify(newTicket));
        // this.handleReset();        
        console.log(JSON.stringify(newTicket));
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    {/* Client reference */}
                    <section className="form-group col-lg-2">
                        <label htmlFor="reference">Client Reference</label>
                        <input 
                            className="form-control" 
                            type="number" 
                            id="reference" 
                            name="reference" 
                            onChange={this.handleOnChange}
                            value={this.state.reference}
                        />
                    </section>
                    {/* Name */}
                    <section className="form-group col-lg-10">
                        <label htmlFor="name">Name</label>
                        <input 
                            className="form-control" 
                            type="text"
                            id="name"
                            name="name"
                            onChange={this.handleOnChange}
                            value={this.state.name}
                        />
                    </section>
                </div>
                <div className="row"></div>
                {/* Requested Date */}
                <section className="form-group">
                    <label htmlFor="requestedDate">Requested Date</label>
                    <input 
                        type="date"
                        className="form-control"
                        id="requestedDate"
                        name="requestedDate"
                        onChange={this.handleOnChange}
                        value={this.state.requestedDate}
                    />
                </section>
                {/* Address */}
                <section className="form-group">
                   <label htmlFor="address">Address</label>
                   <input 
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        onChange={this.handleOnChange}
                        value={this.state.address}
                   />
                </section>
                {/* Network */}
                <section className="form-group">
                    <label htmlFor="network">Network</label>
                    <select 
                        name="network" 
                        id="network" 
                        className="form-control" 
                        onChange={this.handleOnChange} 
                        value={this.state.network}
                    >
                        <option defaultValue disabled>Choose a Network</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                    </select>
                </section>
                {/* Service */}
                <section className="form-group">
                    <label htmlFor="service">Service</label>
                    <select 
                        name="service" 
                        id="netword" 
                        className="form-control" 
                        onChange={this.handleOnChange} 
                        value={this.state.service}
                    >
                        <option defaultValue disabled>Choose a Service</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                    </select>
                </section>
                {/* Package */}
                <section className="form-group">
                <label htmlFor="clientPackage">Package</label>
                    <select 
                        name="clientPackage" 
                        id="clientPackage" 
                        className="form-control" 
                        onChange={this.handleOnChange} 
                        value={this.state.clientPackage}
                    >
                        <option defaultValue disabled>Choose a Package</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                    </select>
                </section>
                {/* Portability */}
                <section className="form-group">
                <label htmlFor="portability">Portability</label>
                    <select 
                        name="portability" 
                        id="netword" 
                        className="form-control" 
                        onChange={this.handleOnChange} 
                        value={this.state.portability}
                    >
                        <option defaultValue disabled>Choose a portability</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                        <option value="option1">option 1</option>
                    </select>
                </section>
                {/* Landline */}
                <section className="form-group">
                    <label htmlFor="landline">Landline</label>
                    <input 
                        className="form-control"
                        id="landline"
                        type="text"
                        name="landline"
                        onChange={this.handleOnChange}
                        value={this.state.landline}
                    />
                </section>
                {/* Contact Number */}
                <section className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input 
                        className="form-control"
                        id="contactNumber"
                        type="text"
                        name="contactNumber"
                        onChange={this.handleOnChange}
                        value={this.state.contactNumber}
                    />
                </section>
                <section className="form-group">
                    <input 
                        type="submit"
                        className="btn btn-primary"
                        value="Create Ticket"
                    />
                </section>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    ticket: state.tickets
})

export default connect(mapStateToProps, {addTicket})(CreateTicketForm);