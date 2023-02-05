import { useState, type FC, useCallback } from "react"
import { Accordion } from "../../Accordion/Accordion"

import styles from "./FilterAccordion.module.css"
import { Select } from "@/components/Select/Select"

const sortOptions = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
]

type FilterAccordionProps  = any

export const FilterAccordion: FC<FilterAccordionProps> = () => {
    const [ selectedOption, setSelectedOption ] = useState<string>(sortOptions[0].value)
    
    const handleOnSelectChange = useCallback(
        (value: string) => setSelectedOption(value),
        []
    )
    return (
        <Accordion title="Filters">
            <div className={styles.content}>
                <span>Rating</span>
                <Select
                    placeholder="Select an option"
                    options={sortOptions}
                    initialValue={selectedOption}
                    onChange={handleOnSelectChange}
                />
            </div>
            <div className={styles.content}>
                <span>Release Date</span>
                <input type="date" className={styles.input}/>
            </div>
        </Accordion>
    )
}