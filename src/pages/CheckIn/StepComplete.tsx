import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';

interface Props {
  endCheckIn: (data?: any, role?: string) => Promise<void>;
}

const StepComplete: React.FC<Props> = ({ endCheckIn }) => {
  const dummyData = {
    user: 'Jameson Taylor',
    doesAgreeToRegulations: true
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Check In: Final Step</IonTitle>
          <IonButtons slot="end">
            <IonButton color="medium" onClick={() => endCheckIn(null, 'user-clicked-cancel')}>
              Cancel
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton onClick={() => endCheckIn(dummyData, 'user-completed-check-in')}>
          Complete Check-In
        </IonButton>
      </IonContent>
    </>
  );
};

export default StepComplete;
