import React from "react";
import "./Pie.scss";
import PieBreeds from "./PieBreeds/PieBreeds";
import PieStatus from "./PieStatus/PieStatus";

const Pie = ({ petStatistics }: any) => {
  return (
    <div className="pets-statistics-pie">
      {/* status */}
      <PieStatus
        foundCount={petStatistics.foundCount}
        lostCount={petStatistics.lostCount}
      />

      {/* breeds */}
      <PieBreeds
        dogsCount={petStatistics.dogsCount}
        catsCount={petStatistics.catsCount}
        otherCount={petStatistics.otherCount}
      />
    </div>
  );
};

export default React.memo(Pie);
