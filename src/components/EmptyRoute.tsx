import React from 'react';
import {Image} from 'antd';

const EmptyRoute: React.FC = () => {
  //#region Render
  return (
    <div className={'EmptyRoute'}>
      <div className={'EmptyRoute-Content'}>
        <Image
          src={'/img/route-icon.svg'}
          alt={'routes'}
          className={'EmptyRoute-Image'}
        />

        <div className={'EmptyRoute-Text'}>
          Select any path
        </div>
      </div>
    </div>
  );
  //#endregion
};

export default EmptyRoute;
