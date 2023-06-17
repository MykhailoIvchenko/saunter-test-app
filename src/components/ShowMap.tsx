import React, {useEffect, useState, useRef} from 'react';
import {mapsService} from "../services/mapsServices";
import {notification} from "antd";
import {notificationService} from "../services/notificationsService";

const ShowMap: React.FC <MapEditingProps> = ({
  isEditing,
  routeFromDb,
  setDistance,
  wayPoints,
  setWayPoints
}) => {
  //#region Variables to work with map
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService]
    = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer]
    = useState<google.maps.DirectionsRenderer | null>(null);
  const [countPoints, setCountPoints] = useState<number>(0);
  const [api, contextHolder] = notification.useNotification();
  //#endregion

  //#region Init and show map
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    mapsService.getLocation(setPosition);
  }, []);

  useEffect(() => {
    if (!window.google) {
      notificationService.openNotificationWithIcon('error', api, 'Error',
        'Google Maps JavaScript API is not loaded');
    } else {
      const map = mapsService.initMap(mapRef, position, setMap,
        setDirectionsService, setDirectionsRenderer, isEditing, setWayPoints,
        setDistance);

      if (isEditing && setWayPoints) {
        map?.addListener('click', (event: any) => mapsService.addWayPoint(event,
          setWayPoints, setCountPoints));
      }
    };
  }, [position]);

  useEffect(() => {
    if (window.google && routeFromDb && map) {
      const createdPoints = mapsService.createRouteFromDbRoute(routeFromDb) || [];

      if (createdPoints?.length > 0) {
          mapsService.showRoute(createdPoints, directionsService,
            directionsRenderer).then(result => {
              if (!result) {
                notificationService.openNotificationWithIcon('error', api,
                  'Error', 'Cannot build route');
              }
            });
      }
    }
  }, [routeFromDb, map]);

  useEffect(() => {
    if (isEditing && wayPoints && wayPoints.length > 0) {
      mapsService.showRoute(wayPoints, directionsService, directionsRenderer)
        .then(result => {
          if (!result) {
            notificationService.openNotificationWithIcon('error', api,
              'Error', 'Cannot build route');
          }
      });
    }
  }, [countPoints]);
  //#endregion

  //#region Render
  return (
    <React.Fragment>
      {contextHolder}

      <div
        ref={mapRef}
        className={isEditing ? 'ShowMap' : 'ShowMap ShowMap_Small'}
      >
      </div>
    </React.Fragment>
  );
  //#endregion
};

export default ShowMap;
