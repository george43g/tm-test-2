import { useState, type FC, useCallback, ChangeEvent, useEffect } from "react"
import { Accordion } from "../../Accordion/Accordion"

import styles from "./FilterAccordion.module.css"
import { Select } from "@/components/Select/Select"

const sortOptions = [
    { value: "0", label: "All" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
]

export type Value = {
    movieTitle?: string
    movieRating?: number
    movieReleaseDate?: string,
}

type FilterAccordionProps  = {
    initialValues?: Value
    onChange: (data: Value) => void
}

let timeout: ReturnType<typeof setTimeout> | null
const DEBOUNCE_TIME = 400


export const FilterAccordion: FC<FilterAccordionProps> = ({ initialValues = {}, onChange }) => {
    const {
        movieTitle,
        movieRating,
        movieReleaseDate
    } = initialValues
    const initialRating = movieRating ? `${movieRating}` : sortOptions[0].value
    const [ rating, setRating ] = useState(initialRating)
    const [ title, setTitle ] = useState( movieTitle ?? "")
    const [ releaseDate, setReleaseDate ] = useState( movieReleaseDate ?? "")
    
    const handleOnSelectChange = useCallback(
        (value: string) => setRating(value),
        []
    )

    const handleReleaseDateChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setReleaseDate(event.target.value),
        []
    )

    const handleTitleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value),
        []
    )

    useEffect(
        () => {
            if (timeout) {
                clearTimeout(timeout)
            }
            const data = {
                movieTitle: title,
                movieRating: +rating,
                movieReleaseDate: releaseDate,
            }
            timeout = setTimeout(() => {
                timeout = null
                onChange(data)
            }, DEBOUNCE_TIME)
        },
        [rating, title, releaseDate]
    )

    return (
        <Accordion title="Filters">
            <div className={styles.content}>
                <span>Rating</span>
                <Select
                    placeholder="Select an option"
                    options={sortOptions}
                    initialValue={rating}
                    onChange={handleOnSelectChange}
                />
            </div>
            <div className={styles.content}>
                <span>Release Date</span>
                <input
                    type="date"
                    className={styles.input}
                    onChange={handleReleaseDateChange}
                    value={releaseDate}
                />
            </div>
            <div className={styles.content}>
                <span>Movie Title</span>
                <input
                    type="text"
                    className={styles.input}
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
        </Accordion>
    )
}