import { useEffect, useState, useRef } from "react";

/**
 * Teacher's logic for this hook is ugly AF, sorry
 * @param idx 
 * @param initialCount 
 * @returns 
 */
export function useCountDown (
    idx: number,
    initialCount: number = -1
) {
    const intervalRef = useRef<number>()
    const [countDown, setCountDown] = useState(initialCount)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        if(idx === -1 ) return;
        
        if(isRunning && !intervalRef.current){
            intervalRef.current = window.setInterval(() => {
                setCountDown(c => {
                    // console.log(c)
                    return c-1
                })
            }, 1000)
        }

        return cleanUp
    }, [idx, isRunning])

    useEffect(() => {
        setCountDown(initialCount)
    }, [initialCount])

    useEffect(() => {
        if(countDown === 0){
            cleanUp()
        }

    }, [countDown])

    const cleanUp = () => {
        if(intervalRef.current){
            setIsRunning(false)
            window.clearInterval(intervalRef.current)
            intervalRef.current = undefined
        }
    }

    return {
        countDown,
        isRunning,
        stop: cleanUp,
        start: (count?: number) => {
            setCountDown(count ?? initialCount)
            setIsRunning(true)
        }
    };
}