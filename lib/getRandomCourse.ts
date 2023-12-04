import getAllCourses from './getAllCourses'
import { Course } from "../types"

const prevQuoteObj = {
    prev: 1,
    setPrev: function (num: number) { this.prev = num }
}

export default async function getRandomCourse(): Promise<Course> {

    const results = await getAllCourses()

    let randomIndex = prevQuoteObj.prev

    while (randomIndex === prevQuoteObj.prev) {
        randomIndex = Math.floor(Math.random() * results.length)
    }

    prevQuoteObj.setPrev(randomIndex)

    return results[randomIndex]
}