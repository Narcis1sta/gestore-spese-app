import {Tabs} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import {Platform,View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '../../src/ui';

export default function Layout() {
  const insets = useSafeAreaInsets();
  const bottomSpace = Platform.OS === 'android' ? Math.max(insets.bottom, 32) : insets.bottom;
  return (
    <Tabs
      tabBar={(props) => (
        <View style={{backgroundColor:'#FFFFFF', paddingBottom:bottomSpace}}>
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: '#8991A3',
        tabBarStyle: {height:72, paddingBottom:8, paddingTop:8, backgroundColor:'#FFFFFF'},
        tabBarLabelStyle: {fontWeight:'700'},
      }}
    >
      <Tabs.Screen name="index" options={{title:'Home',tabBarIcon:({color,size})=><Ionicons name="home" color={color} size={size}/>}}/>
      <Tabs.Screen name="movimenti" options={{title:'Movimenti',tabBarIcon:({color,size})=><Ionicons name="list" color={color} size={size}/>}}/>
      <Tabs.Screen name="statistiche" options={{title:'Statistiche',tabBarIcon:({color,size})=><Ionicons name="pie-chart" color={color} size={size}/>}}/>
      <Tabs.Screen name="impostazioni" options={{title:'Impostazioni',tabBarIcon:({color,size})=><Ionicons name="settings" color={color} size={size}/>}}/>
    </Tabs>
  );
}
