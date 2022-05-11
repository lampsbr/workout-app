import { View, Text, StyleSheet, Button } from 'react-native'
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useWorkoutBySlug } from '../hooks/useWorkoutBySlug';
import { PressableText } from '../components/styled/PressableText';
import { Modal } from '../components/styled/Modal';
import { formatSec } from '../utils/time';
import { FontAwesome } from '@expo/vector-icons';
import WorkoutItem from '../components/WorkoutItem';
import { useEffect, useState } from 'react';
import { SequenceItem } from '../types/data';
import { useCountDown } from '../hooks/useCountDown';

type DetailParams = {
    route: {
        params: {
            slug: string
        }
    }
}
type Navigation = NativeStackHeaderProps & DetailParams

export default function WorkoutDetailScreen({ route }: Navigation) {
    const [sequence, setSequence] = useState<SequenceItem[]>([])
    const [trackerIdx, setStrackerIdx] = useState<number>(-1)
    const workout = useWorkoutBySlug(route.params.slug)

    const { countDown, isRunning, stop, start } = useCountDown(
        trackerIdx,
    )

    useEffect(() => {
        //consistencies so we don't run it when there's no workout or no further sequences
        if (!workout) return;
        if (trackerIdx >= workout.sequence.length - 1) return;

        if (countDown === 0) {
            addItemToSequence(trackerIdx + 1)
        }
        console.log('detail screen', countDown)
    }, [countDown])


    const addItemToSequence = (idx: number) => {
        let newSequence = []
        if (idx > 0) {
            newSequence = [...sequence, workout!.sequence[idx]]
        } else {
            newSequence = [workout!.sequence[idx]]
        }
        
        setSequence(newSequence)
        setStrackerIdx(idx)
        start(newSequence[idx].duration)
    }

    if (!workout) {
        return null
    }

    const hasReachedEnd = sequence.length === workout.sequence.length && countDown === 0

    return (
        <>
            <View style={styles.container}>
                <WorkoutItem
                    item={workout}
                    childStyles={{ marginTop: 10 }}
                >
                    <Modal
                        activator={({ handleOpen }) => (
                            <PressableText
                                onPress={handleOpen}
                                text="Check Sequence"
                            />
                        )}
                    >
                        <View>
                            {workout.sequence.map((s, i) =>
                                <View key={s.slug} style={styles.sequenceItem}>
                                    <Text >
                                        {s.name}, {s.type} | {formatSec(s.duration)}
                                    </Text>
                                    {i !== workout.sequence.length - 1 &&
                                        <FontAwesome name="arrow-down" size={20} />
                                    }
                                </View>
                            )}
                        </View>
                    </Modal>
                </WorkoutItem>
                <View style={styles.counterUI}>
                    <View style={styles.counterItem}>
                        {sequence.length === 0 ?
                            <FontAwesome
                                name="play-circle-o"
                                size={100}
                                onPress={() => addItemToSequence(0)} />
                            :
                            isRunning ?
                                <FontAwesome
                                    name="stop-circle-o"
                                    size={100}
                                    onPress={() => stop()} />
                                :
                                <FontAwesome
                                    name="play-circle-o"
                                    size={100}
                                    onPress={() => {
                                        if (hasReachedEnd) {
                                            addItemToSequence(0)
                                        } else {
                                            start(countDown)
                                        }
                                    }} />
                        }
                    </View>
                    {
                        sequence.length > 0 && countDown >= 0 &&
                        <View style={styles.counterItem}>
                            <Text style={{ fontSize: 55 }}>{countDown}</Text>
                        </View>
                    }
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 60, fontWeight: 'bold' }}>
                        {
                            sequence.length === 0 ?
                                "Prepare" :
                                hasReachedEnd ?
                                    "Great Job" :
                                    sequence[trackerIdx].name
                        }
                    </Text>
                </View>

            </View>
        </>
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
    sequenceItem: {
        alignItems: 'center'
    },
    counterUI: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
    },
    counterItem: {
        flex: 1,
        alignItems: 'center'
    }
})