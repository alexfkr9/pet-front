const generalStatistics = (posts: any[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const initialCounts = {
    usersCount: 0,
    newUsersToday: 0
  };

  // eslint-disable-next-line array-callback-return
  const counts = posts.reduce((acc, user) => {
    const userDate = new Date(user.created);
    acc.usersCount++;

    if (
      userDate.getDate() === today.getDate() &&
      userDate.getMonth() === today.getMonth() &&
      userDate.getFullYear() === today.getFullYear()
    ) {
      acc.newUsersToday++;
    }

    return acc;
  }, initialCounts);

  return counts;
};

export default generalStatistics;
