import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import {useHistory, useParams} from 'react-router-dom';
import { OrderInfo, OrderStatus } from "../../models/Interfaces";
import { createOrder, getOrderById, updateOrder } from "../../service/firebaseService";

const OrderingForm = () => {
  const history = useHistory();
  const {id} = useParams<{id:string}>();
  const [status, setStatus] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [item, setItem] = useState<OrderInfo>({
    id: "",
    name: "",
    quantity: 0,
    customer: "",
    ETA: "",
    status: OrderStatus.ORDERING
  });

  const loadDataOrDefault = async()=>{
    if(!id)return;
    try {
      const found = await getOrderById(id);

      if (found) {
        setItem(found);
      }else{
        return console.warn("Record does not exists");
      }
    } catch (error) {
      console.error(`Error LoadingData on edit page for id: ${id} Error: ${error}`);
      console.error(error);
    }
  }

  const handleSubmit = async (status: OrderStatus) =>{
    const res:{result:OrderInfo | null, status:boolean} = { result:null, status:false};
    if(!id){ //Then this must be a new document
      const created = await createOrder({...item, status: status} as OrderInfo);
      res.result = created;
      res.status = true;
    }else{
      const updated = await updateOrder({...item, status: status} as OrderInfo);
      res.result = updated;
      res.status = true;
    }
    
    setAlertOpen(true);
    if(!res.result) setStatus(false);
    else setStatus(true);
  };

  useEffect(()=>{
    loadDataOrDefault();
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Form</IonTitle>
          <IonButton slot='end' className="ion-padding" routerLink="/orders"> Go Back </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={alertOpen}
          header="Success"
          message={`${status ? 'Successs ' : 'Error '} on ordering: ${item.name}`}
          buttons={['Dismiss']}
          onDidDismiss={()=>history.push('/orders')}
        ></IonAlert>
        <IonList>
          <IonItem>
            <IonInput 
              value={item?.name || ""} 
              onIonChange={e=>setItem(i=>({...i, name:e.detail.value!}))} 
              label="Name" 
              labelPlacement="floating"
            ></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput 
              value={item?.quantity || 0} 
              onIonChange={e=>setItem(i=>({...i, quantity:Number(e.detail.value!) || 0}))} 
              label="Quantity" 
              type="number" 
              labelPlacement="floating" 
              ></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput 
              value={item?.customer || ""} 
              onIonChange={e=>setItem(i=>({...i, customer:e.detail.value!}))} 
              label="Customer name" 
              labelPlacement="floating"  
              ></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput 
              value={item?.ETA || ""} 
              onIonChange={e=>setItem(i=>({...i, ETA:e.detail.value!}))} 
              label="Date to be shipped" 
              type='date' 
              labelPlacement="floating"  
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonList>    
              <IonButton onClick={()=>handleSubmit(OrderStatus.PROCESSING)}>Submit and Proceed to Processing</IonButton>
              <IonButton onClick={()=>handleSubmit(OrderStatus.ORDERING)}>Save only</IonButton>
            </IonList>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default OrderingForm;