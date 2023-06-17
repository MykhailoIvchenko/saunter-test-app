import React, {useState} from 'react';
import {Button, Form, FormInstance, Input, notification} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import {routeDataService} from "../services/routeDataServices";
import {
  selectRoutes,
  setRoutesLocally
} from "../redux/routes/routesSlice";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {setRoute} from "../redux/selectedRoute/selectedRouteSlice";
import {notificationService} from "../services/notificationsService";
const { TextArea } = Input;

const AddPathForm: React.FC <AddFormProps> = ({
  setIsModalVisible,
  points,
  distance,
  addClasses,
  setIsLoading,
}) => {
  //#region Variables and functions for route creating
  const { routes } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const [shortDescriptionLength, setShortDescriptionLength] = useState(0);

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);

    if (points.length < 2) {
      notificationService.openNotificationWithIcon('error', api,
        'Error', 'Add at least two points to create path');

      return;
    }

    try {
      const newRoute = await routeDataService.saveRouteToDb(values, points,
        distance);
      dispatch(setRoutesLocally([...routes, newRoute]));

      dispatch(setRoute(newRoute));

      setIsModalVisible(false);
    } catch (error) {
      notificationService.openNotificationWithIcon('error', api,
        'Error', 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  const calculateFieldLength = (form: FormInstance,
    fieldName: string): number => {
    return form?.getFieldValue(fieldName)?.length || 0;
  }
  //#endregion

  //#region Render
  return (
    <React.Fragment>
      {contextHolder}
      <Form
        form={form}
        layout={'vertical'}
        className={`AddPathForm ${addClasses}`}
        onFinish={handleFormSubmit}
        style={{paddingTop: 20}}
      >
        <div className={'AddPathForm-Top'}>
          <Form.Item
            name={'title'}
            label='Title'
            rules={[
              {
                required: true,
                message: 'Please, enter title',
              },
            ]}
          >
            <Input
              placeholder='Title'
            />
          </Form.Item>

          <Form.Item
            name={'shortDescription'}
            label='Short description'
            rules={[
              {
                required: true,
                message: 'Please, enter short description',
              },
            ]}
          >
            <TextArea
              rows={3}
              placeholder='Short description'
              maxLength={160}
              onChange={
                (event) => {
                  setShortDescriptionLength(calculateFieldLength(form,
                    'shortDescription'))
                }
              }
            />
          </Form.Item>

          <div className={'AddPathForm-LimitData'}>
            Limit {shortDescriptionLength} of 160
          </div>

          <Form.Item
            name={'fullDescription'}
            label='Full description'
            rules={[
              {
                required: true,
                message: 'Please, enter full description',
              },
            ]}
          >
            <TextArea
              rows={10}
              placeholder='Full description'
            />
          </Form.Item>
        </div>

        <div className={'AddPathForm-Bottom'}>
          <Form.Item>
            <div className={'AddPathForm-RouteLength'}>
              <img
                src='/img/map-icon.svg'
                alt={'map icon'}
                className={'AddPathForm-RouteLengthImage'}
              />
              <span className={'AddPathForm-RouteLengthText'}>
              Length {distance.kilometers} km
            </span>
            </div>
          </Form.Item>

          <Form.Item>
            <div className={'AddPathForm-ButtonContainer'}>
              <Button
                type='default'
                htmlType='submit'
                size={'large'}
                className={'AddPathForm-Button'}
              >
                <CheckOutlined
                  style={
                    { color: '#555555' }
                  }
                />
                Add path
              </Button>
            </div>
          </Form.Item>
        </div>
      </Form>
    </React.Fragment>
  );
  //#endregion
};

export default AddPathForm;
