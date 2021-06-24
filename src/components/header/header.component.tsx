import { Link } from 'react-router-dom';
import { FC, ReactElement } from 'react';

// eslint-disable-next-line import/no-unresolved
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header: FC = (): ReactElement => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {/* {currentUser ? (
        <Link className='option' to='/' onClick={() => auth.signOut()}>
          SIGN OUT
        </Link>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )} */}
    </div>
  </div>
);

export default Header;
