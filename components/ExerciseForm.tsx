import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { PressableText } from "./styled/PressableText";
import { useForm, Controller } from "react-hook-form";


export type ExerciseFormData = {
    name: string,
    duration: string,
    reps?: string,
    type: string,
}

type WorkoutProps = {
    onSubmit: (form: ExerciseFormData) => void
}

const selectionItems = ['Exercise', 'Break', 'Stretch']

export default function ExerciseForm({ onSubmit }: WorkoutProps) {
    const { control, handleSubmit } = useForm()
    const [isSelectionOn, setSelectionOn] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="name"
                    render={({ field: { onChange, value } }) => <TextInput
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Name"
                    />}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="duration"
                    render={({ field: { onChange, value } }) => <TextInput
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Duration"
                    />}
                />
            </View>
            <View style={styles.rowContainer}>
                <Controller
                    control={control}
                    rules={{
                        required: false
                    }}
                    name="reps"
                    render={({ field: { onChange, value } }) => <TextInput
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                        placeholder="Repetitions"
                    />}
                />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    name="type"
                    render={({ field: { onChange, value } }) =>
                        <View style={{ flex: 1 }}>
                            {isSelectionOn ?
                                <View>
                                    {selectionItems.map(i => <PressableText
                                        style={styles.selection}
                                        key={i}
                                        text={i}
                                        onPressIn={() => {
                                            setSelectionOn(false)
                                            onChange(i)
                                        }} />
                                    )}
                                </View>
                                :
                                <View>
                                    <TextInput
                                        onPressIn={() => { console.log(isSelectionOn); setSelectionOn(true) }}
                                        value={value}
                                        style={styles.input}
                                        placeholder="Type"
                                    />
                                    <PressableText text="Change" onPress={() => setSelectionOn(true)} />
                                </View>
                            }
                        </View>
                    }
                />
            </View>
            <View>
                <PressableText
                    text="Add"
                    onPress={handleSubmit((data) => {
                        onSubmit(data as ExerciseFormData)
                    })}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    input: {
        flex: 1,
        height: 30,
        margin: 2,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.4)',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    selection: {
        margin: 2,
        padding: 3,
        alignSelf: 'center'
    }
})