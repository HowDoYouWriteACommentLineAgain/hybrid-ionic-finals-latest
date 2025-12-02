import { IonAlert, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from "@ionic/react";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { OrderInfo, OrderStatus } from "../../models/Interfaces";
import { getOrderById, updateOrder } from "../../service/firebaseService";

const ShippingForm = () => {
  const router = useIonRouter();
  const {id} = useParams<{id:string}>();
  const [success, setSuccess] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [item, setItem] = useState<OrderInfo>({
    id: "",
    name: "",
    quantity: 0,

    customer: "",
    ETA: "",
    note:"",

    trackingNumber:"",
    destination:"",
    shippedDate:"",
    status: OrderStatus.SHIPPING
  });

  const loadData = async()=>{
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

  const handleSubmit = async(status: OrderStatus) =>{
    const {id, note, processingId, progress} = item;
    const updated = await updateOrder({id, note, processingId, progress, status: status} as OrderInfo);
    setAlertOpen(true);
    if(!updated) setSuccess(false);
    else setSuccess(true);
  };

  useIonViewWillEnter(()=>{
    setSuccess(true);
    setAlertOpen(false);
    if(!id)return;// TODO: add case wherre data Should not be new
    loadData();
  });

  const dateValidAndEntered = (shippedDate:string|undefined):boolean => {
    if(shippedDate === undefined) return true;
    else if (shippedDate === "") return true;
    else return false;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton>Go Back</IonBackButton>
          </IonButtons>
          <IonTitle>Ordering Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAlert
          isOpen={alertOpen}
          header="Success"
          message={`${success ? 'Successs ' : 'Error '} on Processing: ${item.name}`}
          buttons={['Dismiss']}
          onDidDismiss={()=>success && router.push('/orders') || setAlertOpen(false)}
        ></IonAlert>
        <IonList>
          <IonItem>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Order Info</IonCardTitle>
              </IonCardHeader>
              <IonCardContent style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '1rem' }}>
                    {item.name} for {item.customer}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {`Quantity: ${item.quantity}`} | Expected on: {item.ETA}
                  </span>
                </div>
              </IonCardContent>
            </IonCard>
          </IonItem>
          <IonItem>
            <IonInput 
              value={item.trackingNumber || ""} 
              onIonChange={e=>setItem(i=>({...i, trackingNumber:e.detail.value!}))} 
              label="Tracking Number" 
              labelPlacement="floating"
            />
          </IonItem>
          
          <IonItem>
            <IonInput 
              value={item.destination || ""} 
              onIonChange={e=>setItem(i=>({...i, destination:e.detail.value!}))} 
              label="Destination" 
              labelPlacement="floating"
            />
          </IonItem>
          
          <IonItem>
              <IonInput 
              value={item.shippedDate || ""} 
              onIonChange={e=>setItem(i=>({...i, shippedDate:e.detail.value!}))} 
              label="Shipped Date" 
              type='date'
              labelPlacement="floating"
            />
          </IonItem>

          <IonItem>
            <IonList>    
              <IonButton onClick={()=>handleSubmit(OrderStatus.INACTIVE)} disabled={dateValidAndEntered(item.shippedDate)} >Submit and close ticket</IonButton>
              <IonButton onClick={()=>handleSubmit(OrderStatus.SHIPPING)}>Save only</IonButton>
            </IonList>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default ShippingForm;