import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const SearchCountry = lazy(() => import('./pages/SearchCountry'));
const Country = lazy(() => import('./pages/Country'));
const Header = lazy(() => import('./components/Header/Header'));

export const App = () => {
  return (
    <>
      <Header />

      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country" element={<SearchCountry />} />
          <Route path="/country/:countryId" element={<Country />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </>
  );
};
