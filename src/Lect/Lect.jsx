import React from 'react';
import './Lect.css';

const endingPunctuation = ['.', '!', '?'];

const Lect = ({ lect, shouldHighlight, showModal }) => {
  const className = [
    'Lect',
    shouldHighlight ? 'highlighted' : 'unHighlighted',
  ].join(' ');
  const lastChar = lect.text.slice(-1);
  const isEndingInPunctuation = endingPunctuation.includes(lastChar);
  const spacer = isEndingInPunctuation ? '  ' : ' ';
  return (
    <span
      className={ className }
      onClick={ () => showModal(lect) }
      aria-hidden='true'
    >
      { `${lect.text}${spacer}` }
    </span>
  );
};

export default Lect;
