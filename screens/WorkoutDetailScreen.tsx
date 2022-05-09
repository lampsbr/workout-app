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
    
    const countDown = useCountDown(
        trackerIdx,  
        trackerIdx >= 0 ? sequence[trackerIdx].duration : -1
    )
    

    const addItemToSequence = (idx: number) => {
        setSequence([...sequence, workout!.sequence[idx]])
        setStrackerIdx(idx)
    }

    if (!workout) {
        return null
    }
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
                <View>
                    {sequence.length === 0 &&
                        <FontAwesome
                            name="play-circle-o"
                            size={100}
                            onPress={() => addItemToSequence(0)} />
                    }
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
    }
})