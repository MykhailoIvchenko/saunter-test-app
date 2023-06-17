import React from 'react';
import { Button } from 'antd';

const Header: React.FC <HeaderProps> = ({
  addClasses = '',
  setIsModalVisible,
}) => {
  //#region Render
  return (
    <header className={`Header ${addClasses}`}>
      <div className={'Header-Content'}>
        <div className={'Header-Left'}>
          <img
            src={'/img/route-icon-dark.svg'}
            className='Header-Logo'
            alt='logo'
          />

          <span className={'Header-AppName'}>
            Saunter
          </span>
        </div>

        <div className={'Header-Right'}>
          <Button
            type={'primary'}
            className={'Header-Button'}
            onClick={() => setIsModalVisible(true)}
          >
            Add path
          </Button>
        </div>
      </div>
    </header>
  );
  //#endregion
}

export default Header;
