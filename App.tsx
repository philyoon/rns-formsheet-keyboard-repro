import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';

type Routes = { Home: undefined; Sheet: undefined };
const Stack = createNativeStackNavigator<Routes>();

function Home({ navigation }: NativeStackScreenProps<Routes, 'Home'>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Open sheet" onPress={() => navigation.navigate('Sheet')} />
    </View>
  );
}

// Tall while the input is empty, short once the user types.
// Steps: open the sheet, tap the input, type one character.
// Expected: the shorter sheet rests right above the keyboard.
// Actual (Android): the sheet keeps the keyboard offset computed for the tall content,
// so the shrunken sheet (input included) stays behind the keyboard.
function Sheet() {
  const [text, setText] = useState('');
  const rows = text.length === 0 ? 12 : 2;
  return (
    <View style={{ backgroundColor: 'white' }}>
      <TextInput value={text} onChangeText={setText} placeholder="Type here" />
      {Array.from({ length: rows }, (_, i) => (
        <Text key={i} style={{ height: 48 }}>
          Row {i}
        </Text>
      ))}
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Sheet"
          component={Sheet}
          options={{
            presentation: 'formSheet',
            sheetAllowedDetents: 'fitToContents',
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
