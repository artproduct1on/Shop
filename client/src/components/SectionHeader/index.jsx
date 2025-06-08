import LinkPages from "../UI/LinkPages";
import s from "./s.module.scss";

function SectionHeader({
  titleMain = false,
  title = "No Title",
  LinkPagesTitle = "No Title",
  LinkPagesTo = "",
  classNameLink
}) {

  return <>
    {titleMain ?
      <h1 className={`section-title ${s.title}`}>{title}</h1> :
      <h2 className={`section-title ${s.title}`}>{title}</h2>
    }
    <LinkPages
      className={`${s.link} ${classNameLink}`}
      to={LinkPagesTo}
      title={LinkPagesTitle}
      devider={true}
    />
  </>;
}
export default SectionHeader;
