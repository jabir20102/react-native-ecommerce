import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';



// const AppStack = createStackNavigator({ Home: MyAccountScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  // AuthLoading: AuthLoadingScreen,
  // App: MainTabNavigator,
  // Auth: AuthStack,
  Main: MainTabNavigator,
},
  {
    // initialRouteName: 'AuthLoading',
  }
  );
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
