import React, { FunctionComponent, useState } from 'react'
import { View, Text, StyleSheet, Modal as RNModal } from 'react-native'
import { PressableText } from './PressableText'

type ModalProps = {
    activator?: FunctionComponent<{
        handleOpen: () => void
    }>,
    children: React.ReactNode

}

export function Modal({ activator: Activator, children }: ModalProps) {
    const [isModalVisible, setModalVisible] = useState(false)
    return (
        <>
            <RNModal
                visible={isModalVisible}
                transparent={false}
                animationType="fade"
            >
                <View style={styles.centerView}>
                    <>
                        <View style={styles.contentView}>
                            {children}
                        </View>
                        <PressableText
                            text="close"
                            onPress={() => setModalVisible(false)}
                        />
                    </>
                </View>
            </RNModal>
            {Activator ?
                <Activator
                    handleOpen={() => setModalVisible(true)}
                />
                :
                <PressableText
                    text="Open"
                    onPress={() => setModalVisible(true)}
                />
            }
        </>
    )
}

const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentView: {
        marginBottom: 20
    }
})