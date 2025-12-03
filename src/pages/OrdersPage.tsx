import { IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonItem, IonItemDivider, IonList, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar, RefresherCustomEvent } from '@ionic/react';
import { add, clipboard } from 'ionicons/icons';
import OrderTile from '../components/ListTiles/OrderTile';
import * as fb from '../service/firebaseService';
import { OrderInfo, OrderStatus, /*PartStatus*/ } from '../models/Interfaces';
import React, {useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const Orders = () => {
  const location = useLocation();
  const [data, setData] = useState<OrderInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const tryLoadingData = async() => {
    setLoading(true);
    try{
      const data = await fb.getOrders();
      setData(data);
    }catch(error){
      throw new Error(`Error fetching sample: ${error}`);
    }finally{
      setLoading(false);
    }
  }

  async function handleRefresh(event: RefresherCustomEvent) {
    await tryLoadingData();
    event.detail.complete();
  }

  useEffect(()=>{
   tryLoadingData();
  },[location]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonLoading
          isOpen={loading}
          message="Loading..."
          onDidDismiss={() => setLoading(false)}
        />

        <IonList>
          {(data.length <= 0) && (<IonItem>Database is Empty</IonItem>)}
          {data
            .filter((p)=>!(p.status === OrderStatus.INACTIVE))
            .map(
              (p:OrderInfo)=>(
                <React.Fragment key={p.id}>
                  <OrderTile id={p.id} name={p.name} ETA={p.ETA} quantity={2}  status={p.status} customer={p.customer}  />  
                  <IonItemDivider/>
                </React.Fragment>
              )
            )
          }
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
