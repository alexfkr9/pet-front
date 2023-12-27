import AdminNavigation from "./components/AdminNavigation/AdminNavigation";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Pets from "./pages/Pets/Pets";
import LogHistory from "./pages/LogHistory/LogHistory";
import NotFound from "../NotFound/NotFound";
import { Col, Row } from "react-bootstrap";
import "./AdminPanel.scss";

const AdminPanel = () => {
  return (
    <section className="section section-admin-panel">
      <div className="container">
        <Row>
          <Routes>
            <Route path="/" element={<AdminNavigation />}>
              <Route index element={<Dashboard />} />
              <Route path="/users-table" element={<Users />} />
              <Route path="/pets-table" element={<Pets />} />
              <Route path="/log-history" element={<LogHistory />} />
              <Route
                path="/message"
                element={
                  <Col xl={9} className="sniff-admin-message">
                    <div className="text-center p-5">
                      Дана сторінка знаходиться у розробці
                    </div>
                  </Col>
                }
              />
              <Route
                path="/ads"
                element={
                  <Col xl={9} className="sniff-admin-ads">
                    <div className="text-center p-5">
                      Дана сторінка знаходиться у розробці
                    </div>
                  </Col>
                }
              />
              <Route
                path="/settings"
                element={
                  <Col xl={9} className="sniff-admin-settings">
                    <div className="text-center p-5">
                      Дана сторінка знаходиться у розробці
                    </div>
                  </Col>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Row>
      </div>
    </section>
  );
};

export default AdminPanel;
