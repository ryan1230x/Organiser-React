import React, { useEffect, useState } from "react";

// import components for routing
import { Link } from "react-router-dom";

// import redux and actions
import { connect } from "react-redux";
import { getTicketInformation, getOpenTickets } from "../actions/ticketActions";
import { getComments } from "../actions/commentActions";
import { 
  addTag, 
  getAllTagsForOpenTickets, 
  deleteTag, 
  getAllTags,
  getTags
} from "../actions/tagActions.js";

// Import icons
import { 
  TagsOutlined, 
  ExportOutlined,
  HomeOutlined,
  FileTextOutlined
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
    dataIndex: "client",
    sorter: (a,b) => a.client.length - b.client.length,
    onFilter: (value, record) => record.client.indexOf(value) === 0,
    
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address",
    ellipsis: true,
    render: address => (<Tooltip title={address}>{address}</Tooltip>),
    sorter: (a,b) => a.address.length - b.address.length,
    onFilter: (value, record) => record.address.indexOf(value) === 0
  },
  {
    key: "clientPackage",
    title: "Client Package",
    dataIndex: "clientPackage",
    width: 200,
    sorter: (a,b) => a.clientPackage.length - b.clientPackage.length,
    onFilter: (value, record) => record.clientPackage.indexOf(value) === 0
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
    ),
    sorter: (a,b) => a.tags.length - b.tags.length,
    onFilter: (value, record) => record.tags.indexOf(value) === 0
  },
  {
    key: "action",
    title: "Action",
    dataIndex: "action"
  }
];

function TicketTable({
    openTickets,
    comments,
    ticketInformation,
    addTag,
    deleteTag,
    getAllTagsForOpenTickets,
    getAllTags,
    tags,
    getTags,
    getOpenTickets,
    getComments,
    getTicketInformation,
    loadingTickets,
    ticketTags
}) {

  /**
  * Component state
  */
  const [isVisible, setVisible]                   = useState(false);
  const [isTagDrawerVisible, setTagDrawerVisible] = useState(false);
  const [id, setId]                               = useState("");

  const [form] = Form.useForm();

  /**
  * Once the Home page is rendered run the functions
  */
  useEffect(() => {
    getOpenTickets();
    getAllTagsForOpenTickets();
  }, [getOpenTickets, getAllTagsForOpenTickets])

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
  if (!openTickets) { 
    return (
      <section className="ticket-empty-icon">
        <Empty description="Congratulations! There are currently no pending installations" />
      </section>
    );
  }

  /**
   * Table data
   */
  const data = openTickets.map((ticket, index) => {
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
              <Link to="/">
                <HomeOutlined />
                <span style={{marginLeft: 8}}>Home</span>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <FileTextOutlined />
              <span style={{ marginLeft: 8 }}>Tickets</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <PageHeader
            title="Open Tickets"
            subTitle={`${openTickets.length} Pending Installations`}
            extra={pageheaderExtra}
          />
          <Table 
            pagination={{ 
              defaultPageSize: 50, 
              pageSizeOptions:["50", "100", "250"],
              total: openTickets.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tickets`,
              showSizeChanger:true,
              position:["bottomRight", "topRight"]
            }}
            tableLayout="fixed" 
            columns={tableColumns} 
            dataSource={data} 
          />
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
  openTickets: state.tickets.openTickets,
  ticketInformation: state.tickets.ticketInformation,
  loadingTickets: state.tickets.loading,
  tags: state.tags.tags,
  ticketTags: state.tags.ticketTags,
  users: state.users.users
});

export default connect(mapStateToProps, { 
  getOpenTickets, 
  getTicketInformation,
  getComments,
  addTag,
  getAllTagsForOpenTickets,
  getAllTags,
  deleteTag,
  getTags
})(TicketTable);
