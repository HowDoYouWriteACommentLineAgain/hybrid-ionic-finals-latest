import React, {useState } from "react";
import { OrderInfo, OrderStatus } from "../../models/Interfaces";
import { IonBadge, IonButton, IonButtons, IonCol, IonGrid, IonItem, IonItemDivider, IonLabel, IonRow } from "@ionic/react";
import { deleteOrder } from "../../service/firebaseService";

const OrderTile = (order:OrderInfo) => {
  const [expanded, expand] = useState(false);
  const handleExpand = () => {
    expand(a=>!a);
  }

  return (
    <React.Fragment>
      <IonItem>
        <IonLabel>
          <h1>{order.name}</h1>
          <IonBadge>x{order.quantity}</IonBadge>
          &nbsp;
          <IonBadge>Status: {order.status}</IonBadge>
        </IonLabel>
        <IonButton slot="end" expand="full" onClick={handleExpand}>{!expanded ? 'More' :'Less'} Info</IonButton>
        <IonButtons>
          {order.status === OrderStatus.ORDERING && (<IonButton slot="end" expand="full" routerLink={`/ordering/${order.id}`}>Order details</IonButton>)}
          {order.status === OrderStatus.PROCESSING && (<IonButton slot="end" expand="full" routerLink={`/processing/${order.id}`}>Processing detals</IonButton>)}
          {order.status === OrderStatus.SHIPPING && (<IonButton slot="end" expand="full" routerLink={`/shipping/${order.id}`}>Shipping details</IonButton>)}
        </IonButtons>
      </IonItem>
        { expanded && <>
          <IonItem>
            <IonGrid>
              <IonRow>
                <IonLabel>Delete ID: {order.id}</IonLabel>
                <IonCol><IonButton onClick={()=>deleteOrder(order.id)}>Delete</IonButton></IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItemDivider/>
        </>}
      
    </React.Fragment>
  )
}

export default OrderTile;