/* eslint-disable indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SingleValue } from "react-select";

import { postApi, userApi } from "../../../Api";

import "./PetRegForm.scss";
import { breeds } from "./breeds";

import initMapScript from "../../../services/getLocationScript";
import { petValidationRules } from "../../../services/validation/ValidationRules";

import CustomSpinner from "../../../components/Spinner/Spinner";
import PetFormHeader from "./PetFormHeader/PetFormHeader";
import FormRadioInput from "../../../components/Form/FormRadio/FormRadioInput";
import FormLocation from "../../../components/Form/FormLocation/FormLocation";
import FormAutocomplete from "../../../components/Form/FormAutocomplete/FormAutocomplete";
import DateInput from "./DateInput/DateInput";
import ImagesUpload from "./ImagesUpload/ImagesUpload";

import convertDateToDdMmYyyy from "../../../services/convertDateToDdMmYyyy";
import petData from "../petData";

import {
  Form,
  OverlayTrigger,
  Tooltip,
  Badge,
  Col,
  Row
} from "react-bootstrap";
import phoneFormat from "../../../services/phoneFormat";

interface inputTypes {
  hideContacts: boolean;
  name: string;
  type: string;
  location: {
    region: string;
    city: string;
    district: string;
  };
  currentLocation?: {
    region: string;
    city: string;
    district: string;
  };
  date: string;
  breed: string;
  color: string;
  size: string;
  gender: string;
  age: string;
  vaccine: string | null;
  sterilization: string | null;
  diseases: string;
  show_contact: boolean;
}

const PetRegForm = () => {
  const [loading, setLoading] = useState(true);
  const [activeInput, setActiveInput] = useState<boolean>(false);

  // Form Data
  const [formData, setFormData] = useState<any>({
    name: "",
    type: "",
    breed: null,
    color: null,
    gender: null,
    locationCity: "",
    currentLocationCity: "",
    date: "",
    age: null,
    size: null,
    diseases: null,
    vaccine: null,
    sterilization: null,
    story: "",
    phone: ""
  });

  const [foundLost, setFoundLost] = useState("FOUND");

  // Data for Edit form, which are shown in the inputs

  const [editableData, setEditableData] = useState<any>("");

  const loc = useLocation();
  let isEdit = false;
  let postId = 0;
  if (loc.state !== null) {
    isEdit = loc.state.isEdit;
    postId = loc.state.postId;
  }

  // Reset the page when change the form from edit to create
  const [pathname, setPathname] = useState("/add-pet");
  if (loc.pathname === "/add-pet" && pathname === "/edit-pet") {
    window.location.reload();
  }

  const optionsBool = [
    { label: "Так", value: "YES" },
    { label: "Ні", value: "NO" }
  ];

  function changeText(pet: any) {
    if (pet === null) {
      return {
        label: "Не вказано",
        value: ""
      };
    }
    return {
      label: pet === "YES" ? "Так" : "Ні",
      value: pet
    };
  }

  let placeholderEditForm: string = "";

  if (isEdit) {
    placeholderEditForm = "placeholder-edit-form";
  }

  const saubmitBtnText = isEdit
    ? "Підтвердити зміни"
    : "Опублікувати профіль тваринки";

  // get Post By Id for edit mode
  const [author, setAuthor] = useState();
  useEffect(() => {
    if (isEdit) {
      setPathname("/edit-pet");
      setLoading(true);
      postApi
        .getPostById(postId)
        .then((response: any) => {
          const data = response.data;
          const { type, pet } = data;

          const location = type === "FOUND" ? "foundLocation" : "lostLocation";

          const locationCity =
            data?.lostLocation?.city || data?.foundLocation?.city || "";

          const currentLocationCity = data.currentLocation?.city || "";

          const date = data.foundDate || data.lostDate;

          setFoundLost(type);
          setFoundLostLoc(type === "FOUND" ? "foundLocation" : "lostLocation");
          setFoundLostDate(type === "FOUND" ? "foundDate" : "lostDate");

          setSelectedOption(petData.getPetTypeObj("typePet", pet.type));

          // add Location to formData without edit
          setLocation({
            region: data[location]?.region || "",
            city: data[location]?.city || "",
            district: data[location]?.district || ""
          });
          setСurrentLocation({
            region: data.currentLocation?.region || "",
            city: data.currentLocation?.city || "",
            district: data.currentLocation?.district || ""
          });

          setAuthor(data.author);

          setEditableData({
            ...editableData,
            id: postId,
            autorId: data.author.id,
            petId: pet.id,
            photoIds: data.photoIds,
            type,
            name: pet.name || "Не вказано",
            gender: pet.gender,
            color: {
              label: pet.color || "Не вказано",
              value: pet.color || "Не вказано"
            },
            age: {
              label: petData.getLabel("age", pet.age),
              value: pet.age || "Не вказано"
            },
            size: {
              label: petData.getLabel("size", pet.size),
              value: pet.size || "Не вказано"
            },
            vaccine: changeText(pet.vaccine),
            sterilization: changeText(pet.castration),
            diseases: changeText(pet.diseases),
            location:
              data[location]?.city !== undefined
                ? data[location].region +
                  " " +
                  data[location].city +
                  " " +
                  data[location].district
                : "Не вказано",
            currentLocation:
              data.currentLocation?.city !== undefined
                ? data.currentLocation?.region +
                  " " +
                  data.currentLocation?.city +
                  " " +
                  data.currentLocation?.district
                : "Не вказано",
            date: data.foundDate || data.lostDate,
            story: data.story || "Не вказано"
          });

          setSubSelectedOption({
            label: pet.breed || "Не вказано",
            value: pet.breed || "Не вказано"
          });

          setFormData({
            ...formData,
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            color: pet.color,
            gender: pet.gender,
            locationCity,
            currentLocationCity,
            date,
            age: pet.age,
            size: pet.size,
            diseases: pet.diseases,
            vaccine: pet.vaccine,
            sterilization: pet.castration,
            story: data.story,
            phone: data.author.phone
          });
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get Current User
  useEffect(() => {
    setLoading(true);
    userApi
      .getCurrentUser()
      .then((response: any) => {
        setWhoamiData(response.data);

        // for change phone  !!!
        if (!isEdit) {
          setFormData({
            ...formData,
            phone: phoneFormat(response.data.phone)
          });
        }

        setLoading(false);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // google map script for location api
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const [whoamiData, setWhoamiData] = useState<any>(null);

  // load google map script after mounted
  useEffect(() => {
    void initMapScript().then(() => {
      setIsScriptLoaded(true);
    });
  }, []);

  // post
  const [isCreated, setIsCreated] = useState(false);

  // send text Data to the server
  const savePost = () => {
    postApi
      .addPost(postData)
      .then((response: any) => {
        if (response.data !== null) setIsCreated(true);
        savePhotos(response.data.id);
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error("Data not sent:", error);
      });
  };

  // send edited text Data to the server
  const editPost = () => {
    trimFormData();
    postData.id = postId;
    postData.author = author;
    postData.pet.id = editableData.petId;
    postData.photoIds = editableData.photoIds;

    postApi
      .updatePostById(postId, postData)
      .then((response: any) => {
        // eslint-disable-next-line no-console
        console.log("Data is sent:", response.data);
        if (response.data !== null) setIsCreated(true);
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error("Data not sent:", error);
      });
  };

  // send Photos to the server
  const savePhotos = (postId: number) => {
    postApi
      .uploadPostPhotos(postId, imageArr)
      .then((response: any) => {
        // eslint-disable-next-line no-console
        console.log("Photo is sent:", response);
        if (response.data) setIsCreated(true);
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error("Photo not sent:", error);
      });
  };

  const [validatedInputs, setValidatedInputs] = useState(
    petValidationRules.valid()
  );

  const validationRules = petValidationRules.validations;

  const [submitted, setSubmitted] = useState<boolean>(false);

  // -----------------------

  const [foundLostLoc, setFoundLostLoc] = useState("foundLocation");

  const [location, setLocation] = useState({});

  const [currentLocation, setСurrentLocation] = useState({});

  const [foundLostDate, setFoundLostDate] = useState("foundDate");

  // text data for send to the server
  const postData: any = {
    type: foundLost,
    author: {},
    pet: {
      name: formData.name,
      type: formData.type,
      breed: formData.breed,
      color: formData.color,
      gender: formData.gender,
      age: formData.age,
      size: formData.size,
      vaccine: formData.vaccine,
      castration: formData.sterilization,
      diseases: formData.diseases
    },
    story: formData.story,
    [foundLostDate]: formData.date || convertDateToDdMmYyyy(new Date()),
    currentLocation: currentLocation || null,
    [foundLostLoc]: location,
    contactPhone: cleanPhone(formData.phone)
  };

  function cleanPhone(phone: any) {
    const symbolsToRemove = " )(-";
    const regexPattern = new RegExp(`[${symbolsToRemove}]`, "g");
    return phone.replace(regexPattern, "");
  }

  const [imageArr, setImageArr] = useState([]);

  const getImageArr = (arr: any) => {
    setImageArr(arr);
  };

  // add data of user to post Data
  function addWhoamiToPostData(data: any) {
    postData.author = {
      ...whoamiData
    };
    // postData.author.phone = formData.phone;
  }

  // Event handler
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>
  ) => {
    const isCheckbox = event.target.type === "radio";
    const newState = {
      [event.target.name]: isCheckbox ? event.target.id : event.target.value
    } as unknown as Pick<inputTypes, keyof inputTypes>;

    setFormData({ ...formData, ...newState });

    // change gender data in edit mode
    if (isEdit && event.target.name === "gender") {
      setEditableData({ ...editableData, ...newState });
    }

    setActiveInput(true); // for enable button
  };

  const changePhone = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    setFormData({ ...formData, phone: event.target.value });
    setActiveInput(true); // for enable button
  };

  // handle Textarea Change and characters (1000) limiter
  const handleTextareaChange = (event: { target: { value: string } }) => {
    setActiveInput(true);
    const newText = event.target.value;
    if (newText.length <= 1000) {
      setFormData({ ...formData, story: newText });
    }
  };

  // Location Event handler
  const getLocation = (address: any, name: any) => {
    setActiveInput(true); // for enable submit button

    interface Location {
      region: string;
      city: string;
      district: string;
    }

    // destructorize the address object, except for the method - plain()
    const {
      region,
      city,
      district
    }: { region: string; city: string; district: string } = address;

    const location: Location = {
      region,
      city,
      district
    };

    if (name === "location") {
      // for validate
      setFormData({
        ...formData,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        [name + "City"]: location.city
      });

      // for add to post
      setLocation(location);
    } else {
      // for validete
      setFormData({
        ...formData,
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        currentLocationCity: location.city
      });
      setСurrentLocation(location);
    }
  };

  // other Event handler
  const selectChange = (
    selectedOption: SingleValue<{ label: string; value: string }>,
    { name }: any
  ) => {
    setActiveInput(true); // for enable submit button
    setSubmitted(false);
    if (selectedOption !== null) {
      let newState;
      if (name === "color") {
        newState = {
          [name]: selectedOption.label
        };
      } else {
        newState = {
          [name]: selectedOption.value
        };
      }

      setFormData({ ...formData, ...newState });

      // for editing form
      setEditableData({
        ...editableData,
        [name]: selectedOption
      });
    }
  };

  // Switch Found pet or Lost pet state
  const foundLostHandleChange = (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    setActiveInput(true); // for enable submit button

    setFoundLost(value.target.id);

    setFoundLostLoc(foundLost === "FOUND" ? "lostLocation" : "foundLocation");

    setFoundLostDate(foundLostDate === "foundDate" ? "lostDate" : "foundDate");

    // trim space on both sides of name, label, tel
    trimFormData();

    // change type data in edit mode
    if (isEdit) {
      setEditableData({ ...editableData, type: value.target.id });
    }

    // reset data
    // setFormData({ ...formData, date: "", currentLocationCity: "" });
    // setСurrentLocation("");

    // switch validation rules, when the lost / found change
    if (submitted) {
      // name
      if (value.target.id === "LOST") {
        // set rule
        validationRules[0].validWhen = false;
      }

      if (value.target.id === "FOUND" && formData.name === "") {
        validationRules[0].validWhen = true;
      }

      // if (value.target.id === "FOUND") {
      //   validationRules[3].validWhen = false;
      // }

      // if (
      //   value.target.id === "FOUND" &&
      //   formData.locationCity === "" &&
      //   formData.currentLocationCity !== ""
      // ) {
      //   validationRules[3].validWhen = true;
      // }

      // if (value.target.id === "LOST") {
      //   validationRules[3].validWhen = false;
      // }

      // current location
      // if (value.target.id === "LOST" && formData.currentLocationCity === "") {
      //   validationRules[4].validWhen = true;
      // }

      // if (value.target.id === "LOST" && formData.currentLocationCity !== "") {
      //   validationRules[4].validWhen = false;
      // }

      // if (value.target.id === "FOUND") {
      //   validationRules[4].validWhen = false;
      // }

      // if (
      //   value.target.id === "FOUND" &&
      //   formData.currentLocationCity === "" &&
      //   formData.locationCity !== ""
      // ) {
      //   validationRules[4].validWhen = true;
      // }

      if (value.target.id === "FOUND" && formData.date === "") {
        validationRules[5].validWhen = true;
      }

      if (value.target.id === "LOST") {
        // set rule
        validationRules[5].validWhen = false;
      }

      // validate data
      const validation = petValidationRules.validate(formData);
      setValidatedInputs(validation);
    }
  };

  const optional = foundLost === "FOUND" ? "(опціонально)" : "";

  const locationText =
    foundLost === "FOUND"
      ? "Місто де знайшли тварину"
      : "Місто де загубили тварину";

  // choice breed of pet depending on the type of pet
  interface Option {
    label: string;
    value: string;
  }

  interface SubOptions {
    DOG: Option[];
    CAT: Option[];
    OTHER: Option[];
  }

  const subOptions: SubOptions = {
    DOG: breeds.dogs,
    CAT: breeds.cats,
    OTHER: [{ label: "Інше", value: "OTHER" }]
  };

  const [selectedOption, setSelectedOption] = useState<Option | null>();
  const [subSelectedOption, setSubSelectedOption] = useState<Option | null>(
    null
  );

  const petTypeChange: any = (
    selectedOption: React.SetStateAction<null> | any
  ) => {
    setActiveInput(true); // for enable submit button

    postData.pet.size = null;
    setFormData({
      ...formData,
      type: selectedOption.value,
      breed: "",
      size: null
    });
    setSelectedOption(selectedOption);
    setSubSelectedOption(null);
  };

  const petBreedChange = (
    subSelectedOption: React.SetStateAction<null> | any
  ) => {
    setActiveInput(true); // for enable submit button

    setSubSelectedOption(subSelectedOption);
    setFormData({ ...formData, breed: subSelectedOption.value });
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const subOptionsForSelectedOption = subOptions[selectedOption?.value];

  // trim space on both sides of name, label, tel
  function trimFormData() {
    formData.name = formData.name.trim();
    formData.story = formData.story.trim();
    formData.phone = formData.phone.trim();
  }

  useEffect(() => {}, [formData.name]);

  // Reset form fields after submit
  const refreshPage = () => {
    setIsCreated(false);
    window.location.reload();
  };

  // scroll to Element by class Name
  function scrollToElement(className: string) {
    const element = document.querySelector(`form .${className}`);
    if (element !== null) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleClick() {
    scrollToElement("has-error");
  }

  // Submit Form
  const handleFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSubmitted(true);

    // trim space on both sides of name, label, tel
    trimFormData();

    // Exclude optional fields from validation

    // exclude PetName function
    if (foundLost === "LOST") {
      // set rule
      validationRules[0].validWhen = false;
    }
    if (foundLost === "FOUND" && formData.name === "") {
      validationRules[0].validWhen = true;
    }

    if (foundLost === "FOUND" && formData.name !== "") {
      validationRules[0].validWhen = false;
    }

    // exclude Location from validation
    // if (
    //   foundLost === "FOUND" &&
    //   formData.locationCity === "" &&
    //   formData.currentLocationCity !== ""
    // ) {
    //   validationRules[3].validWhen = true;
    // } else {
    //   validationRules[3].validWhen = false;
    // }

    // exclude Сurrent Location from validation
    // if (
    //   foundLost === "FOUND" &&
    //   formData.locationCity !== "" &&
    //   formData.currentLocationCity === ""
    // ) {
    //   validationRules[4].validWhen = true;
    // } else {
    //   validationRules[4].validWhen = false;
    // }

    // if (foundLost === "LOST" && formData.currentLocationCity === "") {
    //   validationRules[4].validWhen = true; // exclude currentLocation from validation
    // }
    // if (foundLost === "LOST" && formData.currentLocationCity !== "") {
    //   validationRules[4].validWhen = false; // include currentLocation to validation
    // }

    // exclude date from validation

    if (foundLost === "FOUND" && formData.date === "") {
      validationRules[5].validWhen = true;
    }

    if (foundLost === "FOUND" && formData.date !== "") {
      validationRules[5].validWhen = false;
    }

    if (foundLost === "LOST") {
      // set rule
      validationRules[5].validWhen = false;
    }

    const validation = petValidationRules.validate(formData);
    setValidatedInputs(validation);

    setTimeout(() => {
      handleClick();
    }, 100);

    if (isEdit && validation.isValid === true) {
      editPost();
    }

    if (
      !isEdit &&
      validation.isValid === true &&
      imageArr.length > 0 &&
      imageArr.length <= 10
    ) {
      if (whoamiData !== null && formData.phone !== "") {
        addWhoamiToPostData(whoamiData);
        savePost();
      }
    }
  };

  // Published Component
  const Published = () => {
    const publishedText = isEdit
      ? {
          title: "Зміни збережені",
          btnText: "Продовжити редагування профілю тваринки"
        }
      : {
          title: "Профіль тваринки успішно опубліковано",
          btnText: "Додати ще тваринку"
        };

    return (
      <div className="pet-published-modal">
        <div className="pet-published">
          <i className="pet-published__img"></i>
          <h1 className="pet-published__title">{publishedText.title}</h1>
          <button className="sniff-mission-btn" onClick={refreshPage}>
            {publishedText.btnText}
          </button>

          <Link to="/" className="sniff-mission-btn published">
            <span>Повернутися на головну сторінку</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          {isCreated && <Published />}
          {!isCreated && (
            <div className="container-pet-form">
              <PetFormHeader isEdit={isEdit} />
              <Form className="wrapper-pet-form">
                <h2 className="pet-form-title">Яка мета</h2>

                {/* Form data */}

                <div className="pet-form">
                  {/* found button */}
                  <Form.Group className="found">
                    <FormRadioInput
                      value="Знайти поточних власників"
                      name="type-info"
                      id="FOUND"
                      defaultChecked={foundLost === "FOUND"}
                      handleChange={foundLostHandleChange}
                    />
                  </Form.Group>

                  {/* lost button */}
                  <Form.Group className="lost">
                    <FormRadioInput
                      value="Знайти свою загублену тваринку"
                      name="type-info"
                      id="LOST"
                      defaultChecked={foundLost === "LOST"}
                      handleChange={foundLostHandleChange}
                    />
                  </Form.Group>
                  {/* </Row> */}

                  <h2 className="pet-form-title">Деталі про тваринку</h2>

                  <div className="animal-details">
                    {/* name */}
                    <Form.Group className="form-group">
                      <Form.Label>І’мя тваринки {optional}</Form.Label>
                      <Form.Control
                        className={`${
                          validatedInputs.name?.isInvalid === true &&
                          "has-error"
                        } ${placeholderEditForm} `}
                        type="text"
                        placeholder={
                          editableData.name || "Вкажіть ім'я тваринки"
                        }
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                      />
                      <span className="text-danger">
                        {validatedInputs.name?.message}
                      </span>
                    </Form.Group>

                    {/* pet type */}

                    <Form.Group className="form-group" controlId="type">
                      <Form.Label>Тип тварини</Form.Label>
                      <FormAutocomplete
                        className={`form-autocomplete ${
                          validatedInputs.type.isInvalid === true && "has-error"
                        }`}
                        placeholder="Вкажіть тип"
                        options={petData.typePet}
                        value={selectedOption}
                        handleSelectChange={petTypeChange}
                      />
                      <span className="text-danger">
                        {validatedInputs.type.message}
                      </span>
                    </Form.Group>

                    {/* gender buttons */}

                    {/* MALE button */}

                    <Form.Group className="form-group">
                      <Form.Label>Стать</Form.Label>

                      <FormRadioInput
                        value="Хлопчик"
                        name="gender"
                        id="MALE"
                        defaultChecked={
                          editableData.gender
                            ? editableData.gender === "MALE"
                            : formData.gender === "MALE"
                        }
                        handleChange={handleChange}
                      />
                    </Form.Group>

                    {/* FEMALE button */}
                    <Form.Group className="form-group flex-end">
                      <FormRadioInput
                        value="Дівчинка"
                        name="gender"
                        id="FEMALE"
                        defaultChecked={
                          editableData.gender
                            ? editableData.gender === "FEMALE"
                            : formData.gender === "FEMALE"
                        }
                        handleChange={handleChange}
                      />
                    </Form.Group>

                    {/* Breed select */}
                    {formData.type !== "OTHER" && selectedOption != null && (
                      <Form.Group className="form-group" controlId="breed">
                        <Form.Label>Порода</Form.Label>
                        <FormAutocomplete
                          className="form-autocomplete"
                          value={subSelectedOption}
                          placeholder="Вкажіть породу"
                          options={subOptionsForSelectedOption}
                          handleSelectChange={petBreedChange}
                          isDisabled={selectedOption == null}
                        />
                      </Form.Group>
                    )}

                    {/* pet color */}

                    <Form.Group className="form-group" controlId="color">
                      <Form.Label>Колір</Form.Label>
                      <FormAutocomplete
                        className="form-autocomplete"
                        name="color"
                        placeholder="Вкажіть колір"
                        options={petData.color}
                        value={editableData.color}
                        handleSelectChange={selectChange}
                      />
                    </Form.Group>

                    {formData.type === "DOG" && (
                      /* pet size */
                      <Form.Group className="form-group" controlId="size">
                        <OverlayTrigger
                          delay={{ hide: 600, show: 300 }}
                          overlay={(props) => (
                            <Tooltip
                              {...props}
                              style={{
                                // eslint-disable-next-line react/prop-types
                                ...props.style,
                                fontSize: "18px"
                              }}
                            >
                              {petData.sizeMessage}
                            </Tooltip>
                          )}
                          placement="bottom"
                        >
                          <Form.Label>
                            Розмір <Badge bg="primary">і</Badge>
                          </Form.Label>
                        </OverlayTrigger>

                        <FormAutocomplete
                          className="form-autocomplete"
                          name="size"
                          placeholder="Вкажіть розмір"
                          options={petData.size}
                          value={editableData.size}
                          handleSelectChange={selectChange}
                        />
                      </Form.Group>
                    )}

                    {/* age */}
                    <Form.Group className="form-group" controlId="age">
                      <Form.Label>Вік</Form.Label>
                      <FormAutocomplete
                        className="form-autocomplete"
                        name="age"
                        placeholder="Вкажіть вік"
                        options={petData.age}
                        value={editableData.age}
                        handleSelectChange={selectChange}
                      />
                    </Form.Group>

                    {/* vaccine */}
                    <Form.Group className="form-group" controlId="vaccine">
                      <Form.Label>Вакцинація</Form.Label>
                      <FormAutocomplete
                        className="form-autocomplete"
                        name="vaccine"
                        placeholder="Чи є вакцинація?"
                        options={optionsBool}
                        value={editableData.vaccine}
                        handleSelectChange={selectChange}
                        menuMaxHeight="102px"
                      />
                    </Form.Group>

                    {/* sterilization */}
                    <Form.Group
                      className="form-group"
                      controlId="sterilization"
                    >
                      <Form.Label>Стерилізація</Form.Label>
                      <FormAutocomplete
                        className="form-autocomplete"
                        name="sterilization"
                        placeholder="Чи є стерилізація?"
                        options={optionsBool}
                        value={editableData.sterilization}
                        handleSelectChange={selectChange}
                        menuMaxHeight="102px"
                      />
                    </Form.Group>

                    {/* pet found or lost location */}

                    <Form.Group className="form-group" controlId="location">
                      <Form.Label>{locationText}</Form.Label>
                      <FormLocation
                        className={`form-autocomplete ${placeholderEditForm} ${
                          validatedInputs.locationCity.isInvalid === true &&
                          "has-error"
                        } `}
                        name="location"
                        getLocation={getLocation}
                        isScriptLoaded={isScriptLoaded}
                        editLocation={editableData.location}
                      />
                      <span className="text-danger">
                        {validatedInputs.locationCity.message}
                      </span>
                    </Form.Group>

                    {/* pet currentLocation */}

                    <Form.Group
                      className="form-group"
                      controlId="currentLocation"
                    >
                      <Form.Label>Місто поточне</Form.Label>
                      <FormLocation
                        className={`form-autocomplete
                        ${placeholderEditForm}`}
                        // ${validatedInputs.currentLocationCity.isInvalid === true && "has-error"}
                        name="currentLocation"
                        getLocation={getLocation}
                        isScriptLoaded={isScriptLoaded}
                        editLocation={editableData.currentLocation}
                      />
                      {/* <span className="text-danger">
                        {validatedInputs.currentLocationCity.message}
                      </span> */}
                    </Form.Group>

                    {/* date */}
                    <div className="form-group">
                      <DateInput
                        validatedInputs={validatedInputs}
                        formData={formData}
                        setFormData={setFormData}
                        setActiveInput={setActiveInput}
                        foundLost={foundLost}
                        editDate={editableData.date}
                      />
                    </div>

                    {/* diseases */}
                    <Form.Group className="form-group" controlId="diseases">
                      <Form.Label>Хвороби</Form.Label>
                      <FormAutocomplete
                        className="form-autocomplete"
                        name="diseases"
                        placeholder="Чи є хвороби?"
                        options={optionsBool}
                        value={editableData.diseases}
                        handleSelectChange={selectChange}
                        menuMaxHeight="102px"
                        // value={formData.diseases}
                      />
                    </Form.Group>
                  </div>

                  {/* Story */}
                  <Form.Group className="story" controlId="story">
                    <Form.Label className="story-label">
                      Опис
                      <span>{formData.story.length}/1000</span>
                    </Form.Label>

                    <Form.Control
                      className={`story-textarea ${placeholderEditForm}`}
                      as="textarea"
                      name="story"
                      placeholder={
                        editableData.story ??
                        "В цьому полі можете додати більше опису та деталей про свою тваринку"
                      }
                      onChange={handleTextareaChange}
                      value={formData.story}
                    />
                  </Form.Group>
                </div>

                {/* Images Upload */}

                {!isEdit && (
                  <ImagesUpload
                    getImageArr={getImageArr}
                    isSubmit={submitted}
                    setActiveInput={setActiveInput}
                  />
                )}

                {/* author-contact */}
                {!isEdit && <h2 className="pet-form-title">Деталі про вас</h2>}

                {!isEdit && whoamiData !== null && (
                  <Row className="author-contact">
                    <Col sm={6}>
                      <Form.Label>Email-адреса</Form.Label>
                      <div className="author-email">{whoamiData.email}</div>
                    </Col>

                    <Col sm={6}>
                      <Form.Group className="" controlId="phone">
                        <Form.Label>Номер телефону</Form.Label>
                        <Form.Control
                          className={`form-phone ${
                            validatedInputs.phone.isInvalid === true &&
                            "has-error"
                          }`}
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={changePhone}
                        />
                        <div className="text-danger">
                          {validatedInputs.phone.message}
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                {/* Submit button */}

                <div className="pet-form-footer mb-3">
                  <button
                    className="sniff-mission-btn mx-auto"
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={!activeInput}
                  >
                    {saubmitBtnText}
                  </button>
                </div>
              </Form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PetRegForm;
