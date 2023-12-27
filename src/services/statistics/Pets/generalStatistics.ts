const generalStatistics = (posts: any[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const initialCounts = {
    postCount: 0,
    lostCount: 0,
    foundCount: 0,
    newPostsToday: 0,
    lostPostsToday: 0,
    foundPostsToday: 0,
    catsCount: 0,
    dogsCount: 0,
    otherCount: 0
  };

  // eslint-disable-next-line array-callback-return
  const counts = posts.reduce((acc, post) => {
    const postDate = new Date(post.postCreatedDate);
    acc.postCount++;

    // Status
    if (post.type === "LOST") {
      acc.lostCount++;
    } else if (post.type === "FOUND") {
      acc.foundCount++;
    }

    // Pet Type
    if (post.pet.type === "DOG") {
      acc.dogsCount++;
    } else if (post.pet.type === "CAT") {
      acc.catsCount++;
    } else {
      acc.otherCount++;
    }

    if (
      postDate.getDate() === today.getDate() &&
      postDate.getMonth() === today.getMonth() &&
      postDate.getFullYear() === today.getFullYear()
    ) {
      acc.newPostsToday++;

      if (post.type === "LOST") {
        acc.lostPostsToday++;
      } else if (post.type === "FOUND") {
        acc.foundPostsToday++;
      }
    }

    return acc;
  }, initialCounts);

  return counts;
};

export default generalStatistics;
