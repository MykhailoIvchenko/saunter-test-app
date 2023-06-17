interface RoutesState {
  routes: RouteForDb[] | [];
  status: 'idle' | 'loading' | 'failed';
}

type WayPoint = {
  location: google.maps.LatLng,
  stopover: boolean,
}

type WayPointForDb = {
  lat: number,
  lng: number,
}

type RouteForDb = {
  dateCreating: number,
  distance: Distance,
  fullDescription: string,
  id: string,
  isInFavourites: boolean,
  points: WayPointForDb[] | [],
  shortDescription: '',
  title: string,
  userId: string,
}

type Distance = {
  meters: number,
  kilometers: number,
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type HeaderProps = {
  addClasses: string,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

type RoutesListProps = {
  addClasses: string,
  routesToDisplay: RouteForDb[] | [],
}

type RouteCardProps = {
  route: RouteForDb,
}

type RouteDetailsProps = {
  addClasses: string,
}

type ModalAddPathProps = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  isModalVisible: boolean,
}

type AddPathProps = {
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

type AddFormProps = {
  addClasses: string,
  distance: Distance,
  points: WayPoint[] | [],
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
};

type MapEditingProps = {
  isEditing: boolean,
  routeFromDb?: RouteForDb | undefined,
  setDistance?: React.Dispatch<React.SetStateAction<Distance>>,
  wayPoints?: WayPoint[],
  setWayPoints?: React.Dispatch<React.SetStateAction<WayPoint[] | []>>,
}

type ErrorBoundaryProps = {
  children: React.ReactNode;
}

type ErrorBoundaryState = {
  hasError: boolean;
  error: ErrorEvent | null;
  errorInfo: string | null;
}
