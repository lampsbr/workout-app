import { containsKey, getData, removeItem, storeData } from ".";
import data from '../data.json'
import { Workout } from "../types/data";

/**
 * initialize workouts storage
 */
export const initWorkouts = async (): Promise<boolean> => {
    const hasWorkouts = await containsKey('workout-data');
    if (!hasWorkouts) {
        await storeData('workout-data', data)
        return true
    }
    return false
}

export const getWorkouts = async (): Promise<Workout[]> => {
    const workouts = await getData('workout-data');
    return workouts
}

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
    const workouts = await getWorkouts();
    return workouts.filter(w => w.slug === slug)[0]
}

export const clearWorkouts = async () => {
    await removeItem('workout-data')
}

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
    const workouts = await getWorkouts();
    await storeData('workout-data', [...workouts, newWorkout])
    return true
}