import { apiUrl } from "../../../../api/constants";
import noImage from "../../../../assets/images/no-image.jpg";

const ImageBodyTemplate = ({ id, photoIds }: any) => {
  const srcImg =
    photoIds.length > 0
      ? `${apiUrl}/posts/${id}/photos/${photoIds[0]}`
      : noImage;

  return (
    <img
      src={srcImg}
      alt={"Фото"}
      className="shadow-2 border-round"
      style={{ width: "64px", height: "64", objectFit: "cover" }}
    />
  );
};

export default ImageBodyTemplate;
