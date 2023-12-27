import "./TotalCount.scss";
import { useAppDispatch } from "../../../../../hooks/hookStore";
import { postActions } from "../../../../../store/post/postSlice";

const TotalCount = ({
  totalCount,
  filterData,
  setFilterData,
  setCheckboxStates,
  setSelectedLocation,
  setSelectedBreed,
  setSelectedSort
}: any) => {
  const dispatch = useAppDispatch();

  const clearFilter = () => {
    const currentButton = document.querySelector(".current_clear_btn");
    const buttons = document.querySelectorAll(".clear_btn");

    if (currentButton !== null) {
      currentButton.classList.remove("visible");
    }

    if (buttons !== null) {
      buttons.forEach((button) => {
        button.remove();
      });
    }

    dispatch(postActions.resetInitialState());

    setFilterData({
      order: "DESC",
      id: undefined,
      type: undefined,
      breed: undefined,
      color: undefined,
      size: undefined,
      age: undefined,
      vaccine: undefined,
      sterilization: undefined,
      gender: undefined,
      diseases: undefined,
      status: undefined,
      lostDateAfter: undefined,
      foundDateAfter: undefined,
      postCreatedDate: undefined,
      region: undefined,
      city: undefined,
      district: undefined
    });

    setCheckboxStates({});
    setSelectedLocation(null);
    setSelectedBreed(null);
    setSelectedSort(null);
  };

  return (
    <div className="sniff-filter-total-count">
      <div className="count_control">
        <span>Всього {totalCount} результатів</span>
        <button
          className={`current_clear_btn ${
            Object.values(filterData).some((value) => {
              if (value === "DESC" || value === "ASC") return false;

              return value !== undefined;
            })
              ? "visible"
              : ""
          }`}
          onClick={clearFilter}
        >
          Очистити
        </button>
      </div>
    </div>
  );
};

export default TotalCount;
