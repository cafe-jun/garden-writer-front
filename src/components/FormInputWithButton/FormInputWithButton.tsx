import { useMemo } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

import FormInput from '../FormInput/FormInput';
import styles from './FormInputWithButton.module.scss';
import { FormInputWithButtonProps } from './type';

const FormInputWithButton = <T extends FieldValues>({
  type = 'text',
  regex,
  valuePayload,
  requiredMessage,
  validateErrorMessage,
  validateSuccessMessage,
  label,
  placeholder,
  buttonLabel,
  validate = (value: string) => {
    if (regex !== undefined) return regex.test(value);
    return false;
  },
  handleClickButton = () => {
    console.log('click button');
  },
}: FormInputWithButtonProps<T>) => {
  const { getValues } = useFormContext<T>();

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  return (
    <FormInput
      type={type}
      regex={regex}
      valuePayload={valuePayload}
      requiredMessage={requiredMessage}
      validateErrorMessage={validateErrorMessage}
      validateSuccessMessage={validateSuccessMessage}
      label={label}
      placeholder={placeholder}
      validate={validate}
    >
      <button
        className={styles.inputButton}
        type="button"
        disabled={!validate(inputFieldValue)}
        onClick={handleClickButton}
      >
        {buttonLabel}
      </button>
    </FormInput>
  );
};

export default FormInputWithButton;
