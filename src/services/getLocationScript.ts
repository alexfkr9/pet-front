// download google map script for location api

const apiKey = process.env.REACT_APP_GMAP_KEY;
const mapApiJs = "https://maps.googleapis.com/maps/api/js";

// load google map api js
async function loadAsyncScript(src: string) {
  return await new Promise((resolve) => {
    const script = document.createElement("script");
    Object.assign(script, {
      type: "text/javascript",
      async: true,
      src
    });
    script.addEventListener("load", () => {
      resolve(script);
    });
    document.head.appendChild(script);
  });
}

// init gmap script
const initMapScript = async () => {
  // if script already loaded
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (window.google) {
    await Promise.resolve();
    return;
  }
  const src = `${mapApiJs}?key=${apiKey}&language=uk&libraries=places&v=weekly&callback=Function.prototype`;

  return await loadAsyncScript(src);
};

export default initMapScript;
