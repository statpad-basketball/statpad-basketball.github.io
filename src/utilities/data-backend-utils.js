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
    Object.entries(filters).every(
      ([column, filterValue]) =>
        player[column] >= filterValue || filterValue === 0
    )
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
  setFilters,
  setFilteredData,
  setSearchText
) => {
  setFilters({});
  if (setSearchText) {
    setSearchText(""); // Reset the search input if setSearchText is defined
  }
  setFilteredData(data);
};

export const handleFilterChange = (column, value, setFilters) => {
  setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
};
