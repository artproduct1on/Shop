import LinkPages from "../UI/LinkPages";
import s from "./s.module.scss";

function SectionHeader({
  titleMain = false,
  title = "No Title",
  LinkPagesTitle = "No Title",
  LinkPagesTo = "",
}) {

  return <>
    {titleMain ?
      <h1 className="section-title">{title}</h1> :
      <h2 className="section-title">{title}</h2>
    }
    <LinkPages
      className={s.link}
      to={LinkPagesTo}
      title={LinkPagesTitle}
      devider={true}
    />
  </>;
}
export default SectionHeader;
