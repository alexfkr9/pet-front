import "./FilterPanel.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Fieldset } from "primereact/fieldset";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import Select from "react-select";
import locations from "../../data/locations.json";
import { customData } from "../../data/customData";
import { breeds } from "../../data/breeds";
import { useAppDispatch } from "../../../../../hooks/hookStore";
import { postActions } from "../../../../../store/post/postSlice";

const FilterPanel = ({
  filterData,
  setFilterData,
  checkboxStates,
  setCheckboxStates,
  selectedLocation,
  setSelectedLocation,
  selectedBreed,
  setSelectedBreed
}: any) => {
  const dispatch = useAppDispatch();
  const clearBtnName =
    ".p-fieldset.p-component.p-fieldset-toggleable.sniff-fieldset";

  const createClearButton = (options: any, selector: string) => {
    const currentCheckbox = document.querySelector(selector);
    const buttonExist = document.querySelector(`${selector} .clear_btn`);

    if (currentCheckbox != null && buttonExist === null) {
      const clearButton = document.createElement("button");
      clearButton.className = "clear_btn";
      clearButton.innerText = "Очистити";

      clearButton?.addEventListener("click", () => {
        if (filterData.order === "DESC") {
          dispatch(postActions.resetInitialState());
        } else {
          dispatch(postActions.ascResetInitialState());
        }

        if (options === "status") {
          setCheckboxStates((prevState: any) => ({
            ...prevState,
            [options]: ""
          }));

          const clearButtonLocation = document.querySelector(
            `${clearBtnName}.select.city.region .p-fieldset-legend.p-unselectable-text .clear_btn`
          );

          clearButtonLocation?.remove();

          setFilterData((prevState: any) => ({
            ...prevState,
            [options]: undefined,
            city: undefined,
            region: undefined,
            district: undefined
          }));
        } else if (options === "type") {
          const clearButtonBreed = document.querySelector(
            `${clearBtnName}.select.breed .p-fieldset-legend.p-unselectable-text .clear_btn`
          );

          const clearButtonPetSize = document.querySelector(
            `${clearBtnName}.сheckbox.size .p-fieldset-legend.p-unselectable-text .clear_btn`
          );

          clearButtonPetSize?.remove();
          clearButtonBreed?.remove();

          setCheckboxStates((prevState: any) => ({
            ...prevState,
            [options]: "",
            size: ""
          }));

          setFilterData((prevState: any) => ({
            ...prevState,
            [options]: undefined,
            breed: undefined,
            size: undefined
          }));
        } else {
          setCheckboxStates((prevState: any) => ({
            ...prevState,
            [options]: ""
          }));

          setFilterData((prevState: any) => ({
            ...prevState,
            [options]: undefined
          }));
        }

        if (
          options === "city" ||
          options === "region" ||
          options === "district" ||
          options === "status"
        ) {
          setSelectedLocation(null);
        } else if (options === "breed" || options === "type") {
          setSelectedBreed(null);
        }

        clearButton.remove();
      });

      currentCheckbox.appendChild(clearButton);
    }
  };

  const handleInputToggle = (e: any) => {
    const { id, value, checked } = e.target;

    createClearButton(id, `.сheckbox.${id} legend`);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const isAlreadySelected = checkboxStates[id]?.[value] || false;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (isAlreadySelected && !checked) {
      return;
    }

    setCheckboxStates((prevState: any) => ({
      ...prevState,
      [id]: {
        [value]: checked
      }
    }));

    if (filterData.order === "DESC") {
      dispatch(postActions.resetInitialState());
    } else {
      dispatch(postActions.ascResetInitialState());
    }

    if (id === "type") {
      setFilterData((prevState: any) => ({
        ...prevState,
        [id]: value,
        breed: undefined,
        size: undefined
      }));

      setCheckboxStates((prevState: any) => ({
        ...prevState,
        size: ""
      }));

      setSelectedBreed(null);

      const clearButtonBreed = document.querySelector(
        `${clearBtnName}.select.breed .p-fieldset-legend.p-unselectable-text .clear_btn`
      );

      const clearButtonPetSize = document.querySelector(
        `${clearBtnName}.сheckbox.size .p-fieldset-legend.p-unselectable-text .clear_btn`
      );

      clearButtonPetSize?.remove();
      clearButtonBreed?.remove();
    } else {
      setFilterData((prevState: any) => ({
        ...prevState,
        [id]: value
      }));
    }
  };

  const handleSelectChange = (e: any, options: any) => {
    const { label } = e;

    createClearButton(options, `.${options} legend`);
    dispatch(postActions.resetInitialState());

    if (filterData.order === "DESC") {
      dispatch(postActions.resetInitialState());
    } else {
      dispatch(postActions.ascResetInitialState());
    }

    if (options === "city") {
      setSelectedLocation(e);
      setFilterData((prevState: any) => ({
        ...prevState,
        region: undefined,
        [options]: label
      }));
    } else if (options === "region") {
      setSelectedLocation(e);
      setFilterData((prevState: any) => ({
        ...prevState,
        city: undefined,
        [options]: label
      }));
    } else {
      setSelectedBreed(e);
      setFilterData((prevState: any) => ({
        ...prevState,
        [options]: label
      }));
    }
  };

  const optionsBreed =
    filterData.type === "DOG"
      ? [...breeds.dogs]
      : filterData.type === "CAT"
      ? [...breeds.cats]
      : [...breeds.dogs, ...breeds.cats];

  return (
    <div className="sniff-filter-panel">
      <Fieldset
        legend="Місцезнаходження"
        toggleable
        className="sniff-fieldset select city region"
      >
        <Select
          isDisabled={filterData.status === undefined}
          options={[...locations.cities, ...locations.regions]}
          className={`sniff-select__container ${
            filterData.status === undefined ? "disabled" : ""
          }`}
          classNamePrefix="sniff-select"
          placeholder={
            filterData.status === undefined ? "Виберіть статус" : "Оберіть"
          }
          onChange={(e) => {
            const selectedValue = e.value;
            let locationType = "";

            if (locations.cities.some((city) => city.value === selectedValue)) {
              locationType = "city";
            } else if (
              locations.regions.some((region) => region.value === selectedValue)
            ) {
              locationType = "region";
            }

            handleSelectChange(e, locationType);
          }}
          value={selectedLocation}
        />
      </Fieldset>

      {customData.map(({ category, legend, data, inputType }) => (
        <Fieldset
          key={category}
          legend={legend}
          toggleable
          className={`sniff-fieldset сheckbox ${category}`}
        >
          {data.map(({ value, label }) => (
            <div key={value} className="customData">
              {inputType === "checkbox" ? (
                <Checkbox
                  id={category}
                  inputId={value}
                  name={label}
                  value={value}
                  onChange={handleInputToggle}
                  checked={checkboxStates[category]?.[value] === true || false}
                  disabled={
                    category === "size" &&
                    (filterData.type === "CAT" || filterData.type === "OTHER")
                  }
                />
              ) : (
                <RadioButton
                  id={category}
                  inputId={value}
                  name={label}
                  value={value}
                  onChange={handleInputToggle}
                  checked={checkboxStates[category]?.[value] === true || false}
                />
              )}

              <label
                htmlFor={value}
                className="ml-2"
                style={{ marginLeft: "8px" }}
              >
                {label}
              </label>
            </div>
          ))}
        </Fieldset>
      ))}

      <Fieldset
        legend="Порода"
        toggleable
        className="sniff-fieldset select breed"
      >
        <Select
          isDisabled={filterData.type === "OTHER"}
          options={optionsBreed} // [...breeds.dogs, ...breeds.cats]
          className={
            filterData.type === "OTHER"
              ? "sniff-select__container disabled"
              : "sniff-select__container"
          }
          classNamePrefix="sniff-select disabled"
          placeholder={
            filterData.type === "OTHER" ? "Виберіть собаки / коти" : "Оберіть"
          }
          onChange={(e) => {
            handleSelectChange(e, "breed");
          }}
          value={selectedBreed}
        />
      </Fieldset>
    </div>
  );
};

export default FilterPanel;
