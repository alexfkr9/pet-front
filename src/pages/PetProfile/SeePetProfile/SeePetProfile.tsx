import { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { postApi } from "../../../Api";
import PetImages from "./PetImage/PetImages";
import PetData from "./PetData/PetData";
import Author from "./Author/Author";
import PetDescription from "./PetDescription/PetDescription";
import "./SeePetProfile.scss";
import Back from "../../../components/Back/Back";
import CustomSpinner from "../../../components/Spinner/Spinner";

const SeePetProfile = () => {
  const [loading, setLoading] = useState(true);
  const postIdObj = useParams();
  const location = useLocation();
  const myPets = location.state;

  const postId = Number(postIdObj.id);
  const [post, setPost] = useState<{
    id: number;
    type: string;
    story: string;
    postCreatedDate: string;
    foundLocation: string;
    lostLocation: string;
    currentLocation: null;
    photoIds: number[];
    author: { firstName: string };
    pet: { gender: string };
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    postApi
      .getPostById(postId)
      .then((response: any) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  }, [postId]);

  let petImages, petData;
  if (post !== null) {
    petImages = (
      <PetImages postId={post.id} type={post.type} photoIds={post.photoIds} />
    );

    petData = <PetData post={post} location={<FullLocation />} />;
  }

  function FullLocation() {
    const location: any =
      post?.foundLocation !== null ? post?.foundLocation : post?.lostLocation;
    if (location?.district === "" || location?.district === null) {
      return <>{location?.city}</>;
    } else {
      return (
        <>
          {location?.city}
          {location?.district === "" ? "" : ", "}
          {location?.district.replace(" район", "")}
        </>
      );
    }
  }

  // background color
  const color = () => {
    const gender = post?.pet?.gender;
    if (gender === "MALE") {
      return "blue";
    }
    if (gender === "FEMALE") {
      return "red";
    }
    return "green";
  };

  const navigate = useNavigate();
  function deletePost() {
    postApi
      .deletePost(postId)
      .then((response: any) => {
        navigate("/my-pets");
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error("Еrror:", error);
      });
  }

  return (
    <>
      {loading ? (
        <CustomSpinner />
      ) : (
        <section className={`pet-section ${color()}`}>
          <div className="container-pet-profile">
            <div className="pet-profile-link">
              <Back />
            </div>
            <div className="pet-row">
              <div className="pet-image widget-pet-profile">{petImages}</div>
              <div className="pet-text">
                <div className="pet-data widget-pet-profile">{petData}</div>
                <div className="pet-author widget-pet-profile">
                  {post != null && <Author post={post} />}
                </div>
              </div>
            </div>
            <div className="pet-description widget-pet-profile">
              <PetDescription
                story={post?.story}
                location={<FullLocation />}
                date={post?.postCreatedDate}
              />
            </div>

            {/* Edit and delete button for My pets */}

            {Boolean(myPets) && (
              <div className="pet-button-wrapper">
                <Link
                  className="btn-primary home-stories-btn pet-button"
                  to="/edit-pet"
                  state={{ isEdit: myPets, postId: post?.id }}
                >
                  Редагувати профіль тваринки
                </Link>

                <button
                  className="btn-primary home-stories-btn pet-button"
                  onClick={deletePost}
                >
                  Видалити профіль тваринки
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SeePetProfile;
