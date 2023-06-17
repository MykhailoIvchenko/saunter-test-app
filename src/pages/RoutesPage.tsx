import React, {useEffect, useState} from "react";
import RoutesList from "../components/RoutesList";
import RouteDetails from "../components/RouteDetails";
import {Col, Divider, Row, Input} from 'antd';
import EmptyRoute from "../components/EmptyRoute";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectRoute} from "../redux/selectedRoute/selectedRouteSlice";
import {getRoutes, selectRoutes} from "../redux/routes/routesSlice";
import Loader from "../components/Loader";
const { Search } = Input;

const RoutesPage: React.FC = () => {
  //#region Work with routes
  const selectedRoute = useAppSelector(selectRoute);
  const { routes, status } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();


  useEffect(() => {
    setRoutes();
  }, []);

  const setRoutes = () => {
    return dispatch(getRoutes());
  };

  const [routesToDisplay, setRoutesToDisplay] = useState<RouteForDb[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getRoutesToDisplay = (searchText: string): RouteForDb[] | [] => {
    const testLowerCase = searchText.toLowerCase();

    const filteredRoutes = routes.filter(route => route.title.toLowerCase()
      .includes(testLowerCase) || route.shortDescription.toLowerCase()
      .includes(testLowerCase) || route.fullDescription.toLowerCase()
      .includes(testLowerCase));

    const sortedRoutes = filteredRoutes.sort((route1, route2) => {
      if (route1?.isInFavourites) {
        return -1;
      } else if (route2.isInFavourites) {
        return 1;
      }

      return route2.dateCreating - route1.dateCreating;
    });

    return sortedRoutes;
  }

  useEffect(() => {
    setRoutesToDisplay(getRoutesToDisplay(searchQuery));
  }, [routes, searchQuery]);
  //#endregion

  //#region Render
  return (
    <main className={'HomePage'}>
      <section className={'HomePage-Content'}>
        <Row>
          <Col
            xs={{ span: 24, offset: 0, order: 1 }}
            lg={{ span: 12, offset: 0, order: 3 }}
          >
            <div className={'HomePage-Item'}>
              {selectedRoute?.id ?
                <RouteDetails
                  addClasses={'RoutesPage-RouteDetails'}
                />
                :
                <EmptyRoute />
              }
            </div>
          </Col>

          <div className={'DividerContainer HomePage-Divider'}>
            <Divider
              type={'vertical'}
              className={'Divider Divider-Vertical'}
            />
          </div>

          <Col
            xs={{ span: 24, offset: 0, order: 3 }}
            lg={{ span: 12, offset: 0, order: 1 }}
          >
            <div className={'HomePage-Item HomePage-List'}>
              <Search
                placeholder={'Search...'}
                className={'HomePage-SearchInput'}
                size='large'
                onSearch={setSearchQuery}
                allowClear
              />

              {status === 'loading' ?
                <Loader />
                :
                <RoutesList
                  addClasses={''}
                  routesToDisplay={routesToDisplay}
                />
              }
            </div>
          </Col>
        </Row>
      </section>
    </main>
  )
  //#endregion
}

export default RoutesPage;
