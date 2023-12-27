import React from "react";
import "./PetsStatistics.scss";
import { Col } from "react-bootstrap";
import Pie from "./Pie/Pie";
import Bar from "./Bar/Bar";

const PetsStatistics = ({ petStatistics }: any) => {
  return (
    <Col xl={9} className="dashboard-pets-statistics">
      {/* Lost/Found Pet statistics */}
      <Pie petStatistics={petStatistics} />

      {/* All Posts by month statistics */}
      <Bar monthlyCounts={petStatistics.monthlyCounts} />
    </Col>
  );
};

export default React.memo(PetsStatistics);
