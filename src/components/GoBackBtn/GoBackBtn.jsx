import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './GoBackBtn.module.css';

const GoBackBtn = () => {
  const location = useLocation();
  const backLinkHref = useRef(location.state);

  return (
    <Link to={backLinkHref.current} className={css.link}>
      GoBackBtn
    </Link>
  );
};

export default GoBackBtn;
