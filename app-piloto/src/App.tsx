import { SafeAreaView } from 'react-native-safe-area-context';

import { MyButton } from "./shared/components/MyButton";
import Login from './Login';

export default function App() {
  {/* Essa tag respeita o limite da camera nos celulares */}
  return <SafeAreaView> 
    <Login></Login>
  </SafeAreaView>
}
