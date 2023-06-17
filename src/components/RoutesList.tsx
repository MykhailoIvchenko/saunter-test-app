import React from 'react';
import {List} from 'antd';
import RouteCard from "./RouteCard";

const RoutesList: React.FC <RoutesListProps> = ({
  addClasses= '',
  routesToDisplay,
}) => {
//#region Render
  return (
    <section className={`RoutesList ${addClasses}`}>
      <List
        dataSource={routesToDisplay}
        renderItem={(route) => (
          <List.Item key={route.id}>
            <RouteCard route={route} />
          </List.Item>
        )}
      />
    </section>
  );
  //#endregion
};

export default RoutesList;
