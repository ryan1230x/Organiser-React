import React, { useEffect, useState } from "react";

// import components for routing
import { Link } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation, getTickets } from "../actions/ticketActions";
import { getComments } from "../actions/commentActions";
import { addTag, getTags, getAllTags, deleteTag } from "../actions/tagActions.js";

// Import icons
import { 
  TagsOutlined, 
  ExportOutlined,
  HomeOutlined
} from "@ant-design/icons";

// Import Components
import SneakPeakDrawer from "../components/Home/SneakPeakDrawer";
import TagDrawer from "../components/Home/TagDrawer";
import { 
  PageHeader, 
  Table, 
  Tag, 
  Button,
  Tooltip,
  Space,
  Empty,
  Breadcrumb,
  Form,
  Input
} from "antd";

/**
 * Table Columns
 */
const tableColumns = [
  {
    key: "client",
    title: "Client",
    dataIndex: "client"
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    ellipsis: true,
    render: address => (<Tooltip title={address}>{address}</Tooltip>)
  },
  {
    key: "client package",
    title: "Client Package",
    dataIndex: "clientPackage",
    width: 200
  },
  {
    key: "tags",
    title: "Tags",
    dataIndex: "tags",
    render: (tags) => (
      <>
        {tags.map(item => (
          <Tag
            className="ticket-table-tags"
            color={item.color} 
            key={item.tag_id}
          >
            {item.tag}
          </Tag>
        ))}
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
    ticketTags
}) {

  /**
  * Component state
  */
  const [isVisible, setVisible] = useState(false);
  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);
  const [id, setId] = useState("");
  const [query, setQuery] = useState([]);

  const [form] = Form.useForm();

  /**
  * Once the Home page is rendered run the functions
  */
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
   * filter table rows on search submit
   */
  const onSearchSubmit = (value) => {
    const filter = value.toUpperCase();
    const table = document.querySelector("table");
    const tableTr = table.querySelectorAll("tr");

    tableTr.forEach((value) => {
      const td = value.getElementsByTagName("td")[1];
      if (td) {
        const textValue = td.textContent
        textValue.toUpperCase().indexOf(filter) > -1 ? 
          value.style.display = "" : 
          value.style.display = "none"        
      }
    });
  };

  /**
   * Pageheader extra
   */
  const pageheaderExtra = [   
    <Form method="GET" form={form} key="1">
      <Form.Item name="q">
        <Input.Search
          allowClear
          onSearch={onSearchSubmit} 
          style={{ width: 300 }} 
          placeholder="search address here..."
        />
      </Form.Item>
    </Form>
  ];

  /**
   * Show empty icon when there are not tickets,
   * in other words when tickets === undefined or null
   */
  if (!tickets) { 
    return (
      <section className="ticket-empty-icon">
        <Empty description="Congratulations! There are currently no pending installations" />
      </section>
    );
  }

  /**
   * Table data
   */
  const data = tickets.map((ticket, index) => {
    const { ticketId, name, address, clientPackage, reference } = ticket;
    return {
      key: index,
      client: `${reference} - ${name}`,
      address,
      clientPackage,
      tags: tags.filter(tag => tag.ticketId === ticketId),      
      action: (
        <>
        <Space wrap size={10}>          
          <Button type="primary">
            <Link to={`/ticket/${ticketId}`}>Open Ticket</Link>
          </Button>
          <Tooltip title="Add Tag">  
            <Button 
              shape="circle" 
              icon={<TagsOutlined />} 
              onClick={() => {
                setId(ticketId);
                getTags(ticketId);
                showTagDrawer();
              }} />
          </Tooltip>
          <Tooltip title="Sneak Peak">
            <Button 
              shape="circle" 
              icon={<ExportOutlined />} 
              onClick={() => {                  
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
    }
  });

  return (
    <>
      {loadingTickets ? (
        "Loading..."
      ) : (
        <>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
              <span style={{ marginLeft: 8 }}>Home</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            title="Home Page"
            subTitle={`${tickets.length} Pending Installations`}
            extra={pageheaderExtra}
          />
          <Table tableLayout="fixed" columns={tableColumns} dataSource={data} />
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
            tags={ticketTags}
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
  tags: state.tags.tags,
  ticketTags: state.tags.ticketTags,
  users: state.users.users
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
