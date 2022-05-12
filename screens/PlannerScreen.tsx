import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import slugify from 'slugify';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import ExerciseItem from '../components/ExerciseItem';
import { Modal } from '../components/styled/Modal';
import { PressableText } from '../components/styled/PressableText';
import WorkoutForm, { WorkoutFormData } from '../components/WorkoutForm';
import { storeWorkout } from '../storage/workout';
import { SequenceItem, SequenceType, Workout } from '../types/data';

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
    const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([])

    const handleExerciseSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItem = {
            slug: slugify(form.name + '-' + Date.now(), { lower: true }),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        }
        if (form.reps)
            sequenceItem.reps = Number(form.reps)

        setSequenceItems([...sequenceItems, sequenceItem])
    }

    const computeDifficulty = (exercisesCount: number, workoutDuration: number) => {
        const intensity = workoutDuration / exercisesCount
        if (intensity <= 60) {
            return 'hard'
        }
        if (intensity <= 100) {
            return 'normal'
        }
        return 'easy'

    }

    const handleWorkoutSubmit = async (form: WorkoutFormData) => {
        if (sequenceItems.length > 0) {
            const duration = sequenceItems.reduce((acc, item) => acc + item.duration, 0)
            const workout: Workout = {
                name: form.name,
                slug: slugify(form.name + '-' + Date.now(), { lower: true }),
                difficulty: computeDifficulty(sequenceItems.length, duration),
                sequence: [...sequenceItems],
                duration
            }
            storeWorkout(workout)
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={sequenceItems}
                keyExtractor={i => i.slug}
                renderItem={({ item, index }) =>
                    <ExerciseItem item={item}>
                        <PressableText
                            text='Remove'
                            onPress={() => {
                                const items = [...sequenceItems]
                                items.splice(index, 1)
                                setSequenceItems(items)
                            }}
                        />
                    </ExerciseItem>
                }
            />
            <ExerciseForm onSubmit={handleExerciseSubmit} />
            <View>
                <Modal
                    activator={({ handleOpen }) => <PressableText
                        style={{ marginTop: 15 }}
                        text="Create Workout"
                        onPress={handleOpen}
                    />}
                >
                    {
                        ({handleClose}) =>
                            <View>
                                <WorkoutForm onSubmit={async (data) => {
                                    await handleWorkoutSubmit(data)
                                    handleClose()
                                    
                                    navigation.navigate('Home')
                                }} />
                            </View>
                    }
                </Modal>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
})