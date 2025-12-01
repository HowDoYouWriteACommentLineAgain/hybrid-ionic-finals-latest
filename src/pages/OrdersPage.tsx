import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {add, clipboard} from 'ionicons/icons';
import OrderTile from '../components/ListTiles/OrderTile';
import * as fb from '../service/firebaseService';
import { OrderInfo, /*PartStatus*/ } from '../models/Interfaces';
import React, { useEffect, useState } from 'react';
// import { testSamples } from '../components/ListTiles/ordersSample';

const Orders = () => {
  const [data, setData] = useState<OrderInfo[]>([]);

  const loadSampleIntoPage = async() => {
    try{
      const data = await fb.getOrders();
      setData(data);
    }catch(error){
      throw new Error(`Error fetching sample: ${error}`);
    }
  }

  useEffect(()=>{
   loadSampleIntoPage();
  },[data]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {(data.length <= 0) && (<IonItem>Database is Empty</IonItem>)}
          {data.map(
            (p:OrderInfo)=>(<React.Fragment key={p.id}>
                <OrderTile id={p.id} name={p.name} ETA={p.ETA} quantity={2}  status={p.status} customer={p.customer}  /> 
            </React.Fragment>
          ))}
        </IonList>

        <IonFab slot="fixed" horizontal='end' vertical='bottom'>
          <IonFabButton style={{"width":"80px","height":"80px"}}>
            <IonIcon icon={add} size='large'></IonIcon>
          </IonFabButton>
          <IonFabList side='top'>
            <IonFabButton routerLink='/ordering' style={{"width":"80px","height":"80px"}}>
              <IonIcon icon={clipboard} size='large'></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
