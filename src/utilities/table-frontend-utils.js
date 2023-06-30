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

export const goToFirstPage = (setCurrentPage) => {
  setCurrentPage(1);
};

export const goToPreviousPage = (currentPage, setCurrentPage) => {
  if (currentPage > 1) {
    setCurrentPage((prevPage) => prevPage - 1);
  }
};

export const goToNextPage = (
  currentPage,
  setCurrentPage,
  filteredData,
  playersPerPage
) => {
  const maxPage = Math.ceil(filteredData.length / playersPerPage);
  if (currentPage < maxPage) {
    setCurrentPage((prevPage) => prevPage + 1);
  }
};

export const goToLastPage = (setCurrentPage, filteredData, playersPerPage) => {
  const maxPage = Math.ceil(filteredData.length / playersPerPage);
  setCurrentPage(maxPage);
};

export const handleToggleEligibilityButtonClick = (
  button,
  data,
  filteredData,
  setFilteredData,
  setCurrentPage,
  setActiveButton
) => {
  let filteredResult = data;

  if (button === "active") {
    filteredResult = filteredResult.filter((row) => row["Eligible"] === 0);
  } else if (button === "historic") {
    filteredResult = filteredResult.filter((row) => row["Eligible"] === 1);
  }

  setFilteredData(filteredResult);
  setCurrentPage(1); // Reset pagination to first page
  setActiveButton(button);
};

export const isPlayerPresent = (displayedData, playerName) => {
  return displayedData.some((row) => row["Player"] === playerName);
};

export const toggleShowAllStats = (setShowAllStats) => {
  setShowAllStats((prevState) => !prevState);
};
