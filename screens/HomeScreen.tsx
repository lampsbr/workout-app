import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import data from '../data.json'
import { Workout } from '../types/data';
import WorkoutItem from '../components/WorkoutItem';
import { MontserratText } from '../components/styled/MontserratText';

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>New workouts</Text>
            {/* <MontserratText
                style={{fontSize: 30}}
            >New Workouts</MontserratText> */}
            <FlatList
                data={data as Workout[]}
                keyExtractor={i => i.slug}
                renderItem={({item}) => {
                    return (
                        <Pressable
                            onPress={() => alert(`pressed = ${item.name}`)}
                        >
                            <WorkoutItem item={item} />
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: '2rem',
        flex: 1,
    }, 
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: "monstserrat-bold"
    },
})