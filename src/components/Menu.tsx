import { IonContent, IonHeader, IonItem, IonList, IonMenu, IonMenuToggle, IonTitle, IonToolbar } from "@ionic/react";
interface prop {
  contentId?: string,
  type?: "overlay" | "push" | "reveal"
}
const Menu = (p:prop) => {
    return (
      <IonMenu contentId={p.contentId} type={p.type}>
        <IonHeader>
          <IonToolbar>
            <IonTitle> Menu this?</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem routerLink="/ordering" >Ordering</IonItem>
              <IonItem routerLink="/processing" >Processing</IonItem>
              <IonItem routerLink="/shipping">Shipping</IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>
    );
}

export default Menu;