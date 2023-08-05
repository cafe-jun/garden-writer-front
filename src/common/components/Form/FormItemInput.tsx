import { memo, useCallback, useMemo } from 'react';
import { FieldError, Path, useFormContext } from 'react-hook-form';

import InputField from '@/common/components/Form/InputField';
import { SignUpFormValues } from '@/components/SignUp/type';

import styles from './Form.module.scss';
import { useHandlers } from './handler';

interface Props<T extends SignUpFormValues> {
  type?: string;
  regex?: RegExp;
  valuePayload: Path<T>;
  requiredMessage?: string;
  validateErrorMessage?: string;
  validateSuccessMessage?: string;
  isCustomSuccess?: boolean;
  label: string;
  placeholder: string;
  buttonLabel?: string;
  validate?: (value: string) => boolean;
  handleClickButton?: () => void;
}

const FormItemInput = <T extends SignUpFormValues>({
  type = 'text',
  regex,
  valuePayload,
  requiredMessage,
  validateErrorMessage,
  validateSuccessMessage,
  isCustomSuccess = true,
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
}: Props<T>) => {
  const { handleBlurInputField } = useHandlers<T>();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<T>();

  const inputValidate = useCallback(validate, []);

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  const validateRule = useMemo(
    () => ({
      validate: (value: string) =>
        isRequired(value) || inputValidate(value) || validateErrorMessage,
    }),
    []
  );

  const isValidSuccess = useMemo(
    () => validateSuccessMessage !== '' && inputValidate(inputFieldValue) && isCustomSuccess,
    [inputFieldValue]
  );

  const rules = useMemo(() => {
    const defaultRule = {
      validate: validateRule,
      onBlur: () => handleBlurInputField(trigger, valuePayload),
    };
    return requiredMessage === undefined
      ? defaultRule
      : { ...defaultRule, required: requiredMessage };
  }, []);

  const isRequired = useCallback(
    (value: string) => value === '' && requiredMessage === undefined,
    []
  );

  return (
    <div className={styles.formItemContainer}>
      <p className={styles.formLabel}>{label}</p>
      <div className={styles.inputWithButtonContainer}>
        <InputField
          type={type}
          name={valuePayload}
          placeholder={placeholder}
          register={register}
          rules={rules}
        />
        {buttonLabel && (
          <button
            className={styles.inputButton}
            type="button"
            disabled={!validate(inputFieldValue)}
            onClick={handleClickButton}
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {errors && errors[valuePayload] && (
        <p className={styles.formErrorLabel}>{(errors[valuePayload] as FieldError).message}</p>
      )}
      {isValidSuccess && <p className={styles.formSuccessLabel}>{validateSuccessMessage}</p>}
    </div>
  );
};

export default memo(FormItemInput);
