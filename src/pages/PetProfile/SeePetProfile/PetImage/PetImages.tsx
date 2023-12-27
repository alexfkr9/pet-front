import PetImageSlider from "./PetImageSlider/PetImageSlider";
import "./PetImages.scss";
import { apiUrl } from "../../../../api/constants";
import noImage from "../../../../assets/images/no-image.jpg";
import PetStatusBadge from "../../../../components/PetStatusBadge/PetStatusBadge";

const PetImages = ({ postId, type, photoIds }: any) => {
  if (photoIds.length > 1) {
    return <PetImageSlider postId={postId} type={type} photoIds={photoIds} />;
  }
  if (photoIds.length === 1) {
    return (
      <div className="pet-wrapper">
        <PetStatusBadge type={type} />
        <img
          className="see-pet-img"
          src={`${apiUrl}/posts/${postId}/photos/${photoIds[0]}`}
          alt="Pet"
        />
      </div>
    );
  }
  return (
    <div className="pet-wrapper">
      <PetStatusBadge type={type} />
      <img className="see-pet-img" src={noImage} alt="Pet" />;
    </div>
  );
};

export default PetImages;
