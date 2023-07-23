import { memo, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useHandlers } from './handler';
import InputField from './InputField';
import {
  FormErrorLabel,
  FormItemContainer,
  FormLabel,
  FormSuccessLabel,
  InputButton,
  InputWithButtonContainer,
} from './style';
import { Name, SignUpFormValues } from './type';

interface Props {
  type?: string;
  regex?: RegExp;
  valuePayload: Name;
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

const FormItem = ({
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
    if (regex !== undefined) {
      const isValid = regex.test(value);
      return isValid;
    }
    return false;
  },
  handleClickButton = () => {
    console.log('click button');
  },
}: Props) => {
  const { handleBlurInputField } = useHandlers();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<SignUpFormValues>();

  const inputValidate = useCallback(validate, []);

  const validateRule = useMemo(
    () => ({
      validate: (value: string) =>
        isRequired(value) || inputValidate(value) || validateErrorMessage,
    }),
    [inputValidate]
  );

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  const isvalidateSuccessMessage = useMemo(
    () => validateSuccessMessage !== '' && inputValidate(inputFieldValue) && isCustomSuccess,
    [inputFieldValue]
  );

  const rules = useMemo(() => {
    const rule = {
      validate: validateRule,
      onBlur: () => handleBlurInputField(trigger, valuePayload),
    };
    return requiredMessage === undefined ? rule : { ...rule, required: requiredMessage };
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
      {errors[valuePayload] && <FormErrorLabel>{errors[valuePayload]?.message}</FormErrorLabel>}
      {isvalidateSuccessMessage && <FormSuccessLabel>{validateSuccessMessage}</FormSuccessLabel>}
    </FormItemContainer>
  );
};

export default memo(FormItem);
