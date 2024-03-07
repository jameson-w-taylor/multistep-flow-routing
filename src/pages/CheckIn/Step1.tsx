import { IonButton, IonButtons, IonContent, IonHeader, IonNavLink, IonTitle, IonToolbar } from '@ionic/react';

import Step2 from './Step2';

interface Props {
  endCheckIn: (data?: any, role?: string) => Promise<void>;
}

const Step1: React.FC<Props> = ({ endCheckIn }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Check In: Step 1</IonTitle>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={() => endCheckIn(null, 'user-clicked-cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonNavLink routerDirection="forward" component={() => <Step2 endCheckIn={endCheckIn} />}>
          <IonButton>
            Next Step
          </IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
};

export default Step1;
