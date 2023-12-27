import "./ClientsStatistics.scss";
import { Col } from "react-bootstrap";
import React, { useMemo } from "react";
import { Chart } from "primereact/chart";

const ClientsStatistics = ({ usersStatistics }: any) => {
  // const [data, setData] = useState({});
  // const [options, setOptions] = useState({});

  // useEffect(() => {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue("--text-color");
  //   const textColorSecondary = documentStyle.getPropertyValue(
  //     "--text-color-secondary"
  //   );
  //   const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
  //   const data = {
  //     labels: [
  //       "Січень",
  //       "Лютий",
  //       "Березень",
  //       "Квітень",
  //       "Травень",
  //       "Червень",
  //       "Липень",
  //       "Серпень",
  //       "Вересень",
  //       "Жовтень",
  //       "Листопад",
  //       "Грудень"
  //     ],
  //     /* eslint-disable */
  //     datasets: [
  //       {
  //         type: "line",
  //         label: "Лінія",
  //         borderColor: documentStyle.getPropertyValue("--cyan-700"),
  //         borderWidth: 2,
  //         fill: false,
  //         tension: 0.4,
  //         data:
  //           usersStatistics.monthlyCounts !== undefined
  //             ? [
  //                 usersStatistics.monthlyCounts["01"].newUsersCount,
  //                 usersStatistics.monthlyCounts["02"].newUsersCount,
  //                 usersStatistics.monthlyCounts["03"].newUsersCount,
  //                 usersStatistics.monthlyCounts["04"].newUsersCount,
  //                 usersStatistics.monthlyCounts["05"].newUsersCount,
  //                 usersStatistics.monthlyCounts["06"].newUsersCount,
  //                 usersStatistics.monthlyCounts["07"].newUsersCount,
  //                 usersStatistics.monthlyCounts["08"].newUsersCount,
  //                 usersStatistics.monthlyCounts["09"].newUsersCount,
  //                 usersStatistics.monthlyCounts["10"].newUsersCount,
  //                 usersStatistics.monthlyCounts["11"].newUsersCount,
  //                 usersStatistics.monthlyCounts["12"].newUsersCount
  //               ]
  //             : []
  //       },
  //       {
  //         type: "bar",
  //         label: "Нові Користувачі",
  //         backgroundColor: documentStyle.getPropertyValue("--blue-300"),
  //         data:
  //           usersStatistics.monthlyCounts !== undefined
  //             ? [
  //                 usersStatistics.monthlyCounts["01"].newUsersCount,
  //                 usersStatistics.monthlyCounts["02"].newUsersCount,
  //                 usersStatistics.monthlyCounts["03"].newUsersCount,
  //                 usersStatistics.monthlyCounts["04"].newUsersCount,
  //                 usersStatistics.monthlyCounts["05"].newUsersCount,
  //                 usersStatistics.monthlyCounts["06"].newUsersCount,
  //                 usersStatistics.monthlyCounts["07"].newUsersCount,
  //                 usersStatistics.monthlyCounts["08"].newUsersCount,
  //                 usersStatistics.monthlyCounts["09"].newUsersCount,
  //                 usersStatistics.monthlyCounts["10"].newUsersCount,
  //                 usersStatistics.monthlyCounts["11"].newUsersCount,
  //                 usersStatistics.monthlyCounts["12"].newUsersCount
  //               ]
  //             : [],
  //         borderColor: "white",
  //         borderWidth: 2
  //       }
  //     ]
  //     /* eslint-enable */
  //   };
  //   const options = {
  //     maintainAspectRatio: false,
  //     aspectRatio: 0.6,
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor
  //         }
  //       }
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: surfaceBorder
  //         }
  //       },
  //       y: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: surfaceBorder
  //         }
  //       }
  //     }
  //   };

  //   setData(data);
  //   setOptions(options);
  // }, [usersStatistics.monthlyCounts]);

  const documentStyle = getComputedStyle(document.documentElement);

  const data = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!usersStatistics.monthlyCounts) return {};

    return {
      labels: [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень"
      ],
      datasets: [
        {
          type: "line",
          label: "Лінія",
          borderColor: documentStyle.getPropertyValue("--cyan-700"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: Array.from({ length: 12 }, (_, index) => {
            const monthIndex = (index + 1).toString().padStart(2, "0");
            return (
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              usersStatistics.monthlyCounts[monthIndex]?.newUsersCount || 0
            );
          })
        },
        {
          type: "bar",
          label: "Нові Користувачі",
          backgroundColor: documentStyle.getPropertyValue("--blue-300"),
          data: Array.from({ length: 12 }, (_, index) => {
            const monthIndex = (index + 1).toString().padStart(2, "0");
            return (
              // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
              usersStatistics.monthlyCounts[monthIndex]?.newUsersCount || 0
            );
          }),
          borderColor: "white",
          borderWidth: 2
        }
      ]
    };
  }, [usersStatistics.monthlyCounts, documentStyle]);

  const options = useMemo(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: documentStyle.getPropertyValue("--text-color")
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: documentStyle.getPropertyValue("--text-color-secondary")
          },
          grid: {
            color: documentStyle.getPropertyValue("--surface-border")
          }
        },
        y: {
          ticks: {
            color: documentStyle.getPropertyValue("--text-color-secondary")
          },
          grid: {
            color: documentStyle.getPropertyValue("--surface-border")
          }
        }
      }
    };
  }, []);

  return (
    <Col xl={9} className="dashboard-clients-statistics">
      <div className="header ">
        <span>Статистика користувачів за весь період</span>
      </div>

      <div className="card">
        <Chart type="line" data={data} options={options} />
      </div>
    </Col>
  );
};

export default React.memo(ClientsStatistics);
