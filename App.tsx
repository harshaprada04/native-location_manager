import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TabNavigator from './Navigation/TabNavigator';
import ContextProvider from './Context/ContextProvider';

function App() {
  return (
    // <SafeAreaProvider style={{flex:1}} >
    //   <SafeAreaView style={styles.container}>
 
      <TabNavigator/>
     
    //   </SafeAreaView>
    
    //  </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App
