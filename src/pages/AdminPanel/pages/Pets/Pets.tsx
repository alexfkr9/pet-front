import "./Pets.scss";
import { Col } from "react-bootstrap";
import PetsTable from "./PetsTable/PetsTable";

const Pets = () => {
  return (
    <Col xl={9} className="sniff-admin-pets">
      <PetsTable />
    </Col>
  );
};

export default Pets;
