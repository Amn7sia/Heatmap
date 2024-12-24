import React from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';

const Basic = ({ commitsData }) => {

  return (
    <div id="basic">
      <HeatMap
        value={commitsData}  // Use the data directly
        startDate={new Date(commitsData[0]?.date)}
        width={600}
        legendRender={(props) => <rect {...props} y={props.y + 10} />}
        panelColors={{
          0: '#EBEDF0',
          20: '#C6E48B',
          40: '#7BC96F',
          60: '#239A3B',
          80: '#196127'
        }}
        rectRender={(props, data) => {
          return (
            <Tooltip key={props.key} placement="top" content={`count: ${data.count || 0}`}>
              <rect {...props} />
            </Tooltip>
          );
        }}
      />
    </div>
  );
};

export default Basic;
