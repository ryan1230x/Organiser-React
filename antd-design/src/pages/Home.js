import React, {useEffect} from "react";

// Import Components
import {Link} from "react-router-dom";
import {PageHeader, Table, Tag, Button} from "antd";

// import redux and actions
import {connect} from "react-redux"
import {getTickets} from "../actions/ticketActions"

/**
 * Table Columns
 */
const tableColumns = [
    {   
        key: "name",
        title:"Name",
        dataIndex: "name",
    },
    {
        key: "address",
        title:"Address",
        dataIndex: "address",
        elipsis: true
    },
    {
        key: "package",
        title: "Package",
        dataIndex: "package",
        elipsis: true
    },
    {
        key: "network",
        title: "Network",
        dataIndex: "network"
    },    
    {
        key: "status",
        title: "Status",
        dataIndex: "status",
        render: status => (
            <>
                {status.map((item, index) => {
                    let color = item.length > 5 ? "geekblue" : "green";
                    if (item === "closed") {
                        color = "red";
                    }
                    return (
                        <Tag color={color} key={index}>
                            {item.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        key: "action",
        title: "Action",
        dataIndex: "action"
    }
]

function Home({
    tickets,
    getTickets,
    loadingTickets
}) {
    
    useEffect(() => {
        getTickets()
    }, [getTickets])

    /**
    * Table data
    */
    const data = tickets.map((ticket, index) => {
        const {ticketId, name, address, status, network, clientPackage} = ticket
        return {
            key: index,
            name,
            address,
            package: clientPackage,
            network,
            status: [status],
            action: (<Button><Link to={`/ticket/${ticketId}`}>See More</Link></Button>)
        }
    });

    return(
        <>
            {loadingTickets ? (
                "Loading..."
            ) : (   
                <>             
                    <PageHeader
                        title="Home Page"
                        subTitle={`${tickets.length} Pending Installations`}
                    />                
                    <Table 
                        columns={tableColumns} 
                        dataSource={data} 
                    />
                </>
            )}
        </>
    )
}

const mapStateToProps = (state) => ({
    tickets: state.tickets.tickets,
    loadingTickets: state.tickets.loading
})

export default connect(mapStateToProps, {getTickets})(Home);