import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { ReactNode } from 'react';

export type TabProps = {
  title: string;
  size: 'small' | 'large';
  children: ReactNode;
};
export const Tab = ({ title, size, children }: TabProps) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size={size}>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {children}
    </IonContent>
  </IonPage>
);
