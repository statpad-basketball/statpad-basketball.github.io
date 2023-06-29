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

export const handleToggleEligibilityButtonClick = (
  button,
  data,
  filteredData,
  setFilteredData,
  setCurrentPage
) => {
  let filteredResult = data;

  if (button === "active") {
    filteredResult = filteredResult.filter((row) => row["Eligible"] === 0);
  } else if (button === "historic") {
    filteredResult = filteredResult.filter((row) => row["Eligible"] === 1);
  }

  setFilteredData(filteredResult);
  setCurrentPage(1); // Reset pagination to first page
};
