import {
  Root,
  Item, 
  Content,
  Header,
  Trigger,
} from '@radix-ui/react-accordion';
import React, { FC } from 'react';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import styles from "./Accordion.module.css"


type AccordionProps  = {
  children: any,
  title: string
}

export const Accordion: FC<AccordionProps> = ({ children, title }) => {
  return (
    <Root type="single" className={styles.root} collapsible>
      <Item value="sort" className={styles.item}>
        <AccordionTrigger classNames={styles}>{title}</AccordionTrigger>
        <Content className={styles.content}>
          {children}
        </Content>
      </Item>
    </Root>
  );
};

const AccordionTrigger: FC<any> = React.forwardRef(({ children, classNames, ...props }, forwardedRef) => (
  <Header className={classNames.triggerHeader}>
    <Trigger className={classNames.trigger} {...props} ref={forwardedRef}>
      {children}
      <ChevronRightIcon className={classNames.triggerIcon} aria-hidden />
    </Trigger>
  </Header>
));

AccordionTrigger.displayName = "AccordionTrigger"