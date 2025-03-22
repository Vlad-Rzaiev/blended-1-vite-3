import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from '../service/countryApi';
import Container from '../components/Container/Container';
import Section from '../components/Section/Section';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import Loader from '../components/Loader/Loader';

const Country = () => {
  const [countryInfo, setCountryInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { countryId } = useParams();

  useEffect(() => {
    const asyncWrap = async () => {
      try {
        setIsError(false);
        setIsLoading(true);

        const data = await fetchCountry(countryId);
        setCountryInfo(data);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    asyncWrap();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn />
        {Object.keys(countryInfo).length > 0 && (
          <CountryInfo countryInfo={countryInfo} />
        )}
        {isLoading && <Loader />}
        {isError && <div>Oooops! Something went wrong. Try again...</div>}
      </Container>
    </Section>
  );
};

export default Country;
