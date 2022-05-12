import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import slugify from 'slugify';
import ExerciseForm, { ExerciseFormData } from '../components/ExerciseForm';
import ExerciseItem from '../components/ExerciseItem';
import { PressableText } from '../components/styled/PressableText';
import { SequenceItem, SequenceType } from '../types/data';

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
    const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>([])

    const handleFormSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItem = {
            slug: slugify(form.name + '-' +Date.now(), {lower: true}),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        }
        if (form.reps)
            sequenceItem.reps = Number(form.reps)

        setSequenceItems([...sequenceItems, sequenceItem])
    }


    return (
        <View style={styles.container}>
            <FlatList 
                data={sequenceItems}
                keyExtractor={i => i.slug}
                renderItem={({item, index}) => 
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
            <ExerciseForm onSubmit={handleFormSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    }
})