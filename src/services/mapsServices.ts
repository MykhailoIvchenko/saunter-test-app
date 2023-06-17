import React, {Dispatch, SetStateAction} from "react";

const loadScript = (): HTMLScriptElement | undefined => {
  const apiScript = document.getElementById('googleApiScript');

  if (!apiScript) {
    const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    const script = document.createElement('script');
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return script;
  }
}

const getLocation = (
  setPosition: Dispatch<SetStateAction<GeolocationPosition | null>>) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const position = navigator.geolocation;

  position.getCurrentPosition(
    (geoPosition) => setPosition(geoPosition),
    () => {}, options);
}

const addWayPoint = (
  event: google.maps.MapMouseEvent,
  setWayPoints: Dispatch<SetStateAction<WayPoint[] | []>>,
  setCountPoints: Dispatch<SetStateAction<number>>
) => {
  if (window.google && event.latLng) {
    const newWaypoint = {
      location: event.latLng,
      stopover: true,
    };

    setWayPoints(prevWayPoints => [...prevWayPoints, newWaypoint]);

    setCountPoints(count => count + 1);
  }
}

const calculateDistance = (
  result: google.maps.DirectionsResult): Distance => {
  let totalDistance = 0;

  const distance = {
    meters: 0,
    kilometers: 0,
  }
  const myRoute = result.routes[0];

  if (!myRoute) {
    return distance;
  }

  for (let i = 0; i < myRoute.legs.length; i++) {
    totalDistance += myRoute.legs[i]!.distance!.value;
  }

  const distanceInKm = (totalDistance / 1000).toFixed(2);

  distance.meters = totalDistance;
  distance.kilometers = parseFloat(distanceInKm);

  return distance;
}

const showRoute = async (
  wayPoints: WayPoint[],
  directionsService: google.maps.DirectionsService | null,
  directionsRenderer: google.maps.DirectionsRenderer | null,
): Promise<boolean> => {
  try {
    const request = {
      origin: wayPoints[0].location,
      destination: wayPoints[wayPoints.length - 1].location,
      waypoints: wayPoints.slice(1, wayPoints.length - 1),
      travelMode: google.maps.TravelMode.WALKING,
    };

    if (directionsService) {
      await directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK
          && directionsRenderer) {
          directionsRenderer.setDirections(response);
        }
      });

      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

const createRouteFromDbRoute = (route: RouteForDb) => {
  try {
    const suitableRoute = route?.points?.map(point => {
      return {
        location: new google.maps.LatLng(point.lat, point.lng),
        stopover: false,
      }
    });

    return suitableRoute;
  } catch (error) {
    return undefined;
  }
}

const initMap = (
  mapRef:  React.RefObject<HTMLDivElement>,
  position: GeolocationPosition | null,
  setMap: Dispatch<google.maps.Map | null>,
  setDirectionsService:  Dispatch<google.maps.DirectionsService | null>,
  setDirectionsRenderer: Dispatch<google.maps.DirectionsRenderer | null>,
  isEditing: boolean,
  setWayPoints: Dispatch<SetStateAction<WayPoint[] | []>> | undefined,
  setDistance: Dispatch<SetStateAction<Distance>> | undefined,
): google.maps.Map | undefined => {

  if (mapRef.current) {
    const googleMap = new google.maps.Map(mapRef.current, {
      center: {
        lat: position?.coords?.latitude || 49.43891809664396,
        lng: position?.coords?.longitude || 32.06021330510769,
      },
      zoom: 10,
    });
    setMap(googleMap);

    const service = new google.maps.DirectionsService();
    setDirectionsService(service);

    const renderer = new google.maps.DirectionsRenderer({
      map: googleMap,
      draggable: isEditing,
    })
    setDirectionsRenderer(renderer);

    if (isEditing && setWayPoints && setDistance) {
      renderer.addListener('directions_changed', () => {
        const updatedDirections = renderer.getDirections();

        if (updatedDirections && updatedDirections.routes
          && updatedDirections.routes.length > 0) {
          const route = updatedDirections?.routes[0]?.legs || [];

          let newWayPoints: WayPoint[];

          const isOnePoint = (route[0].start_location
            .lat() === route[0].end_location.lat()) && (route[0]
            .start_location.lng() === route[0].end_location.lng());

          if (isOnePoint) {
            newWayPoints = [{
              location: route[0].start_location,
              stopover: false,
            }];
          } else {
            newWayPoints = ([{
              location: route[0].start_location,
              stopover: false,
            }]);

            route.forEach(point => {
              if (point.via_waypoints.length > 0) {
                point.via_waypoints.forEach(intermediatePoint =>
                  newWayPoints.push({
                    location: intermediatePoint,
                    stopover: false,
                  })
                )
              }

              newWayPoints.push({
                location: point.end_location,
                stopover: false,
              })
            })
          }

          setDistance(calculateDistance(updatedDirections));

          setWayPoints(newWayPoints);
        }
    });
    };

    return googleMap;
  };
}

export const mapsService = {
  loadScript,
  getLocation,
  addWayPoint,
  showRoute,
  createRouteFromDbRoute,
  initMap,
  calculateDistance,
};
