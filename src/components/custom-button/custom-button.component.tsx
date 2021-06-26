import { ReactComponent as Loading } from 'assets/loading.svg';

import './custom-button.styles.scss';

interface CustomButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  isGoogleSignIn?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type?: JSX.IntrinsicElements['button']['type'];
}

const CustomButton = ({
  children,
  isGoogleSignIn = false,
  isLoading,
  disabled,
  type,
  ...otherProps
}: CustomButtonProps): JSX.Element => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`${isGoogleSignIn ? 'google-sign-in ' : ''}custom-button`}
    disabled={disabled || isLoading}
    {...otherProps}
  >
    {!isLoading ? children : <Loading className='loading-svg' />}
  </button>
);

CustomButton.defaultProps = {
  isGoogleSignIn: false,
  isLoading: false,
  disabled: false,
  type: 'button',
};

export default CustomButton;
