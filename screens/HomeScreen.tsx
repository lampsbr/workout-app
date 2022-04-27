import { useEffect } from 'react';
import {View, Text, Button} from 'react-native'

export default function HomeScreen({navigation}: any) {

    useEffect(() => {
        console.log('Rendering Home Screen')
    }, []);

    return (
        <View>
            <Text>I am Home Screen</Text>
            <Button title='go to Planner' onPress={() => navigation.push('Planner')}/>
        </View>
    )
}