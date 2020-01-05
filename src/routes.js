import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoadingScreen from './screens/Loading'
import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import ResetPassword from './screens/ResetPassword'
import WelcomeScreen from './screens/Welcome'
import QuranScreen from './screens/Quran'
import QuranDetailScreen from './screens/QuranDetail'
import PrayerScreen from './screens/Prayer'
import MasjidScreen from './screens/Masjid'
import QiblaScreen from './screens/Qibla'
import BroadcastingScreen from './screens/Broadcasting'
import BroadcastPlayerScreen from './screens/BroadcastPlayer'
import EventScreen from './screens/Event'
import EventDetailScreen from './screens/EventDetail'


const LoginStack = createSwitchNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
  ResetPassword: ResetPassword
}, {
  headerMode: 'none',
})

const MainStack = createStackNavigator({
  Welcome: WelcomeScreen,
  Quran: QuranScreen,
  QuranDetail: QuranDetailScreen,
  Prayer: PrayerScreen,
  Masjid: MasjidScreen,
  Qibla: QiblaScreen,
  Broadcasting: BroadcastingScreen,
  BroadcastPlayer: BroadcastPlayerScreen,
  Event: EventScreen,
  EventDetail: EventDetailScreen
}, {
  headerMode: 'none',
})

const Routes = createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginStack,
      MainStack,
    },
    {
      initialRouteName: 'LoadingScreen',
    }
  )
)

export default Routes
