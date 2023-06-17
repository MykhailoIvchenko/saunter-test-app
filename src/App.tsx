import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import RoutesPage from "./pages/RoutesPage";
import ModalAddPath from "./components/ModalAddPath";
import { mapsService } from "./services/mapsServices";
import './styles/styles.scss';

const App: React.FC = () => {
  //#region Google maps API
  useEffect(() => {
    const script = mapsService.loadScript();

    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);
  //#endregion

  //#region Modal add route
  const [isModalVisible, setIsModalVisible] = useState(false);
  //#endregion

  //#region Render
  return (
    <div className='App'>
      <Header
        addClasses={'App-Header'}
        setIsModalVisible={setIsModalVisible}
      />

      <RoutesPage />

      {isModalVisible &&
        <ModalAddPath
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      }
    </div>
  );
  //#endregion
}

export default App;
