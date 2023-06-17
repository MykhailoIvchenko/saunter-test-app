import React from 'react';
import {RightOutlined, StarFilled} from "@ant-design/icons";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectRoute, setRoute} from "../redux/selectedRoute/selectedRouteSlice";

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  //#region Handle route click
  const selectedRoute = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();

  const handleRouteClick = (route: RouteForDb) => {
    dispatch(setRoute(route));

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  //#endregion

  //#region Render
  return (
    <div
      className={
        selectedRoute?.id === route?.id ? 'RouteCard RouteCard_Active'
          : 'RouteCard'
      }
      onClick={() => {handleRouteClick(route)}}
    >
      <div className={'RouteCard-ImageBlock'}>
        <img
          src={selectedRoute?.id === route?.id
            ? '/img/route-icon-contrast.svg'
            : '/img/route-icon-dark.svg'}
          alt={'arrows'}
          className={'RouteCard-Image'}
        />
      </div>

      <div className={'RouteCard-TextBlock'}>
        <div className={'RouteCard-IconWithTitle'}>
          {route.isInFavourites &&
            <StarFilled
              style={{
                color: '#0000ff'
              }}
            />
          }

          <h5 className={'RouteCard-Title'}>
            {route?.title}
          </h5>
        </div>

        <div className={'RouteCard-Description'}>
          {route?.shortDescription}
        </div>
      </div>

      <div className={'RouteCard-Distance'}>
        {route?.distance?.kilometers >= 1
          ? `${route?.distance?.kilometers || 0} km`
          : `${route?.distance?.meters || 0} m`
        }
      </div>

      <div className={'RouteCard-IconContainer'}>
        <RightOutlined
          className={'RouteCard-Icon'}
          style={{
            color: selectedRoute?.id === route?.id ? '#ffffff' : '#555555',
          }}
        />
      </div>
    </div>
  );
  //#endregion
};

export default RouteCard;
