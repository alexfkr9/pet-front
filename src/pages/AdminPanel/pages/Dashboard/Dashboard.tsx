import "./Dashboard.scss";
import { Col } from "react-bootstrap";
import GeneralStatistics from "./GeneralStatistics/GeneralStatistics";
import PetsStatistics from "./PetsStatistics/PetsStatistics";
import ClientsStatistics from "./ClientsStatistics/ClientsStatistics";
import React, { useEffect, useState } from "react";
import CustomSpinner from "../../../../components/Spinner/Spinner";
import { postApi, userApi } from "../../../../Api"; // postApi
import monthlyStatistics from "../../../../services/statistics/Pets/monthlyStatistics";
import generalStatistics from "../../../../services/statistics/Pets/generalStatistics";
import usersMonthStatistics from "../../../../services/statistics/Users/usersMonthlyStatistics";
import usersGeneralStatistics from "../../../../services/statistics/Users/usersGeneralStatistics";
import { postActions } from "../../../../store/post/postSlice";
import { useAppDispatch } from "../../../../hooks/hookStore";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [petStatistics, setPetStatistics] = useState({});
  const [usersStatistics, setUsersStatistics] = useState({});

  const fetchPetsStatistics = async () => {
    setLoading(true);

    try {
      dispatch(postActions.resetInitialState());
      const posts = (
        await postApi.getPosts(
          Number(BigInt(10000000)),
          Number(BigInt(10000000)),
          "DESC"
        )
      ).data;

      const monthlyCounts = monthlyStatistics(posts);
      const generalCounts = generalStatistics(posts);

      setPetStatistics({
        monthlyCounts,
        ...generalCounts
      });

      setLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setLoading(false);
    }
  };

  const fetchUsersStatistics = async () => {
    setLoading(true);

    try {
      const users = (
        await userApi.getUsers(Number(BigInt(100000)), Number(BigInt(100000)))
      ).data;

      const monthlyCounts = usersMonthStatistics(users);
      const generalCounts = usersGeneralStatistics(users);

      setUsersStatistics({
        monthlyCounts,
        ...generalCounts
      });

      setLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      await fetchPetsStatistics();
      await fetchUsersStatistics();
    })();
  }, []);

  return (
    <Col xl={9} className="sniff-admin-dashboard">
      {loading ? (
        <CustomSpinner />
      ) : (
        <>
          <GeneralStatistics
            petStatistics={petStatistics}
            usersStatistics={usersStatistics}
          />
          <PetsStatistics petStatistics={petStatistics} />
          <ClientsStatistics usersStatistics={usersStatistics} />
        </>
      )}
    </Col>
  );
};

export default React.memo(Dashboard);
