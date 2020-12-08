import React from "react";

function CreateTicketForm() {
    return (
        <form>
            <div className="row">
                {/* Client reference */}
                <section className="form-group col-lg-2">
                    <label htmlFor="client-reference">Client Reference</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        id="client-reference" 
                        name="client-reference" 
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
                    />
                </section>
            </div>
            <div className="row"></div>
            {/* Requested Date */}
            <section className="form-group">
                <label htmlFor="requested-date">Requested Date</label>
                <input 
                    type="date"
                    className="form-control"
                    id="requested-date"
                    name="requested-date"
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
               />
            </section>
            {/* Network */}
            <section className="form-group">
                <label htmlFor="network">Network</label>
                <select name="network" id="network" className="form-control">
                    <option selected disabled>Choose a Network</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                </select>
            </section>
            {/* Service */}
            <section className="form-group">
                <label htmlFor="service">Service</label>
                <select name="service" id="netword" className="form-control">
                    <option selected disabled>Choose a Service</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                </select>
            </section>
            {/* Package */}
            <section className="form-group">
            <label htmlFor="package">package</label>
                <select name="package" id="netword" className="form-control">
                    <option selected disabled>Choose a Package</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                    <option value="option1">option 1</option>
                </select>
            </section>
            {/* Portability */}
            <section className="form-group">
            <label htmlFor="portability">Portability</label>
                <select name="portability" id="netword" className="form-control">
                    <option selected disabled>Choose a portability</option>
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
                />
            </section>
            {/* Contact Number */}
            <section className="form-group">
                <label htmlFor="contact-number">Contact Number</label>
                <input 
                    className="form-control"
                    id="contact-number"
                    type="text"
                    name="contact-number"
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

export default CreateTicketForm;