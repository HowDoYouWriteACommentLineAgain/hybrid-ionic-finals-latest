import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import {useHistory} from 'react-router-dom';

const OrderingForm = () => {
  const history = useHistory();
  const handleSubmit = () =>{ 
    history.push('/orders');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ordering Form</IonTitle>
          <IonButton slot='end' className="ion-padding" routerLink="/orders"> Go Back </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonInput label="Name" labelPlacement="floating"></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput label="Quantity" type="number" labelPlacement="floating"  ></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput label="Customer name" labelPlacement="floating"  ></IonInput>
          </IonItem>
          
          <IonItem>
            <IonInput label="Date to be shipped" type='date' labelPlacement="floating"  ></IonInput>
          </IonItem>

          <IonItem>
            <IonList>    
              <IonButton onClick={handleSubmit}>Save and submit to Processing</IonButton>
            </IonList>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default OrderingForm;