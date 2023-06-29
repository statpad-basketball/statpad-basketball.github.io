export const getPageRange = (currentPage, itemsPerPage) => {
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  return { startIndex, endIndex };
};

export const paginateData = (data, currentPage, itemsPerPage) => {
  const { startIndex, endIndex } = getPageRange(currentPage, itemsPerPage);
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    paginatedData,
    maxPage: Math.ceil(data.length / itemsPerPage),
  };
};
