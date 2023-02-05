import { useCallback, type FC, useState } from "react"
import React from 'react';
import {
    Root, Trigger,
    Value, Icon,
    Portal, Content,
    Viewport, Group,
    Item, ItemText,
} from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import styles from "./Select.module.css"

type SelectProps = {
    placeholder: string
    options: Array<{ value: string, label: string }>
    onChange: (value: string) => void
    initialValue?: string
}

export const Select: FC<SelectProps> = (props) => {
    const {
        placeholder,
        options,
        onChange,
        initialValue = ""
    } = props
    
    const [ option, setOption ] = useState<string>(initialValue)
    
    const handleOnValueChanged = useCallback(
        (selectedOption: string) => {
            setOption(selectedOption)
            onChange(selectedOption)
        },
        []
    )

    return (
        <Root
            onValueChange={handleOnValueChanged}
            defaultValue={initialValue}
        >
            <Trigger className={styles.trigger} aria-label={placeholder}>
                <Value placeholder={placeholder} />
                <Icon className="SelectIcon">
                    <ChevronDownIcon />
                </Icon>
            </Trigger>
            {/* <Portal> */}
                <Content className={styles.content} position="popper">
                    <Viewport className="SelectViewport">
                        <Group>
                            {options.map(({ value, label }) => (
                                <SelectItem
                                    className={option === value ? styles.selectedItem : ""}
                                    value={value}
                                    key={value}
                                >{label}</SelectItem>
                            ))}
                        </Group>

                    </Viewport>
                </Content>
            {/* </Portal> */}
        </Root>
    );
}

type SelectItemProps = {
    children: any,
    value: string,
    disabled?: boolean,
    className?: string,
}
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(({ children, className = "", ...props }, forwardedRef) => {
    return (
        <Item className={`${styles.item} ${className}`} {...props} ref={forwardedRef}>
            <ItemText>{children}</ItemText>
        </Item>
    );
});

SelectItem.displayName = "SelectItem"