import { useEffect, useState } from 'react';
import { getCountries } from '../service/countryApi';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const asyncWrap = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await getCountries();
        setCountries(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWrap();
  }, []);

  return (
    <Section>
      <Container>
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoading && <Loader />}
        {isError && <div>Oooops! Something went wrong. Try again...</div>}
      </Container>
    </Section>
  );
};
export default Home;
