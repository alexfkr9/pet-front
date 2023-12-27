import "./MyPets.scss";
import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useAppSelector, useAppDispatch } from "../../hooks/hookStore";
import CustomSpinner from "../../components/Spinner/Spinner";
import Img from "../../assets/images/img-07.jpg";
import PetCard from "../../components/PetCard/PetCard";
import { postActions } from "../../store/post/postSlice";
import { postApi } from "../../Api";

const MyPets = () => {
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((state) => state.userReducer);

  const [fetchError, setFetchError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [myPets, setMyPets] = useState<any[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const fetchMyPets = async (id: number) => {
      setIsLoading(true);

      try {
        dispatch(postActions.resetInitialState());

        const posts = (await postApi.getPosts(10000000, 10000000, "DESC", id))
          .data;

        if (Array(posts).length !== 0 && posts !== undefined) {
          setMyPets(posts);
        }

        setFetchError(undefined);
      } catch (e: any) {
        setFetchError(e.message);
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId != null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchMyPets(userId);
    }
  }, [userId, dispatch]);

  return (
    <section className="sniff-my-pets section">
      <div className="container">
        {myPets.length > 0 && <PageHeader text="Вами створені улюбленці" />}

        {fetchError !== "Network Error" && (
          <>
            {isLoading ? (
              <CustomSpinner />
            ) : (
              <>
                {myPets.length > 0 ? (
                  <div className="sniff-pets-list">
                    {myPets.map((item: any, key: any) => (
                      <PetCard post={item} key={key} isMyPets={true} />
                    ))}
                  </div>
                ) : (
                  <div className="no-content text-center mb-4 m-5">
                    <h4>Ви ще не створили жодного профайлу тваринки</h4>
                    <div>
                      <img
                        src={Img}
                        alt="Favorite pet"
                        className="rounded mx-auto d-block img-fluid"
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MyPets;
