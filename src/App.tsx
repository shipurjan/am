import { Redirect, Route } from "react-router-dom";
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
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { map, settings, navigate } from "ionicons/icons";

import "./theme/index.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { SettingsTab } from "./pages/SettingsTab";
import { Tab } from "./components/Tab";
import { Map } from "./components/Map";
import { useRef } from "react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

setupIonicReact();

const App = () => {
  // eslint-disable-next-line no-undef
  const modal = useRef<HTMLIonModalElement>(null);

  function confirm() {
    modal.current?.dismiss();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    void ev;
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/map">
              <Tab title={"Map"} size={"small"}>
                <IonContent className="w-full h-full">
                  <Map />
                  <IonFab slot="fixed" vertical="bottom" horizontal="end">
                    <IonFabButton id="open-modal">
                      <IonIcon icon={navigate} size="large"></IonIcon>
                    </IonFabButton>
                  </IonFab>
                  <IonModal
                    ref={modal}
                    trigger="open-modal"
                    onWillDismiss={(ev) => onWillDismiss(ev)}
                  >
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
                      <IonItem>Hello</IonItem>
                    </IonContent>
                  </IonModal>
                </IonContent>
              </Tab>
            </Route>
            <Route exact path="/settings">
              <Tab title={"Settings"} size={"small"}>
                <SettingsTab />
              </Tab>
            </Route>
            <Route exact path="/">
              <Redirect to="/map" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="map" href="/map">
              <IonIcon aria-hidden="true" icon={map} />
              <IonLabel>Map</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon aria-hidden="true" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
