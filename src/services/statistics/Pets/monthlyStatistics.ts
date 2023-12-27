// Count post and group them by month
interface IMonthlyData {
  newPostCount: number;
  lostCount: number;
  foundCount: number;
}

const monthlyStatistics = (posts: any) => {
  // Loop through each post and group them by month
  const MonthlyData: Record<string, IMonthlyData> = {
    "01": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "02": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "03": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "04": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "05": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "06": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "07": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "08": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "09": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "10": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "11": { newPostCount: 0, lostCount: 0, foundCount: 0 },
    "12": { newPostCount: 0, lostCount: 0, foundCount: 0 }
  };

  for (const post of posts) {
    if (post.postCreatedDate != null) {
      const month = post.postCreatedDate.split("-")[1];

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!MonthlyData[month]) {
        MonthlyData[month] = {
          newPostCount: 0,
          lostCount: 0,
          foundCount: 0
        };
      } else {
        MonthlyData[month].newPostCount++;
        if (post.type === "LOST") {
          MonthlyData[month].lostCount++;
        } else if (post.type === "FOUND") {
          MonthlyData[month].foundCount++;
        }
      }
    }
  }

  return MonthlyData;
};

export default monthlyStatistics;
