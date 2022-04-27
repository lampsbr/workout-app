import { useEffect } from 'react'
import {View, Text, Button} from 'react-native'

export default function PlannerScreen({navigation}: any) {
    
    useEffect(() => {
        console.log('Rendering Planner Screen')
    }, []);

    return (
        <View>
            <Text>I am PLANNER Screen</Text>
            <Button title='go to Home' onPress={() => navigation.push('Home')}/>
        </View>
    )
}