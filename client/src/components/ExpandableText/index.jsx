import { useState } from "react";
import s from "./s.module.scss";
function ExpandableText({
  title,
  text,
  maxLength,
  className,
}) {

  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = text.length > maxLength;

  const displayedText = isExpanded || !isLongText
    ? text
    : `${text.substring(0, maxLength)}...`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${s.discription} ${className}`}>
      <h2 className={s.descriptionTitle}>{title}</h2>
      <p className={s.descriptionText}>{displayedText}</p>
      {
        isLongText &&
        <button
          className={s.descriptionBtn}
          onClick={toggleExpand}
        >
          {isExpanded ? "Hide" : "Read more"}
        </button>
      }
    </div>
  );
}
export default ExpandableText;
