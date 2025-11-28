import React, { useState } from "react";
import { OrderInfo } from "../../models/Interfaces";
import { IonBadge, IonButton, IonButtons, IonCol, IonGrid, IonItem, IonItemDivider, IonLabel, IonRow } from "@ionic/react";

const OrderTile = (order:OrderInfo) => {
  const [expanded, expand] = useState(false);

  const handleExpand = () => {
    expand(a=>!a);
  }
  return (
    <React.Fragment key={order.id}>
      <IonItem>
        <IonLabel>
          <h1>{order.name}</h1>
          <IonBadge>x{order.quantity}</IonBadge>
          &nbsp;
          <IonBadge>Status: {order.status}</IonBadge>
        </IonLabel>
        <IonButton slot="end" expand="full" onClick={handleExpand}>More Info</IonButton>
        <IonButtons>
          <IonButton slot="end" expand="full" routerLink={`/processing/${order.id}`}>Order</IonButton>
          <IonButton slot="end" expand="full" routerLink={`/processing/${order.id}`}>Processing</IonButton>
          <IonButton slot="end" expand="full" routerLink={`/processing/${order.id}`}>Shipping</IonButton>
        </IonButtons>
      </IonItem>
        { expanded && <>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol><IonLabel>test</IonLabel></IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItemDivider/>
        </>}
      
    </React.Fragment>
  )
}

export default OrderTile;