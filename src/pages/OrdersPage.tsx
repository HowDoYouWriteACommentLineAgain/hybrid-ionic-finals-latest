import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {add, clipboard} from 'ionicons/icons';
import OrderTile from '../components/ListTiles/Orders';
import { shippingStatus } from '../models/Interfaces';
const Orders = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
            <OrderTile id={"abc"} name='test' ETA='12/22/2004' quantity={2}  status={shippingStatus.PROCESSING} customer='ian'  />
            <OrderTile id={"abc"} name='test' ETA='12/22/2004' quantity={2}  status={shippingStatus.PROCESSING} customer='ian'  />
        </IonList>

        <IonFab slot="fixed" horizontal='end' vertical='bottom'>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side='top'>
            <IonFabButton routerLink='/ordering'>
              <IonIcon icon={clipboard} ></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
