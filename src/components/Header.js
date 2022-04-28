import React, { useState } from 'react';
import { useFilter } from '../context/DataContext';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { addToContext } from '../helpers/functions';

const FILTER_OP = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
const INITIAL_STATE = { column: 'population', comparison: 'maior que', value: 0 };
const INITIAL_SORT = { column: 'population', sort: 'ASC' };

export default function Header() {
  const [filterByNumeric, setFilterByNumeric] = useState(INITIAL_STATE);
  const [filterOp, setFilterOp] = useState(FILTER_OP);
  const [order, setOrder] = useState(INITIAL_SORT);
  const { filters, setFilters } = useFilter();

  const handleChange = ({ target: { value } }) => {
    value = value.toLowerCase();
    setFilters((prev) => ({ ...prev, filterByName: { name: value } }));
  };

  const handleOption = ({ target: { name, value } }) => {
    setFilterByNumeric((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = ({ target: { name, value } }) => {
    setOrder((prev) => ({ ...prev, [name]: value }));
  };

  const orderSubmit = () => {
    setFilters((prev) => ({ ...prev, order }));
  };

  const remFilter = ({ target: { value } }) => {
    const { filterByNumericValues } = filters;
    const remFiltro = filterByNumericValues.filter(({ column }) => column !== value);
    setFilters((prev) => ({ ...prev, filterByNumericValues: remFiltro }));
    setFilterOp((prev) => [...prev, value]);
  };

  const { column, comparison, value } = filterByNumeric;
  const { filterByName: { name } } = filters;
  const { filterByNumericValues } = filters;
  const { column: sColumn, sort } = order;
  const paramAddToContext = {
    filters, filterByNumeric, setFilters, setFilterOp, setFilterByNumeric, filterOp };
  return (
    <header className="header-container">
      <section>
        <div>
          <Input
            type="text"
            name="name-filter"
            testId="name-filter"
            holder="Filtre por nome"
            onChange={ handleChange }
            value={ name }
            id="name-filter"
          />
        </div>
        <div>
          <Select
            testId="column-filter"
            name="column"
            id="column"
            label="Filter by: "
            onChange={ handleOption }
            options={ filterOp }
            value={ column }
          />
          <Select
            testId="comparison-filter"
            name="comparison"
            id="comparison"
            onChange={ handleOption }
            options={ ['maior que', 'menor que', 'igual a'] }
            value={ comparison }
          />
          <Input
            type="number"
            testId="value-filter"
            name="value"
            id="value"
            onChange={ handleOption }
            value={ value }
          />
          <Button
            label="add"
            testId="button-filter"
            onClick={ () => addToContext(paramAddToContext) }
          />
        </div>
        <div>
          <Select
            testId="column-sort"
            name="column"
            id="column"
            label="Order by: "
            onChange={ handleOrder }
            options={ filterOp }
            value={ sColumn }
          />
          <Input
            type="radio"
            label="ASC"
            testId="column-sort-input-asc"
            name="sort"
            onChange={ handleOrder }
            value="ASC"
            checked={ sort === 'ASC' }
            className="sort-btn"
          />
          <Input
            type="radio"
            label="DESC"
            testId="column-sort-input-desc"
            name="sort"
            onChange={ handleOrder }
            value="DESC"
            checked={ sort === 'DESC' }
            className="sort-btn"
          />
          <Button
            type="button"
            label="ok"
            testId="column-sort-button"
            onClick={ orderSubmit }
          />
        </div>
      </section>
      <div className="filters-container">
        {filterByNumericValues && (
          filterByNumericValues.map((item) => (
            <ul key={ item.column } data-testid="filter">
              <li>
                {JSON.stringify(Object.values(item))}
                <Button
                  type="button"
                  label="X"
                  value={ item.column }
                  onClick={ remFilter }
                />
              </li>
            </ul>
          ))
        )}
      </div>
    </header>
  );
}
