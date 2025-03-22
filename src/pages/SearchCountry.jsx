import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchByRegion } from '../service/countryApi';
import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import SearchForm from '../components/SearchForm/SearchForm';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const setUrl = region => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('region', region);
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const region = searchParams.get('region');
    if (region === null || region == 'default') return;

    const asyncWrap = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await fetchByRegion(region);
        setCountries(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWrap();
  }, [searchParams]);

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={setUrl} />
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoading && <Loader />}
        {isError && <div>Oooops! Something went wrong. Try again...</div>}
      </Container>
    </Section>
  );
};

export default SearchCountry;
