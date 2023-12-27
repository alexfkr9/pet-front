import "./Pets.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import PageHeader from "../../../components/PageHeader/PageHeader";
import Filter from "./Filter/Filter";
import CustomSpinner from "../../../components/Spinner/Spinner";
import { Row, Col } from "react-bootstrap";
import PetList from "./PetList";
import { postThunks } from "../../../store/post";
import { useAppDispatch, useAppSelector } from "../../../hooks/hookStore";

const Pets = () => {
  const dispatch = useAppDispatch();
  const intObserver = useRef<IntersectionObserver | null>(null);
  const [activeFilter, setActiveFilter] = useState(false);

  const { lastID, postsList, status, fetchError, isAllDataFetched } =
    useAppSelector((state) => state.postReducer);

  // Filter Data
  const [filterData, setFilterData] = useState({
    order: "DESC",
    id: undefined,
    type: undefined,
    breed: undefined,
    color: undefined,
    size: undefined,
    age: undefined,
    vaccine: undefined,
    sterilization: undefined,
    gender: undefined,
    diseases: undefined,
    status: undefined,
    lostDateAfter: undefined,
    foundDateAfter: undefined,
    postCreatedDate: undefined,
    region: undefined,
    city: undefined,
    district: undefined
  });

  // fn for fetch Posts
  const fetchPosts = useCallback(async () => {
    try {
      const queryParams = Object.values(filterData);
      await dispatch(postThunks.fetchPosts([15, lastID, ...queryParams]));

      setActiveFilter(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setActiveFilter(false);
    }
  }, [dispatch, filterData, lastID]);

  useEffect(() => {
    if (status !== "loading") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchPosts();
    }

    return () => {
      if (intObserver.current != null) {
        intObserver.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  // infinite scroll
  const lastPostRef = (item: any) => {
    if (status === "loading" || isAllDataFetched) return;

    if (intObserver.current != null) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((item) => {
      if (item[0].isIntersecting) {
        // console.log("We are near the last post!");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchPosts();
      }
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (item) intObserver.current.observe(item);
  };

  const headerText =
    postsList.length > 0
      ? "Скроль вниз, аби побачити більше хвостатих"
      : "Не знайдено жодної тваринки :(";

  return (
    <section className="section section-pets-gallery" id="pets-gallery">
      <div className="container">
        <Row>
          <PageHeader text={headerText} />
        </Row>

        {fetchError !== "Network Error" && status !== "failed" && (
          <Row>
            {activeFilter && (
              <Col className="filter-container">
                <Filter
                  filterData={filterData}
                  setFilterData={setFilterData}
                  totalCount={postsList.length}
                />
              </Col>
            )}

            <Col xl={9}>
              {status === "loading" && <CustomSpinner />}

              {postsList.length > 0 ? (
                <PetList sorterData={postsList} lastPostRef={lastPostRef} />
              ) : (
                <p>
                  За обраними фільтрами було знайдено 0 результатів. Ви можете
                  змінити фільтри і спробувати ще раз
                </p>
              )}
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
};

export default Pets;
