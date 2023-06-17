import React, {useState} from 'react';
import ShowMap from "./ShowMap";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectRoute, setRoute} from "../redux/selectedRoute/selectedRouteSlice";
import {Button, notification} from "antd";
import { routesService } from "../services/routesService";
import {selectRoutes, setRoutesLocally} from "../redux/routes/routesSlice";
import {notificationService} from "../services/notificationsService";
import Loader from "./Loader";

const RouteDetails: React.FC<RouteDetailsProps> = ({addClasses}) => {
  //#region Loader
  const [isLoading, setIsLoading] = useState(false);
  //#endregion

  //#region Work with route
  const { routes } = useAppSelector(selectRoutes);
  const selectedRoute = useAppSelector(selectRoute);
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const handleAddToFavouritesClick = async (routeId: string) => {
    setIsLoading(true);

    try {
      await routesService.addRouteToFavourites(routeId);

      dispatch(setRoute({
        ...selectedRoute,
        isInFavourites: true,
      }));

      dispatch(setRoutesLocally(routes.map(route => route.id === routeId ? {
        ...route,
        isInFavourites: true,
      } : route)));
    } catch (error) {
      notificationService.openNotificationWithIcon('error', api, 'Error',
        'Cannot load routes');
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveRouteClick = async (routeId: string) => {
    setIsLoading(true);

    try {
      await routesService.deleteRoute(routeId);

      dispatch(setRoutesLocally(routes.filter(route => route.id !== routeId)));
      dispatch(setRoute(null));
    } catch (error) {
      notificationService.openNotificationWithIcon('error', api, 'Error',
        'Error occured during deleting');
    } finally {
      setIsLoading(false);
    }
  }
  //#endregion

  //#region Render
  return (
    <section className={`RouteDetails ${addClasses}`}>
      {contextHolder}

      <div className={'RouteDetails-Head'}>
        <h3 className={'RouteDetails-Title'}>
          {selectedRoute?.title}
        </h3>

        <span className={'RouteDetails-Distance'}>
      {selectedRoute?.distance?.kilometers >= 1
        ? `${selectedRoute?.distance?.kilometers || 0} km`
        : `${selectedRoute?.distance?.meters || 0} m`
      }
    </span>
      </div>

      <div className={'RouteDetails-FullDescription'}>
        {selectedRoute?.fullDescription}
      </div>

      <ShowMap
        isEditing={false}
        routeFromDb={selectedRoute || undefined}
      />

        <div className={'RouteDetails-LinksContainer'}>
          {isLoading ?
            <Loader />
            :
          <>
            {!selectedRoute.isInFavourites &&
              <Button
                type={'link'}
                className={'RouteDetails-Link'}
                onClick={() => handleAddToFavouritesClick(selectedRoute.id)}
              >
                <u>
                  Add to favourites
                </u>
              </Button>
            }

            <Button
              type={'link'}
              className={'RouteDetails-Link'}
              danger
              onClick={() => handleRemoveRouteClick(selectedRoute.id)}
            >
              <u>
                Remove
              </u>
            </Button>
          </>
          }
        </div>
    </section>
  );
  //#endregion
};

export default RouteDetails;
