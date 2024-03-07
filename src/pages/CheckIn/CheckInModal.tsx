import { useContext, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IonNav, IonModal, IonContent, IonPage, useIonViewWillLeave, isPlatform } from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';

import './CheckInModal.css';

import Step1 from './Step1';
import { TripsContext } from '../../providers/TripsProvider';

let didInit = false;

const CheckInModal: React.FC = () => {
  const history = useHistory();
  const { tripID } = useParams<{ tripID: string }>();
  const { checkIn } = useContext(TripsContext);
  const reasonDismissed = useRef<string>();
  const modal = useRef<HTMLIonModalElement>(null);

  // On iOS the animations are slow/dramatic
  // So there is a brief amount of blank screen if we wait until didDismiss to navigate away
  // This doesn't seem to be an issue on Android/Web, so navigating on didDismiss is fine for those platforms
  const handleWillDismiss = (event: CustomEvent<OverlayEventDetail>) => isPlatform('ios') && exitFlow(event);
  const handleDidDismiss = (event: CustomEvent<OverlayEventDetail>) => !isPlatform('ios') && exitFlow(event);

  const endCheckIn = async (data?: any, role?: string) => {
    if (role === 'user-completed-check-in') {
      checkIn(tripID, data);
    }
    reasonDismissed.current = role;
    await modal.current?.dismiss(data, role);
  };

  const exitFlow = (event: CustomEvent<OverlayEventDetail>) => {
    if (reasonDismissed.current === undefined) {
      reasonDismissed.current = event.detail.role || 'uknown-reason';
    }

    console.log(`Ending check-in process because: ${reasonDismissed.current}`);
    // Only navigate if user has _not_ clicked the browser back button on the web platform
    if (reasonDismissed.current !== 'browser-back-button') {
      history.goBack();
    }
  }

  // Run once to log when process starts
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      console.log('Starting check-in process');
    }
  }, []);

  // On the web, the browser back button will cause this lifecycle to execute with no reason set
  // All other scenarios (modal backdrop, escape key, cancel, or complete) will have already defined this before the view will leave
  useIonViewWillLeave(() => {
    if (reasonDismissed.current === undefined) {
      modal.current?.dismiss(null, 'browser-back-button');
    }
  });

  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen ref={modal} className="check-in" onWillDismiss={handleWillDismiss} onDidDismiss={handleDidDismiss}>
          <IonNav root={() => <Step1 endCheckIn={endCheckIn} />} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default CheckInModal;