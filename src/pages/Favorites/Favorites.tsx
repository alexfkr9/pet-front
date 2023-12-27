import { useEffect, useState } from "react";
import "./Favorites.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import PetCard from "../../components/PetCard/PetCard";
import CustomSpinner from "../../components/Spinner/Spinner";
import FavoritesEmpty from "./FavoritesEmpty/FavoritesEmpty";
import { useAppSelector, useAppDispatch } from "../../hooks/hookStore";
import { Alert } from "react-bootstrap";
import { postActions } from "../../store/post/postSlice";
import { postApi } from "../../Api";

const FavoritesPage = () => {
  const dispatch = useAppDispatch();
  const { favoriteList } = useAppSelector((state) => state.favoriteReducer);
  const { userId } = useAppSelector((state) => state.userReducer);
  const [fetchError, setFetchError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [myFavorite, setMyFavorite] = useState<any[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setIsLoading(true);

      try {
        dispatch(postActions.resetInitialState());

        const posts = (await postApi.getPosts(10000000, 10000000, "DESC")).data;

        if (Array(posts).length !== 0 && posts !== undefined) {
          setMyFavorite(posts);
        }

        setFetchError(undefined);
      } catch (e: any) {
        setFetchError(e.message);
        // eslint-disable-next-line no-console
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  const listItems = myFavorite
    ?.filter((post: any) => favoriteList?.includes(post.id))
    .map((favoritePet: any) => (
      <PetCard post={favoritePet} key={favoritePet.id} />
    ));

  return (
    <div className="container">
      <PageHeader text="Улюбленці додані в обране" />
      {(userId === null || isNaN(userId)) && (
        <Alert variant="warning">
          Будь ласка натисніть <Alert.Link href="/auth-form">Увійти</Alert.Link>
          , щоб зберегти улюблені профайли тваринок у власному профілі.
        </Alert>
      )}
      {fetchError !== "Network Error" && (
        <>
          {isLoading ? (
            <CustomSpinner />
          ) : (
            <>
              {listItems.length > 0 ? (
                <div className="sniff-pets-list">{listItems}</div>
              ) : (
                <FavoritesEmpty />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
