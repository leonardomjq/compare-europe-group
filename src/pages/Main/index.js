import React, { useState, useEffect } from 'react';
import './styles.css';

import axios from 'axios';

const api = 'https://jsonplaceholder.typicode.com/users';

export default function Main() {
  // to show Loading if it's not fully loadead
  const [isLoading, setIsLoading] = useState(false);
  // to fetch the api data
  const [fetchedData, setFetchedData] = useState([]);
  // to catch errors
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get(api);
        setFetchedData(result.data);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);
  console.log('Returned: ', fetchedData);

  return (
    <div>
      <div className='pretty-line'></div>
      <main>
        <h1>Our Awesome Users 👋🏻</h1>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='cards'>
            {fetchedData.map((item) => (
              <div className='card' key={item.id}>
                <ul>
                  <li>
                    <strong>Name: </strong>
                    {item.name}
                  </li>
                  <li>
                    <strong>Username: </strong>
                    {item.username}
                  </li>
                  <li>
                    <strong>Email: </strong>
                    {item.email}
                  </li>
                  <li>
                    <strong>Phone: </strong>
                    {item.phone}
                  </li>
                  <li>
                    <strong>Address: </strong>
                    {item.address.street}, {item.address.suite},{' '}
                    {item.address.city}, {item.address.zipcode}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer>This is footer</footer>
    </div>
  );
}
