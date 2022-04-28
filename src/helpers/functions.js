export function orderby(filteredData, filters) {
  const { order } = filters;
  if (order) {
    const { column, sort } = order;
    if (sort === 'DESC') {
      return filteredData.sort((a, b) => b[column] - a[column]);
    }
    return filteredData.sort((a, b) => a[column] - b[column]);
  }
  return filteredData.sort((a, b) => {
    const op2 = -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return op2;
    return 0;
  });
}

export function filterData(filters, data) {
  const { filterByName, filterByNumericValues: fbnv } = filters;
  const { name: filterName } = filterByName;
  let filteredData = data;
  if (filterName) {
    filteredData = filteredData
      .filter(({ name }) => name.toLowerCase().includes(filterName));
  }
  if (fbnv) {
    fbnv.forEach((e) => {
      switch (e.comparison) {
      case 'maior que':
        filteredData = filteredData
          .filter((item) => (Number(item[e.column]) > Number(e.value)));
        break;
      case 'menor que':
        filteredData = filteredData
          .filter((item) => (Number(item[e.column]) < Number(e.value)));
        break;
      case 'igual a':
        filteredData = filteredData
          .filter((item) => (Number(item[e.column]) === Number(e.value)));
        break;
      default:
        return filteredData;
      }
    });
  }

  return filteredData;
}

export function addToContext(params) {
  const {
    filters,
    filterByNumeric,
    setFilters,
    setFilterOp,
    setFilterByNumeric,
    filterOp,
  } = params;

  const filterByNumericValues = [filterByNumeric];
  const { column } = filterByNumeric;

  if (filters.filterByNumericValues) {
    setFilters((prev) => (
      { ...prev,
        filterByNumericValues: [...prev.filterByNumericValues, filterByNumeric] }
    ));
    const newOptions = filterOp.filter((item) => item !== column);
    setFilterOp(newOptions);
    setFilterByNumeric({ ...filterByNumeric, column: newOptions[0], value: 0 });
  } else {
    setFilters((prev) => ({ ...prev, filterByNumericValues }));
    const newOptions = filterOp.filter((item) => item !== column);
    setFilterOp(newOptions);
    setFilterByNumeric({ ...filterByNumeric, column: newOptions[0], value: 0 });
  }
}
