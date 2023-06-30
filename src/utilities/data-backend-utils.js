import axios from "axios";

// fetch the data from the server
export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:2000/rankings");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// sort the data
export const sortData = (data, colToSortBy) => {
  return data.slice().sort((a, b) => b[colToSortBy] - a[colToSortBy]);
};

// filter the data based on a set of filters
export const filterData = (data, filters) => {
  return data.filter((player) =>
    Object.entries(filters).every(([column, filterValue]) => {
      if (column === "Eligible") {
        return player[column] === filterValue;
      } else {
        return player[column] >= filterValue || filterValue === 0;
      }
    })
  );
};

export const handleSearchAndFilter = (
  data,
  filters,
  searchText,
  setFilteredData
) => {
  let filteredResult = data;

  if (Object.keys(filters).length > 0) {
    // Apply filters
    filteredResult = filterData(filteredResult, filters);
  }

  if (searchText !== "") {
    // Apply search within the filtered data
    filteredResult = filteredResult.filter((row) =>
      row["Player"].toLowerCase().startsWith(searchText.toLowerCase())
    );
  }

  setFilteredData(filteredResult);
};

export const handleFilter = (data, filters, setFilteredData) => {
  const filteredResult = filterData(data, filters);
  setFilteredData(filteredResult);
};

export const handleResetFilters = (
  data,
  filters,
  setFilters,
  setFilteredData,
  setSearchText
) => {
  //setFilters({});

  const updatedFilters = { ...filters }; // Create a copy of the filters

  // Remove all filters except "Eligible"
  Object.keys(updatedFilters).forEach((key) => {
    if (key !== "Eligible") {
      delete updatedFilters[key];
    }
  });

  setFilters(updatedFilters); // Update the filters state

  if (setSearchText) {
    setSearchText(""); // Reset the search input if setSearchText is defined
  }
  //setFilteredData(data);
  const filteredResult = filterData(data, updatedFilters);

  setFilteredData(filteredResult);
};

export const handleFilterChange = (column, value, setFilters) => {
  setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
};

export const handleToggleEligibilityButtonClick = (
  button,
  data,
  filters,
  searchText,
  setFilters,
  setFilteredData,
  setCurrentPage,
  setActiveButton
) => {
  // Create a copy of filters object
  const updatedFilters = { ...filters };

  if (button === "active") {
    updatedFilters["Eligible"] = 0; // Append the filter for 'active' button
  } else if (button === "historic") {
    updatedFilters["Eligible"] = 1; // Append the filter for 'historic' button
  } else if (button === "all") {
    delete updatedFilters["Eligible"]; // Append the filter for 'historic' button
  }

  // Reset pagination to first page
  setCurrentPage(1);

  // Set the active button
  setActiveButton(button);
  setFilters(updatedFilters); // Update the filters state
  // Call handleSearchAndFilter with updated filters and searchText
  handleSearchAndFilter(data, updatedFilters, searchText, setFilteredData);
};
