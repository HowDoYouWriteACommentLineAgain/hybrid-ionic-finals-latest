import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonMenuButton, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
// import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
// import Navbar from './components/Navbar';
import Menu from './components/Menu';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId='main' when='always'>
        <Menu contentId='main' type='reveal'/>
        <IonPage id="main">
          <IonHeader>
            <IonToolbar>
              <IonTitle>Rico Hobby Electronics</IonTitle>
              <IonMenuButton  slot='start' />
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonRouterOutlet>
              <Route path="/order" exact >Ordering</Route>
              <Route path="/processing" exact >Processing</Route>
              <Route path="/shipping" exact >Shipping</Route>
              <Redirect exact from="/" to ="/inventory" />
            </IonRouterOutlet>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
