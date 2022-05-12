import React, { FunctionComponent, useState } from 'react'
import { View, Text, StyleSheet, Modal as RNModal } from 'react-native'
import { PressableText } from './PressableText'

type ModalProps = {
    activator?: FunctionComponent<{
        handleOpen: () => void
    }>,
    children: FunctionComponent<{
        handleOpen: () => void,
        handleClose: () => void,
    }>

}

export function Modal({ activator: Activator, children }: ModalProps) {
    const [isModalVisible, setModalVisible] = useState(false)

    const handleOpen = () => setModalVisible(true)
    const handleClose = () => setModalVisible(false)

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
                            {children({handleOpen, handleClose})}
                        </View>
                        <PressableText
                            text="close"
                            onPress={handleClose}
                        />
                    </>
                </View>
            </RNModal>
            {Activator ?
                <Activator
                    handleOpen={handleOpen}
                />
                :
                <PressableText
                    text="Open"
                    onPress={handleOpen}
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