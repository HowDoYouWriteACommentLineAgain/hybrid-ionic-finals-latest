import { IonAlert, IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRange, IonTextarea, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from "@ionic/react";
import { useParams} from 'react-router-dom';
import { getOrderById, updateOrder } from "../../service/firebaseService";
import { OrderInfo, OrderStatus } from "../../models/Interfaces";
import { useState } from "react";

const ProcessingForm = () => {
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
    processingId: "",
    progress: 0,
    status: OrderStatus.PROCESSING
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

  const handleSubmit = async (status: OrderStatus) =>{
    const updated = await updateOrder({...item, status: status} as OrderInfo);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Form</IonTitle>
          <IonButton slot='end' className="ion-padding" onClick={()=>router.push('/orders')}> Go Back </IonButton>
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
            <IonTextarea 
              value={item.note || ""} 
              onIonChange={e=>setItem(i=>({...i, note:e.detail.value!}))} 
              label="Notes" 
              labelPlacement="floating"
            ></IonTextarea>
          </IonItem>
          
          <IonItem>
            <IonInput 
              value={item.processingId || ""} 
              onIonChange={e=>setItem(i=>({...i, processingId:e.detail.value!}))} 
              label="Processing Id" 
              labelPlacement="floating"
            />
          </IonItem>
          
          <IonItem>
            <IonRange 
              value={item.progress || 0} 
              // onIonChange={e=>setItem(i=>({...i, progress: e.detail.value!}))} 
              onIonChange={(e)=>setItem(i=>({...i, progress: Number(e.detail.value)}))}
              labelPlacement="stacked" 
              label="Progress"
              pin={true} pinFormatter={(value: number) => `Stage: ${value}`}
              ticks={true} snaps={true} min={0} max={10}
            ></IonRange>
          </IonItem>

          <IonItem>
            <IonList>    
              <IonButton onClick={()=>handleSubmit(OrderStatus.SHIPPING)}>Submit and Proceed to Shipping</IonButton>
              <IonButton onClick={()=>handleSubmit(OrderStatus.PROCESSING)}>Save only</IonButton>
            </IonList>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default ProcessingForm;