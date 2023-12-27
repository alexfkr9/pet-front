import { useMemo } from "react";
import { Chart } from "primereact/chart";

const PieBreeds = ({ dogsCount, catsCount, otherCount }: any) => {
  // const [data, setData] = useState({});
  // const [options, setOptions] = useState({});

  // useEffect(() => {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const data = {
  //     labels: ["Коти", "Собаки", "Інші"],
  //     datasets: [
  //       {
  //         data: [catsCount, dogsCount, otherCount],
  //         backgroundColor: [
  //           documentStyle.getPropertyValue("--green-500"),
  //           documentStyle.getPropertyValue("--purple-500"),
  //           documentStyle.getPropertyValue("--blue-300")
  //         ],
  //         hoverBackgroundColor: [
  //           documentStyle.getPropertyValue("--green-700"),
  //           documentStyle.getPropertyValue("--purple-700"),
  //           documentStyle.getPropertyValue("--blue-700")
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
  // }, [catsCount, dogsCount, otherCount]);

  const documentStyle = getComputedStyle(document.documentElement);

  const data = useMemo(
    () => ({
      labels: ["Коти", "Собаки", "Інші"],
      datasets: [
        {
          data: [catsCount, dogsCount, otherCount],
          backgroundColor: [
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--purple-500"),
            documentStyle.getPropertyValue("--blue-300")
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--green-700"),
            documentStyle.getPropertyValue("--purple-700"),
            documentStyle.getPropertyValue("--blue-700")
          ]
        }
      ]
    }),
    [catsCount, dogsCount, otherCount, documentStyle]
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
    <div className="pie-breeds">
      <div className="header ">
        <span>Статистика за породою</span>
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

export default PieBreeds;
