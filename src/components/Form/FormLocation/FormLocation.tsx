import React, { useRef } from "react";
import "./FormLocation.scss";

const apiKey = process.env.REACT_APP_GMAP_KEY;
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const extractAddress = (place: { address_components: any[] }) => {
  const address = {
    region: "",
    city: "",
    district: "",
    plain() {
      const region = this.region.length > 0 ? this.region + ", " : "";
      const city = this.city.length > 0 ? this.city + ", " : "";
      return region + city + this.district;
    }
  };

  if (!Array.isArray(place?.address_components)) {
    return address;
  }

  place.address_components.forEach((component) => {
    const types = component.types;
    const value = component.long_name;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (types.includes("administrative_area_level_1")) {
      address.region = value;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (types.includes("locality")) {
      address.city = value;
    }

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (types.includes("sublocality")) {
      address.district = value;
    }
  });

  return address;
};

const FormLocation = ({
  className,
  name,
  getLocation,
  isScriptLoaded,
  editLocation
}: any) => {
  const searchInput: any = useRef(null);

  // do something on address change
  const onChangeAddress = (autocomplete: { getPlace: () => any }) => {
    const place = autocomplete.getPlace();

    // send data to parent component
    getLocation(extractAddress(place), name);
  };

  // init autocomplete

  const initAutocomplete = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!searchInput.current) return;

    const options = {
      componentRestrictions: { country: "ukr" },
      fields: ["address_components"],
      strictBounds: false,
      types: ["administrative_area_level_1", "locality", "sublocality"]
    };

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
      options
    );

    autocomplete.addListener("place_changed", () => {
      onChangeAddress(autocomplete);
    });
  };

  const reverseGeocode = ({
    latitude: lat,
    longitude: lng
  }: {
    latitude: any;
    longitude: any;
  }) => {
    const url = `${geocodeJson}?key=${apiKey}&latlng=${lat},${lng}`;
    searchInput.current.value = "Отримання вашого місцезнаходження...";
    void fetch(url)
      .then(async (response) => await response.json())
      .then((location) => {
        const place = location.results[0];
        const _address = extractAddress(place);

        searchInput.current.value = _address.plain();

        // send data to parent component
        getLocation(_address, name);
      });
  };

  const findMyLocation = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        reverseGeocode(position.coords);
      });
    }
  };

  // if downloaded google map script
  if (isScriptLoaded === true) {
    initAutocomplete();
  }

  return (
    <div className="search-location">
      <input
        className={className}
        ref={searchInput}
        type="text"
        name={name}
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        placeholder={editLocation || "Вкажіть місто"}
      />
      <button onClick={findMyLocation}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
        </svg>
      </button>
    </div>
  );
};

export default FormLocation;
