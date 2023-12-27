import "./Users.scss";
import { Col } from "react-bootstrap";
import UsersTable from "./UsersTable/UsersTable";

const Users = () => {
  return (
    <Col xl={9} className="sniff-admin-users">
      <UsersTable />
    </Col>
  );
};

export default Users;
