import { Link } from "react-router-dom";
import s from "./s.module.scss";

function LinkPages({
  to,
  title = "",
  className = "",
  h,
  headingType,
  ...restProps
  
})

 {
if(headingType){
  const HeadingTag = headingType;
  return <HeadingTag>
}
  return <>
     <h 
    
    <hr className={s.sectionCartDivider} />
    <Link
      to={to}
      className={`${s.link} ${className} ${!to && s.disabled}`}
    >
      {title}
    </Link>
  </>;
}
export default LinkPages;
