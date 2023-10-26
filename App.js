import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import VIForegroundService from '@voximplant/react-native-foreground-service';
const App = async () => {
  const channelConfig = {
    id: 'myNotificationChannel',
    name: 'My Notification Channel',
    description: 'Call detector',
    importance: 1,
    enableVibration: true,
  };
  await VIForegroundService.getInstance().createNotificationChannel(
    channelConfig,
  );
  async function startForegroundService() {
    const notificationConfig = {
      channelId: 'myNotificationChannel',
      id: 3456,
      title: 'my calls notification',
      text: 'Some text',
      icon: 'ic_icon',
      // button: 'Some text',
      priority: 'PRIORITY_HIGH',
    };
    try {
      await VIForegroundService.getInstance().startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    startForegroundService();
    const callDetector = new CallDetectorManager(
      (event, phoneNumber) => {
        if (event === 'Disconnected') {
          console.log('Disconnected call from:', phoneNumber, event);
          // Handle Disconnected event
        } else if (event === 'Connected') {
          console.log('Connected call from:', phoneNumber, event);
          // Handle Connected event
        } else if (event === 'Incoming') {
          console.log('Incoming call from:', phoneNumber, event);
          // Handle Incoming event
        } else if (event === 'Dialing') {
          console.log('Dialing call from:', phoneNumber, event);
          // Handle Dialing event
        } else if (event === 'Offhook') {
          console.log('Offhook call from:', phoneNumber, event);
          // Handle Offhook event
        } else if (event === 'Missed') {
          console.log('Missed call from:', phoneNumber, event);
        }
      },
      true,
      () => {},
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    );

    return () => {
      callDetector && callDetector.dispose();
    };
  }, []);

  return (
    <View>
      <Text>Main file</Text>
    </View>
  );
};

export default App;
