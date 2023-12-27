// Count post and group them by month
interface IMonthlyData {
  newUsersCount: number;
}

const monthlyStatistics = (users: any) => {
  // Loop through each users and group them by month
  const MonthlyData: Record<string, IMonthlyData> = {
    "01": { newUsersCount: 0 },
    "02": { newUsersCount: 0 },
    "03": { newUsersCount: 0 },
    "04": { newUsersCount: 0 },
    "05": { newUsersCount: 0 },
    "06": { newUsersCount: 0 },
    "07": { newUsersCount: 0 },
    "08": { newUsersCount: 0 },
    "09": { newUsersCount: 0 },
    "10": { newUsersCount: 0 },
    "11": { newUsersCount: 0 },
    "12": { newUsersCount: 0 }
  };

  for (const user of users) {
    if (user.created != null) {
      const month = user.created.split("-")[1];

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!MonthlyData[month]) {
        MonthlyData[month] = {
          newUsersCount: 0
        };
      }

      MonthlyData[month].newUsersCount++;
    }
  }

  return MonthlyData;
};

export default monthlyStatistics;
