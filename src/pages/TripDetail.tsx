import { useContext } from 'react';
import { Redirect, useParams, useRouteMatch } from 'react-router-dom';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { TripsContext } from '../providers/TripsProvider';

const TripDetail: React.FC = () => {
  const { url } = useRouteMatch();
  const { trips } = useContext(TripsContext);
  const { tripID } = useParams<{ tripID: string }>();
  const selectedTrip = trips.get(tripID);

  if (selectedTrip === undefined) {
    return <Redirect to="/trips" />
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/trips"></IonBackButton>
          </IonButtons>
          <IonTitle>{selectedTrip.label}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{selectedTrip.label}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton disabled={selectedTrip.isCheckedIn} routerLink={`${url}/check-in`}>
          {selectedTrip.isCheckedIn ? 'Already Checked-In' : 'Check-In'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default TripDetail;
