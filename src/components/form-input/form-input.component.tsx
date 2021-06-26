import './form-input.styles.scss';

type FormInputProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  type: string | 'text';
  name: string;
  label: string;
  value: string | '';
  required: boolean | false;
};

const FormInput = ({ handleChange, label, ...otherProps }: FormInputProps): JSX.Element => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {label ? (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className={`${otherProps.value?.length ? 'shrink' : ''} form-input-label`}>
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
