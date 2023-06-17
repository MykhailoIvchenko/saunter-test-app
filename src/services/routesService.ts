import { firebaseService } from "./firebaseService";
import {CollectionsNames} from "../utils/enums/enums";

const getRoutesFromDb = async (): Promise<RouteForDb[] | []> => {
  try {
    const routesFromDb = await firebaseService
      .getCollection(CollectionsNames.Routes);

    return routesFromDb.map(route => ({
      dateCreating: route.dateCreating,
      distance: route.distance,
      fullDescription: route.fullDescription,
      id: route.id,
      isInFavourites: route.isInFavourites,
      points: route.points,
      shortDescription: route.shortDescription,
      title: route.title,
      userId: route.userId,
    }));
  } catch (error) {
    return [];
  }
}

const addRouteToFavourites = async (routeId: string): Promise<boolean> => {
  try {
    await firebaseService.updateFieldInDocumentInCollection(CollectionsNames
        .Routes, routeId, 'isInFavourites', true);

    return true;
  } catch (error) {
    return false;
  }
}

const deleteRoute = async (routeId: string): Promise<boolean> => {
  try {
    await firebaseService.deleteDocumentFromCollectionWithID(CollectionsNames
      .Routes, routeId);

    return true;
  } catch (error) {
    return false;
  }
}

export const routesService = { getRoutesFromDb, addRouteToFavourites, deleteRoute }
