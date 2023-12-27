import "./SortSelector.scss";
import Select from "react-select";
import sorted_posts from "../../data/sorted_posts";
import { useAppDispatch } from "../../../../../hooks/hookStore";
import { postActions } from "../../../../../store/post/postSlice";

const SortSelector = ({
  setFilterData,
  selectedSort,
  setSelectedSort
}: any) => {
  const dispatch = useAppDispatch();

  const createClearButton = (options: any, selector: string) => {
    const currentCheckbox = document.querySelector(selector);
    const buttonExist = document.querySelector(`${selector} .clear_btn`);

    if (currentCheckbox != null && buttonExist === null) {
      const clearButton = document.createElement("button");
      clearButton.className = "clear_btn";
      clearButton.innerText = "Очистити";

      clearButton?.addEventListener("click", () => {
        setSelectedSort(null);
        dispatch(postActions.resetInitialState());

        setFilterData((prevState: any) => ({
          ...prevState,
          order: "DESC"
        }));

        clearButton.remove();
      });
      currentCheckbox.appendChild(clearButton);
    }
  };

  const handleSelectChange = (e: any) => {
    const { value } = e;

    if (value === "DESC") {
      dispatch(postActions.resetInitialState());
    } else {
      dispatch(postActions.ascResetInitialState());
    }
    // eslint-disable-next-line quotes
    createClearButton("postCreatedDate", `.control`);
    setSelectedSort(e);

    setFilterData((prevState: any) => ({
      ...prevState,
      // eslint-disable-next-line quotes
      [`order`]: value
    }));
  };

  return (
    <div className="sniff-sort-selector">
      <div className="control">
        <span>Сортування</span>
      </div>

      <Select
        options={sorted_posts}
        placeholder={"Не визначено"}
        className="select postCreatedDate"
        onChange={handleSelectChange}
        value={selectedSort}
      />
    </div>
  );
};

export default SortSelector;
