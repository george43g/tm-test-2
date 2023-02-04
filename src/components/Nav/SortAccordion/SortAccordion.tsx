import * as Accordion from '@radix-ui/react-accordion';
import React, { FC } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';

export const SortAccordion = () => {
  return (
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="sort">
        <AccordionTrigger>Sort</AccordionTrigger>
        <AccordionContent>dropdown</AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};

// eslint-disable-next-line react/display-name
const AccordionTrigger: FC<any> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger {...props} ref={forwardedRef}>
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

// eslint-disable-next-line react/display-name
const AccordionContent: FC<any> = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content className={className} {...props} ref={forwardedRef}>
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));
