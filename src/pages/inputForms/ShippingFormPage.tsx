import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRange, IonTextarea, IonTitle, IonToolbar } from "@ionic/react";

import {useHistory} from 'react-router-dom';

const ShippingForm = () => {
  const history = useHistory();
  const handleSubmit = () =>{ 
    history.push('/orders');
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
        <IonList>
          <IonItem>
            <IonTextarea label="Notes" labelPlacement="floating"></IonTextarea>
          </IonItem>
          
          <IonItem>
            <IonTextarea label="Materials Used" labelPlacement="floating" />
          </IonItem>
          
          <IonItem>
            <IonRange labelPlacement="stacked" label="Progress"
              pin={true} pinFormatter={(value: number) => `Stage: ${value}`}
              ticks={true} snaps={true} min={0} max={10}
            ></IonRange>
          </IonItem>
          
          <IonItem>
            <IonInput label="Shipped Date" type='date' labelPlacement="floating"  />
          </IonItem>

          <IonItem>
            <IonList>
              <IonButton onClick={handleSubmit}>Save and submit to Shipping</IonButton>
              <IonButton onClick={handleSubmit}>Save only</IonButton>
            </IonList>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default ShippingForm;