import { useContext, useRef } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { TripsContext } from '../providers/TripsProvider';

const Trips: React.FC = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { trips } = useContext(TripsContext);
  const list = useRef<HTMLIonListElement>(null);

  const handleQuickCheckIn = (tripID: string) => {
    history.push(`${url}/${tripID}/check-in`);
    list.current?.closeSlidingItems();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Trips</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Trips</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList ref={list}>
          {Array.from(trips.entries()).map(([id, trip]) => (
            <IonItemSliding key={id} disabled={trip.isCheckedIn}>
              <IonItem routerLink={`${url}/${id}`}>
                <IonLabel>
                  {trip.label}
                </IonLabel>
                {trip.isCheckedIn === true && (<IonNote slot="end">Checked In!</IonNote>)}
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption expandable onClick={() => handleQuickCheckIn(id)}>
                  Quick Check-In
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Trips;
