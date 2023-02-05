import { useState, type FC, useCallback } from "react"
import { Accordion } from "../../Accordion/Accordion"

import styles from "./SortAccordion.module.css"
import { Select } from "@/components/Select/Select"

const sortOptions = [
    { value: "popularity_desc", label: "Popularity Descending" },
    { value: "popularity_asc", label: "Popularity Ascending" },
    { value: "rating_desc", label: "Rating Descending" },
    { value: "rating_asc", label: "Rating Ascending" },
    { value: "release_date_desc", label: "Release Date Descending" },
    { value: "release_date_asc", label: "Release Date Ascending" },
    { value: "title_a_to_z", label: "Title (A-Z)" },
]

type SortAccordionProps  = any

export const SortAccordion: FC<SortAccordionProps> = () => {
    const [ selectedOption, setSelectedOption ] = useState<string>(sortOptions[0].value)
    
    const handleOnSelectChange = useCallback(
        (value: string) => setSelectedOption(value),
        []
    )
    return (
        <Accordion title="Sort">
            <div className={styles.content}>
                <span className="font-light">Sort Results By</span>
                <Select
                    placeholder="Select an option"
                    options={sortOptions}
                    initialValue={selectedOption}
                    onChange={handleOnSelectChange}
                />
            </div>
        </Accordion>
    )
}