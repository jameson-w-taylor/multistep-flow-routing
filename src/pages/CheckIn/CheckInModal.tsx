import { useContext, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonNav, IonModal, IonContent, IonPage, useIonViewWillLeave } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

import './CheckInModal.css';

import Step1 from './Step1';
import { TripsContext } from '../../providers/TripsProvider';

const CheckInModal: React.FC = () => {
  const history = useHistory();
  const { tripID } = useParams<{ tripID: string }>();
  const { checkIn } = useContext(TripsContext);
  const reasonDismissed = useRef<string>();
  const modal = useRef<HTMLIonModalElement>(null);

  const endCheckIn = (data?: any, role?: string) => {
    reasonDismissed.current = role;
    if (reasonDismissed.current === 'user-completed-check-in') {
      console.log('Check In Complete!', data);
      checkIn(tripID);
    }
    modal.current?.dismiss(data, role);
  };

  const exitFlow = (event: CustomEvent<OverlayEventDetail>) => {
    if (reasonDismissed.current === undefined) {
      reasonDismissed.current = event.detail.role || 'uknown-reason';
    }
    if (reasonDismissed.current !== 'browser-back-button') {
      history.goBack();
    }
  }

  useEffect(() => {
    console.log('Starting check-in process');
    return () => {
      console.log(`Ending check-in process because: ${reasonDismissed.current || 'browser-back-button'}`);
    }
  }, []);

  useIonViewWillLeave(() => {
    if (reasonDismissed.current === undefined) {
      modal.current?.dismiss(null, 'browser-back-button');
    }
  });

  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen ref={modal} className="check-in" onDidDismiss={exitFlow}>
          <IonNav root={() => <Step1 endCheckIn={endCheckIn} />} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CheckInModal;