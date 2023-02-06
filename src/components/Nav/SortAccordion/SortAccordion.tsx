import { type FC } from "react"
import { Accordion } from "../../Accordion/Accordion"

import styles from "./SortAccordion.module.css"
import { Select } from "@/components/Select/Select"

const sortOptions = [
    { value: "popularity:desc", label: "Popularity Descending" },
    { value: "popularity:asc", label: "Popularity Ascending" },
    { value: "vote_average:desc", label: "Rating Descending" },
    { value: "vote_average:asc", label: "Rating Ascending" },
    { value: "release_date:desc", label: "Release Date Descending" },
    { value: "release_date:asc", label: "Release Date Ascending" },
    { value: "title", label: "Title (A-Z)" },
]

export type SortOption = (typeof sortOptions)[number]

type SortAccordionProps  = {
    onChange: (value: string) => void
    initialValue: SortOption["value"]
}

export const SortAccordion: FC<SortAccordionProps> = (props) => {
    const {onChange, initialValue} = props
    return (
        <Accordion title="Sort">
            <div className={styles.content}>
                <span className="font-light">Sort Results By</span>
                <Select
                    placeholder="Select an option"
                    options={sortOptions}
                    initialValue={initialValue ?? sortOptions[0].value}
                    onChange={onChange}
                />
            </div>
        </Accordion>
    )
}