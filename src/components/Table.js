import React, { useEffect, useState } from 'react';
import { useData, useFilter } from '../context/DataContext';
import StarWarsAPI from '../services/StarWarsAPI';
import { orderby, filterData } from '../helpers/functions';

export default function Table() {
  const { data, setData } = useData();
  const { filters } = useFilter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const results = await StarWarsAPI();
      setData(results);
      setLoading(false);
    };
    loadData();
  }, [setData]);

  if (loading) { return <div className="loading"> Loading... </div>; }
  const headers = Object.keys(data[0]).filter((head) => head !== 'residents');

  return (
    <table className="table-wars">
      <thead>
        <tr>
          {headers.map((head) => (
            <th key={ head }>
              { head }
            </th>))}
        </tr>
      </thead>
      <tbody>
        {orderby(filterData(filters, data), filters).map((planet) => (
          <tr key={ planet.url }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
