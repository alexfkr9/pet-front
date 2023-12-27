import "./Bar.scss";
import { Chart } from "primereact/chart";
import React, { useMemo } from "react";

const Bar = ({ monthlyCounts }: any) => {
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
  //           monthlyCounts !== undefined
  //             ? [
  //                 monthlyCounts["01"].newPostCount,
  //                 monthlyCounts["02"].newPostCount,
  //                 monthlyCounts["03"].newPostCount,
  //                 monthlyCounts["04"].newPostCount,
  //                 monthlyCounts["05"].newPostCount,
  //                 monthlyCounts["06"].newPostCount,
  //                 monthlyCounts["07"].newPostCount,
  //                 monthlyCounts["08"].newPostCount,
  //                 monthlyCounts["09"].newPostCount,
  //                 monthlyCounts["10"].newPostCount,
  //                 monthlyCounts["11"].newPostCount,
  //                 monthlyCounts["12"].newPostCount
  //               ]
  //             : []
  //       },
  //       {
  //         type: "bar",
  //         label: "Нові Хвостики",
  //         backgroundColor: documentStyle.getPropertyValue("--green-500"),
  //         data:
  //           monthlyCounts !== undefined
  //             ? [
  //                 monthlyCounts["01"].newPostCount,
  //                 monthlyCounts["02"].newPostCount,
  //                 monthlyCounts["03"].newPostCount,
  //                 monthlyCounts["04"].newPostCount,
  //                 monthlyCounts["05"].newPostCount,
  //                 monthlyCounts["06"].newPostCount,
  //                 monthlyCounts["07"].newPostCount,
  //                 monthlyCounts["08"].newPostCount,
  //                 monthlyCounts["09"].newPostCount,
  //                 monthlyCounts["10"].newPostCount,
  //                 monthlyCounts["11"].newPostCount,
  //                 monthlyCounts["12"].newPostCount
  //               ]
  //             : [],
  //         borderColor: "white",
  //         borderWidth: 2
  //       },
  //       {
  //         type: "bar",
  //         label: "Знайдені",
  //         backgroundColor: documentStyle.getPropertyValue("--yellow-500"),
  //         data:
  //           monthlyCounts !== undefined
  //             ? [
  //                 monthlyCounts["01"].foundCount,
  //                 monthlyCounts["02"].foundCount,
  //                 monthlyCounts["03"].foundCount,
  //                 monthlyCounts["04"].foundCount,
  //                 monthlyCounts["05"].foundCount,
  //                 monthlyCounts["06"].foundCount,
  //                 monthlyCounts["07"].foundCount,
  //                 monthlyCounts["08"].foundCount,
  //                 monthlyCounts["09"].foundCount,
  //                 monthlyCounts["10"].foundCount,
  //                 monthlyCounts["11"].foundCount,
  //                 monthlyCounts["12"].foundCount
  //               ]
  //             : []
  //       },
  //       {
  //         type: "bar",
  //         label: "Загублені",
  //         backgroundColor: documentStyle.getPropertyValue("--blue-500"),
  //         data:
  //           monthlyCounts !== undefined
  //             ? [
  //                 monthlyCounts["01"].lostCount,
  //                 monthlyCounts["02"].lostCount,
  //                 monthlyCounts["03"].lostCount,
  //                 monthlyCounts["04"].lostCount,
  //                 monthlyCounts["05"].lostCount,
  //                 monthlyCounts["06"].lostCount,
  //                 monthlyCounts["07"].lostCount,
  //                 monthlyCounts["08"].lostCount,
  //                 monthlyCounts["09"].lostCount,
  //                 monthlyCounts["10"].lostCount,
  //                 monthlyCounts["11"].lostCount,
  //                 monthlyCounts["12"].lostCount
  //               ]
  //             : []
  //       }
  //     ]
  //   };
  //   /* eslint-enable */

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
  // }, [monthlyCounts]);

  const documentStyle = getComputedStyle(document.documentElement);

  const data = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!monthlyCounts) return {};

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
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return monthlyCounts[monthIndex]?.newPostCount || 0;
          })
        },
        {
          type: "bar",
          label: "Нові Хвостики",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: Array.from({ length: 12 }, (_, index) => {
            const monthIndex = (index + 1).toString().padStart(2, "0");
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return monthlyCounts[monthIndex]?.newPostCount || 0;
          }),
          borderColor: "white",
          borderWidth: 2
        },
        {
          type: "bar",
          label: "Знайдені",
          backgroundColor: documentStyle.getPropertyValue("--yellow-500"),
          data: Array.from({ length: 12 }, (_, index) => {
            const monthIndex = (index + 1).toString().padStart(2, "0");
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return monthlyCounts[monthIndex]?.foundCount || 0;
          })
        },
        {
          type: "bar",
          label: "Загублені",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          data: Array.from({ length: 12 }, (_, index) => {
            const monthIndex = (index + 1).toString().padStart(2, "0");
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            return monthlyCounts[monthIndex]?.lostCount || 0;
          })
        }
      ]
    };
  }, [monthlyCounts, documentStyle]);

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
    <div className="pets-statistics-bar">
      <div className="header ">
        <span>Статистика тварин за весь період</span>
      </div>

      <div className="card">
        <Chart type="line" data={data} options={options} />
      </div>
    </div>
  );
};

export default React.memo(Bar);
