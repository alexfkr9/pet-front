import "./FavoriteButton.scss";
import Heart from "../Icons/Heart";
import { useAppDispatch, useAppSelector } from "../../hooks/hookStore";
import { favoriteThunks } from "../../store/favorites";
import { toggleFavorite } from "../../store/favorites/favoriteSlice";
import { useEffect } from "react";

interface IProps {
  id: number;
}

const FavoriteButton = ({ id }: IProps) => {
  const { favoriteList } = useAppSelector((state) => state.favoriteReducer);
  const { userId } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const isFavorite = favoriteList?.includes(id) === true ? "active" : "";

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        if (userId !== null && !isNaN(userId)) {
          await dispatch(favoriteThunks.fetchFavourites(userId));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    })();
  }, [dispatch, userId]);

  const handleToggleFavorite = async (id: any) => {
    if (userId != null && !isNaN(userId)) {
      favoriteList?.includes(id) === true
        ? await dispatch(favoriteThunks.deleteFavourite({ userId, postId: id }))
        : await dispatch(favoriteThunks.addFavorite({ userId, postId: id }));
      await dispatch(favoriteThunks.fetchFavourites(userId));
    } else {
      dispatch(toggleFavorite(id));
    }
  };

  return (
    <button
      className={`favorite-btn ${isFavorite}`}
      onClick={async (event: any) => {
        await handleToggleFavorite(id);
      }}
    >
      <Heart />
    </button>
  );
};

export default FavoriteButton;
