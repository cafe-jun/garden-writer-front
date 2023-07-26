import { memo, useCallback, useMemo } from 'react';
import { FieldError, Path, useFormContext } from 'react-hook-form';

import InputField from '@/common/components/Form/InputField';
import { SignUpFormValues } from '@/components/SignUp/type';

import { useHandlers } from './handler';
import {
  FormErrorLabel,
  FormItemContainer,
  FormLabel,
  FormSuccessLabel,
  InputButton,
  InputWithButtonContainer,
} from './style';

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
    <FormItemContainer>
      <FormLabel>{label}</FormLabel>
      <InputWithButtonContainer>
        <InputField
          type={type}
          name={valuePayload}
          placeholder={placeholder}
          register={register}
          rules={rules}
        />
        {buttonLabel && (
          <InputButton
            type="button"
            disabled={!validate(inputFieldValue)}
            onClick={handleClickButton}
          >
            {buttonLabel}
          </InputButton>
        )}
      </InputWithButtonContainer>
      {errors && errors[valuePayload] && (
        <FormErrorLabel>{(errors[valuePayload] as FieldError).message}</FormErrorLabel>
      )}
      {isValidSuccess && <FormSuccessLabel>{validateSuccessMessage}</FormSuccessLabel>}
    </FormItemContainer>
  );
};

export default memo(FormItemInput);
