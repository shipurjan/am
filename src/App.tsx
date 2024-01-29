import { Redirect, Route as ReactRoute } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { map, navigate, analytics } from 'ionicons/icons';

import './theme/index.css';
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

/* Theme variables */
import './theme/variables.css';
import { Tab } from './components/Tab';
import { Map } from './components/Map';
import { useRef, useState } from 'react';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { Route } from './lib/types/types';

setupIonicReact();

const App = () => {
  // eslint-disable-next-line no-undef
  const modal = useRef<HTMLIonModalElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [route, setRoute] = useState<Route | null>(null);

  function confirm() {
    setRoute(selectedRoute);
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    void ev;
  }

  function onWillPresent() {
    const fetchRoutes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://uni-am-api.onrender.com/routes');
        const data = await response.json();
        setRoutes(data);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchRoutes();
  }

  const compareWith = (o1: Route, o2: Route) => {
    return o1.id === o2.id;
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <ReactRoute exact path="/route">
              <Tab title={'Trasa'} size={'small'}>
                <IonContent className="w-full h-full">
                  <div className="flex flex-col h-full p-2">
                    {route !== null && (
                      <div>
                        <h2 className="font-bold">
                          Trasa "{route.description}"
                        </h2>
                        <ul className="flex flex-col gap-2 pl-2">
                          {route.waypoints.map((waypoint) => (
                            <li>
                              <p className=" text-lg font-semibold">
                                {waypoint.name}
                              </p>
                              <p>{waypoint.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </IonContent>
              </Tab>
            </ReactRoute>
            <ReactRoute exact path="/map">
              <Tab title={'Map'} size={'small'}>
                <IonContent className="w-full h-full">
                  <Map route={route} />
                  <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton id="open-modal">
                      <IonIcon icon={navigate} size="large"></IonIcon>
                    </IonFabButton>
                  </IonFab>
                  <IonModal
                    ref={modal}
                    trigger="open-modal"
                    onWillPresent={() => onWillPresent()}
                    onWillDismiss={(ev) => onWillDismiss(ev)}>
                    <IonHeader>
                      <IonToolbar>
                        <IonButtons slot="start">
                          <IonButton onClick={() => modal.current?.dismiss()}>
                            Anuluj
                          </IonButton>
                        </IonButtons>
                        <IonTitle>Wybierz trasę</IonTitle>
                        <IonButtons slot="end">
                          <IonButton strong={true} onClick={() => confirm()}>
                            Zatwierdź
                          </IonButton>
                        </IonButtons>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                      <IonRadioGroup
                        value={selectedRoute?.id}
                        // @ts-expect-error no types
                        compareWith={compareWith}
                        onIonChange={(ev) =>
                          setSelectedRoute(
                            routes.find((r) => r.id === ev.detail.value) ?? null
                          )
                        }>
                        {routes.map((route) => (
                          <IonItem key={route.id}>
                            <IonRadio value={route.id}>
                              {route.description}
                            </IonRadio>
                          </IonItem>
                        ))}
                        {isLoading && <div>Ładowanie...</div>}
                        {!isLoading && routes.length === 0 && (
                          <div>
                            Brak tras - prawdopodobnie Serwis REST nie jest
                            uruchomiony
                          </div>
                        )}
                      </IonRadioGroup>
                    </IonContent>
                  </IonModal>
                </IonContent>
              </Tab>
            </ReactRoute>
            <ReactRoute exact path="/">
              <Redirect to="/map" />
            </ReactRoute>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="map" href="/map">
              <IonIcon aria-hidden="true" icon={map} />
              <IonLabel>Mapa</IonLabel>
            </IonTabButton>
            <IonTabButton tab="route" href="/route">
              <IonIcon aria-hidden="true" icon={analytics} />
              <IonLabel>Trasa</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
