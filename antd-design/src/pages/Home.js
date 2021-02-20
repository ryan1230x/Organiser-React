import { Breadcrumb, Card, Col, PageHeader, Row, Statistic } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { HomeOutlined  } from "@ant-design/icons"
import { useDispatch, useStore, useSelector } from "react-redux";
import { getClosedTickets, getClosedTicketsByNetwork, getOpenTickets } from "../actions/ticketActions";

/**
 * array of FTTH providers
 */
const network = [
  {name: "Layer4"},
  {name: "MásMóvil Direct"},
  {name: "MásMóvil NEBA"} 
]

function Home() {
  
  /**
   * init redux
   */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOpenTickets());
    dispatch(getClosedTickets());
    dispatch(getClosedTicketsByNetwork());
  }, [getClosedTickets, getOpenTickets, getClosedTicketsByNetwork]);

  /**
   * Get data from redux store
   */
  const openTickets = useSelector(state => state.tickets.openTickets);
  const closedTickets = useSelector(state => state.tickets.closedTickets); 
  const closedTicketNetwork = useSelector(state => state.tickets.closedTicketNetwork);

  /**
   * Helper function to get the length of closed ticket for a specific 
   * provider
   */
  const getClosedTicketsByNetworkLength = (network) => {
    const arr = [];
    for(const i in closedTicketNetwork){
      if (closedTicketNetwork[i] === network) {
        arr.push(closedTicketNetwork[i]);
      }
    }
    return arr.length;
  };

  /**
   * Get data from redux store
   */
  const { displayName } = useStore().getState().users.users;

  return ( 
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
         <Link to="/">
           <HomeOutlined />
          <span style={{marginLeft: 8}}>Home</span>
         </Link> 
        </Breadcrumb.Item>
      </Breadcrumb>
      <PageHeader
        title={`Hi! Welcome ${displayName}`}
        subTitle="Overview"
      />
      <section>
        <Row gutter={16} style={{background: "#f5f5f5", padding: "40px 20px 20px 20px" }}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Open Tickets"
                value={openTickets.length}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Closed Tickets"
                value={closedTickets.length}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ background: "#f5f5f5", padding: "20px 20px 40px 20px" }}>
          {network.map(networkProvider => (
            <Col span={8}>
              <Card>
                <Statistic
                  title={networkProvider.name}
                  value={getClosedTicketsByNetworkLength(networkProvider.name)}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </>
  )
}

export default Home;