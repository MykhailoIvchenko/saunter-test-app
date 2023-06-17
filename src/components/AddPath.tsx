import React, {useState} from 'react';
import {Col, Divider, Row} from "antd";
import ShowMap from "./ShowMap";
import AddPathForm from "./AddPathForm";
import Loader from "./Loader";

const AddPath: React.FC <AddPathProps> = ({ setIsModalVisible }) => {
  //#region Variables for path
  const [wayPoints, setWayPoints] = useState<WayPoint[] | []>([]);
  const [distance, setDistance] = useState<Distance>({
    meters: 0,
    kilometers: 0,
  });
  //#endregion

  //#region Loader
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region Render
  return (
    <div className={'AddPath'}>
      {isLoading ?
        <div className={'AddPath-Loader'}>
          <Loader />
        </div>
        :
        <Row>
        <Col
          xs={{ span: 24, offset: 0, order: 1 }}
          lg={{ span: 12, offset: 0, order: 3 }}
        >
          <div className={'MapContainer AddPath-MapContainer'}>
            <div className={'MapContainer-Plate Plate'}>
              <img
                src={'/img/marker-icon.svg'}
                alt={'Marker icon'}
                className={'Plate-Icon'}
              />

              <span>Add marker</span>
            </div>

            <ShowMap
              wayPoints={wayPoints}
              isEditing={true}
              setDistance={setDistance}
              setWayPoints={setWayPoints}
            />
          </div>
        </Col>

        <div className={'DividerContainer AddPath-Divider'}>
          <Divider
            type={'vertical'}
            className={'Divider Divider-Vertical'}
          />
        </div>

        <Col
          xs={{ span: 24, offset: 0, order: 3 }}
          lg={{ span: 12, offset: 0, order: 1 }}
        >
          <AddPathForm
            addClasses={'AddPath-AddPathForm'}
            distance={distance}
            points={wayPoints}
            setIsLoading={setIsLoading}
            setIsModalVisible={setIsModalVisible}
          />
        </Col>
      </Row>
      }
    </div>
  );
  //#endregion
};

export default AddPath;
