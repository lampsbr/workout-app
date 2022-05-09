import { useEffect, useState, useRef } from "react";

/**
 * Teacher's logic for this hook is ugly AF, sorry
 * @param idx 
 * @param initialCount 
 * @returns 
 */
export function useCountDown (
    idx: number,
    initialCount: number
) {
    const intervalRef = useRef<number>()
    const [countDown, setCountDown] = useState(initialCount)

    useEffect(() => {
        if(idx === -1 ) return;
        
        intervalRef.current = window.setInterval(() => {
            setCountDown(c => {
                console.log(c)
                return c-1
            })
        }, 100)

        return cleanUp
    }, [idx])

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
            window.clearInterval(intervalRef.current)
            intervalRef.current = undefined
        }
    }

    return countDown;
}