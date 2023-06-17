import React from 'react';
import {Divider, Modal} from "antd";
import AddPath from "./AddPath";
import { useMediaQuery } from "react-responsive";

const ModalAddPath: React.FC<ModalAddPathProps> = ({
  isModalVisible,
  setIsModalVisible,
}) => {
  //#region Breakpoint
  const isDesktop = useMediaQuery({query: '(min-width: 1600px)'})
  //#endregion

  //#region Render
  return (
    <React.Fragment>
      <Modal
        title='Add new path'
        centered
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        width={isDesktop? '70%' : '100%'}
        style={{ top: 20 }}
        footer={null}
      >
        <div className={'Divider'}>
          <Divider
            type={'horizontal'}
            className={'Divider-Horizontal'}
          />
        </div>

        <AddPath
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </React.Fragment>
  );
  //#endregion
};

export default ModalAddPath;
