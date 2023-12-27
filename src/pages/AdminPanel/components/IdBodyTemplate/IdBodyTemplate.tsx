import { Link } from "react-router-dom";

const IdBodyTemplate = ({ id }: any) => {
  return <Link to={`/pets/${id}`}>{id}</Link>;
};

export default IdBodyTemplate;
