import { FC, useState } from "react";
import "./Filter.scss";
import SortSelector from "./SortSelector/SortSelector";
import TotalCount from "./TotalCount/TotalCount";
import FilterPanel from "./FilterPanel/FilterPanel";
import CloseButton from "react-bootstrap/CloseButton";
import FilterIcon from "../../../../components/Icons/Filter";
import { Button } from "primereact/button";

interface IFilter {
  filterData: any;
  setFilterData: any;
  totalCount: number;
}

const Filter: FC<IFilter> = ({ filterData, setFilterData, totalCount }) => {
  const [opened, setOpened] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState<any>({});
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const toggleFilters = () => {
    setOpened(!opened);
  };

  return (
    <div className="sniff-filter">
      <div
        className={
          opened ? "sniff-filter-content-opened" : "sniff-filter-content"
        }
      >
        <CloseButton
          className="sniff-filter-btn-close"
          onClick={toggleFilters}
        />
        <TotalCount
          totalCount={totalCount}
          filterData={filterData}
          setFilterData={setFilterData}
          setCheckboxStates={setCheckboxStates}
          setSelectedLocation={setSelectedLocation}
          setSelectedBreed={setSelectedBreed}
          setSelectedSort={setSelectedSort}
        />

        <SortSelector
          setFilterData={setFilterData}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
        />

        <FilterPanel
          filterData={filterData}
          setFilterData={setFilterData}
          checkboxStates={checkboxStates}
          setCheckboxStates={setCheckboxStates}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
      </div>

      <div className="sniff-filter-btn">
        <Button onClick={toggleFilters}>
          <span className="sniff-filter-btn-icon">
            <FilterIcon />
          </span>

          <span>Фільтри</span>
        </Button>
      </div>

      <div
        className={
          opened ? "sniff-filter-layout-opened" : "sniff-filter-layout"
        }
        onClick={toggleFilters}
      />
    </div>
  );
};

export default Filter;
