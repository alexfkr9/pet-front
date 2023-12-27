import React, { useEffect, useRef, useState } from "react";
import "./LogHistory.scss";
import { Col } from "react-bootstrap";
import { logApi } from "../../../../Api";
import CustomSpinner from "../../../../components/Spinner/Spinner";
import { AuditLog } from "../../../../client";
import Content from "./Content";

const LogHistory = () => {
  const [loading, setLoading] = useState(false);
  const [isAllDataFetched, setIsAllDataFetched] = useState(false);

  const [logData, setLogData] = useState<AuditLog[]>([]);
  const [lastID, setLastID] = useState(1000000000000000000000);
  const intObserver = useRef<IntersectionObserver | null>(null);

  const fetchLogs = async () => {
    if (isAllDataFetched) return;

    setLoading(true);
    try {
      const logs = (await logApi.getLogs(lastID, 10)).data;

      if (logs.length !== 0 && logs !== undefined) {
        setLastID(Number(logs[logs.length - 1].id));
        setLogData((prev) => [...(prev ?? []), ...logs]);
      } else {
        setIsAllDataFetched(true);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !isAllDataFetched) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchLogs();
    }

    return () => {
      if (intObserver.current != null) {
        intObserver.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastPostRef = (item: any) => {
    if (loading || isAllDataFetched) return;

    if (intObserver.current != null) intObserver.current.disconnect();

    intObserver.current = new IntersectionObserver((item) => {
      if (item[0].isIntersecting) {
        // console.log("We are near the last post!");
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        fetchLogs();
      }
    });

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (item) intObserver.current.observe(item);
  };

  if (logData.length === 0) {
    return (
      <Col xl={9} className="sniff-admin-log-history">
        <p>Список порожній</p>
      </Col>
    );
  }

  return (
    <Col xl={9} className="sniff-admin-log-history">
      {loading && <CustomSpinner />}

      {logData.map((item, i) => (
        <Content
          item={item}
          key={item.id}
          ref={i === logData.length - 1 ? lastPostRef : undefined}
        />
      ))}
    </Col>
  );
};

export default React.memo(LogHistory);
