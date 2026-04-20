import React, { useState, useId } from 'react';
import './Accordion.css';

const AccordionPanel = ({ title, children }) => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <div className="accordion-panel">
      <h3 className="accordion-header">
        <button
          id={`${id}-header`}
          className="accordion-trigger"
          aria-expanded={isExpanded}
          aria-controls={`${id}-content`}
          onClick={handleToggle}
        >
          {title}
        </button>
      </h3>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-header`}
        className="accordion-content"
        hidden={!isExpanded}
      >
        {isExpanded && (
          <div className="accordion-content-inner">{children}</div>
        )}
      </div>
    </div>
  );
};

const Accordion = ({ panels = [] }) => (
  <div className="accordion" role="presentation">
    {panels.map((panel, index) => (
      <AccordionPanel key={index} title={panel.title}>
        {panel.content}
      </AccordionPanel>
    ))}
  </div>
);

export default Accordion;
