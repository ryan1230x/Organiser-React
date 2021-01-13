import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation, getTickets } from "../actions/ticketActions";
import { getComments } from "../actions/commentActions";
import { addTag, getTags, getAllTags, deleteTag } from "../actions/tagActions.js";

// Import icons
import { 
  TagsOutlined, 
  ExportOutlined 
} from "@ant-design/icons";

// Import Components
import { 
  PageHeader, 
  Table, 
  Tag, 
  Button,
  Tooltip,
  Space,
} from "antd";
import SneakPeakDrawer from "../components/Home/SneakPeakDrawer";
import TagDrawer from "../components/Home/TagDrawer";

/**
 * Table Columns
 */
const tableColumns = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name"
  },
  {
    key: "address",
    title: "Address",
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
    render: (status) => (<strong>{status}</strong>)
  },
  {
    key: "tags",
    title: "Tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map((item, index) => {
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
];

function Home({
    tickets,
    comments,
    ticketInformation,
    addTag,
    getTags,
    deleteTag,
    getAllTags,
    tags,
    getTickets,
    getComments,
    getTicketInformation,
    loadingTickets,
}) {

  const [isVisible, setVisible] = useState(false);
  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);
  const [id, setId] = useState("");
  
  useEffect(() => {
    getTickets();
    getAllTags();
  }, [getTickets])

  /**
   * Drawer functions
   */
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showTagDrawer = () => {
    setTagDrawerVisible(true);
  };

  const onCloseTagDrawer = () => {
    setTagDrawerVisible(false);
  };

  /**
   * Table data
   */
  const data = tickets.map((ticket, index) => {
    const { 
      ticketId, 
      name, 
      address, 
      status, 
      network, 
      clientPackage,
      tags
    } = ticket;
    
    return {
      key: index,
      name,
      address,
      package: clientPackage,
      network,
      tags: [status],
      status: status,
      action: (
        <>
        <Space wrap size={10}>          
          <Button type="primary">
            <Link to={`/ticket/${ticketId}`}>Open Ticket</Link>
          </Button>
          <Tooltip title="Add Tag">  
            <Button shape="circle" icon={<TagsOutlined />} onClick={() => {
              setId(ticketId);
              getTags(ticketId);
              showTagDrawer();
            }} />
          </Tooltip>
          <Tooltip title="Sneak Peak">
            <Button shape="circle" icon={<ExportOutlined />} onClick={() => {
              setId(ticketId);              
              showDrawer();
              getTags(ticketId);
              getTicketInformation(ticketId);
              getComments(ticketId);
            }} />
          </Tooltip>
        </Space>
        </>
      )
    };
  });

  return (
    <>
      {loadingTickets ? (
        "Loading..."
      ) : (
        <>
          <PageHeader
            title="Home Page"
            subTitle={`${tickets.length} Pending Installations`}
          />
          <Table columns={tableColumns} dataSource={data} />
          <SneakPeakDrawer 
            closable={false} 
            onClose={onClose} 
            visible={isVisible}            
            ticketId={id}
            ticketInformation={ticketInformation}
            comments={comments}
          />
          <TagDrawer
            handleAddTag={addTag}
            handleDeleteTag={deleteTag}
            tags={tags}
            closable={false}
            onClose={onCloseTagDrawer}
            visible={isTagDrawerVisible}
            ticketId={id}
          />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
  tickets: state.tickets.tickets,
  ticketInformation: state.tickets.ticketInformation,
  loadingTickets: state.tickets.loading,
  tags: state.tags.tags
});

export default connect(mapStateToProps, { 
  getTickets, 
  getTicketInformation,
  getComments,
  addTag,
  getTags,
  deleteTag,
  getAllTags
})(Home);
