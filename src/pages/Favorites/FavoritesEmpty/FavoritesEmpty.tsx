import Img from "../../../assets/images/img-07.jpg";

const FavoritesEmpty = () => {
  return (
    <div className="no-content text-center mb-4">
      <h4> На жаль, ви поки не додали в обране жодну тваринку</h4>
      <div>
        <img
          src={Img}
          alt="Favorite pet"
          className="rounded mx-auto d-block img-fluid"
        />
      </div>
    </div>
  );
};

export default FavoritesEmpty;
