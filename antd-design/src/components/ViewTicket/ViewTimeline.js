import React from "react";
import PropTypes from "prop-types";

// Import Components
import { Timeline, Typography } from "antd";
const { Paragraph } = Typography;

function ViewTimeline({histories}) {
  return (
    <section style={{            
      marginLeft: 16,
      paddingLeft:16,
      paddingTop: histories.length < 0 ? 32 : 0, 
      borderRadius: 7             
    }}>          
      <Timeline reverse>
        {histories.map((history, index) => (
          <Timeline.Item key={index}>
            <Paragraph>
              {history.author} {history.action} at {history.addedAt}
            </Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </section>          
  )
}

ViewTimeline.propTypes = {
  histories: PropTypes.array.isRequired
}

export default ViewTimeline;