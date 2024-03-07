import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonNavLink, IonTitle, IonToolbar } from '@ionic/react';

import StepComplete from './StepComplete';

interface Props {
  endCheckIn: (data?: any, role?: string) => void;
}

const Step2: React.FC<Props> = ({ endCheckIn }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Check In: Step 2</IonTitle>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={() => endCheckIn(null, 'user-clicked-cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Check In: Step 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonNavLink routerDirection="forward" component={() => <StepComplete endCheckIn={endCheckIn} />}>
          <IonButton>
            Next Step
          </IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
};

export default Step2;
