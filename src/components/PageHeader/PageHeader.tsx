import "./PageHeader.scss";

interface IProps {
  text: string;
}

const PageHeader = ({ text }: IProps) => {
  return (
    <div className="sniff-page-header">
      <h1>{text}</h1>
    </div>
  );
};

export default PageHeader;
