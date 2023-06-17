import { firebaseService } from "./firebaseService";
import {CollectionsNames} from "../utils/enums/enums";

const saveRouteToDb = async (
  data: any,
  points: WayPoint[],
  distance: Distance,
): Promise<RouteForDb> => {
  const routeData: RouteForDb = {
    dateCreating: Date.now(),
    fullDescription: data.fullDescription,
    distance,
    id: '',
    isInFavourites: false,
    points: points.map(point => {
      return {
        lat: point?.location.lat() || 49.44575025579104,
        lng: point?.location.lng() || 32.057479139340614,
      }
    }),
    shortDescription: data.shortDescription,
    title: data.title,
    userId: '',
  }

  const id = await firebaseService.setDocumentToCollection(CollectionsNames
    .Routes, routeData);

  return {
    ...routeData,
    id,
  }
}
const getRouteFromDb = async (id: string) => {
  const route = await firebaseService.getDocInCollection(CollectionsNames.Routes,
    id);

  return route;
}

export const routeDataService = {
  saveRouteToDb,
  getRouteFromDb,
}
