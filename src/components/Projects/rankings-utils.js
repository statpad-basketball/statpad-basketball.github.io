import axios from 'axios';

// fetch the data from the server
export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:2000/rankings');
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// sort the data
export const sortData = (data, colToSortBy) => {
  return data.slice().sort((a, b) => b[colToSortBy] - a[colToSortBy]);
};

// filter the data based on a set of filters
export const filterData = (data, filters) => {
  return data.filter((player) =>
    Object.entries(filters).every(([column, filterValue]) => player[column] >= filterValue || filterValue === 0)
  );
};

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