import { useMemo } from "react";
import { Chart } from "primereact/chart";

const PieStatus = ({ lostCount, foundCount }: any) => {
  // const [data, setData] = useState({});
  // const [options, setOptions] = useState({});

  // useEffect(() => {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const data = {
  //     labels: ["Загублені", "Знайдені"],
  //     datasets: [
  //       {
  //         data: [lostCount, foundCount],
  //         backgroundColor: [
  //           documentStyle.getPropertyValue("--blue-500"),
  //           documentStyle.getPropertyValue("--yellow-500")
  //         ],
  //         hoverBackgroundColor: [
  //           documentStyle.getPropertyValue("--blue-600"),
  //           documentStyle.getPropertyValue("--yellow-600")
  //         ]
  //       }
  //     ]
  //   };
  //   const options = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           usePointStyle: true
  //         }
  //       }
  //     }
  //   };

  //   setData(data);
  //   setOptions(options);
  // }, [foundCount, lostCount]);

  const documentStyle = getComputedStyle(document.documentElement);

  const data = useMemo(
    () => ({
      labels: ["Загублені", "Знайдені"],
      datasets: [
        {
          data: [lostCount, foundCount],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500")
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-600"),
            documentStyle.getPropertyValue("--yellow-600")
          ]
        }
      ]
    }),
    [lostCount, foundCount, documentStyle]
  );

  const options = useMemo(
    () => ({
      plugins: {
        legend: {
          labels: {
            usePointStyle: true
          }
        }
      }
    }),
    []
  );

  return (
    <div className="pie-status">
      <div className="header ">
        <span>Статистика загублених і знайдених</span>
      </div>

      <Chart
        type="pie"
        data={data}
        options={options}
        className="w-full md:w-30rem"
      />
    </div>
  );
};

export default PieStatus;
