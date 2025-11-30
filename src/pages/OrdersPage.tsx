import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {add, clipboard} from 'ionicons/icons';
import OrderTile from '../components/ListTiles/OrderTile';
import { OrderInfo, /*PartStatus*/ } from '../models/Interfaces';
import { useEffect, useState } from 'react';
// import { testSamples } from '../components/ListTiles/ordersSample';

const Orders = () => {
  const [data, setData] = useState<OrderInfo[]>([]);

  useEffect(()=>{
   (async() => {
     try {
      const res = await fetch("/sample.json");
      const sample = await res.json();
      setData(sample);
    } catch (error) {
      throw new Error(`Error fetching sample: ${error}`);
    }
   })();
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
            {data.map((p:OrderInfo)=>(
              <OrderTile key={p.id} id={p.id} name={p.name} ETA={p.ETA.toString()} quantity={2}  status={p.status} customer={p.customer}  />  
            ))}
            {/* <OrderTile id={"abc"} name='test' ETA='12/22/2004' quantity={2}  status={PartStatus.PROCESSING} customer='ian'  /> */}
            {/* <OrderTile id={"abc"} name='test' ETA='12/22/2004' quantity={2}  status={PartStatus.PROCESSING} customer='ian'  /> */}
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
