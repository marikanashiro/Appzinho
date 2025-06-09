import { useState, useEffect } from 'react';
import { fetchAnimals } from '../services/petfinder';

const usePetfinder = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAnimals(page).then(newAnimals => {
      setAnimals(prevAnimals => (page === 1 ? newAnimals : [...prevAnimals, ...newAnimals]));
      setLoading(false);
    });
  }, [page]);

  const loadMoreAnimals = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return { animals, loading, loadMoreAnimals };
};

export default usePetfinder;