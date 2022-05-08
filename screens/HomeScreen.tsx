import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import WorkoutItem from '../components/WorkoutItem';
import { MontserratText } from '../components/styled/MontserratText';
import { useWorkouts } from '../hooks/useWorkouts';

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    const workouts = useWorkouts()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>New workouts</Text>
            {/* <MontserratText
                style={{fontSize: 30}}
            >New Workouts</MontserratText> */}
            <FlatList
                data={workouts}
                keyExtractor={i => i.slug}
                renderItem={({item}) => {
                    return (
                        <Pressable
                            onPress={() => navigation.navigate(
                                'WorkoutDetail',
                                {slug: item.slug}
                            )}
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