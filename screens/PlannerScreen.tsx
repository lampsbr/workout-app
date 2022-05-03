import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useEffect } from 'react'
import {View, Text, Button} from 'react-native'

export default function PlannerScreen({navigation}: NativeStackHeaderProps) {
    
    useEffect(() => {
        console.log('Rendering Planner Screen')
        return () => console.log('unmounting planner screen')
    }, []);

    return (
        <View>
            <Text>I am PLANNER Screen</Text>
            <Button title='go to Home' onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}