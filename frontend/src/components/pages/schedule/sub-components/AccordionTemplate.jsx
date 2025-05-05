import React, { useState } from "react";
import s from "./AccordionTemplate.module.scss"

const AccordionItem = ({ title, content, isOpen, onClick, index }) => {
  const contentId = `accordion-content-${index}`;
  const buttonId = `accordion-button-${index}`;

  return (
    <div className="accordion-item">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onClick}
        className="accordion-header"
      >
        <span className="accordion-title">{title}</span>
        <span className={`accordion-icon ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div
          id={contentId}
          role="region"
          aria-labelledby={buttonId}
          className="accordion-content"
        >
          {content}
        </div>
      )}
    </div>
  );
};

const AccordionTemplate = ({ items, title }) => {
  const [isOpened, setIsOpened] = useState(false)
  const handleClick = (isOpened, setIsOpened) => {
    setIsOpened(!isOpened)
  }

  return (
    <div className={s.accordion}>
        <button className={s.accordion__button} type= "button" onClick={()=>{handleClick(isOpened, setIsOpened)}} >{title} {isOpened ? <span></span> : <span>{"^"}</span>}</button>
        
        {isOpened && items.map((item, index) => (
            < AccordionItem
                
            />
        ))}
    </div>
  );
};

export default AccordionTemplate;