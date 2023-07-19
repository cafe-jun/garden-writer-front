import { memo, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useHandlers } from './handler';
import InputField from './InputField';
import {
  FormErrorLabel,
  FormItem,
  FormLabel,
  FormSuccessLabel,
  InputButton,
  InputWithButtonContainer,
} from './style';
import { Name, SignUpFormValues } from './type';

interface Props {
  regex: RegExp;
  valuePayload: Name;
  requiredMessage?: string;
  errorMessage?: string;
  successMessage?: string;
  isSuccess?: boolean;
  label: string;
  placeholder: string;
  buttonLabel: string;
  inputValidate?: (value: string) => boolean;
  handleClickButton?: () => void;
}

const FormItemWithButton = ({
  regex,
  valuePayload,
  requiredMessage,
  errorMessage,
  successMessage,
  isSuccess = true,
  label,
  placeholder,
  buttonLabel,
  inputValidate = (value: string) => {
    const isValid = regex.test(value);
    return isValid;
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

  const validate = useCallback(inputValidate, []);

  const validateRule = useMemo(
    () => ({
      validate: (value: string) => validate(value) || errorMessage,
    }),
    [validate]
  );

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  const isSuccessMessage = useMemo(
    () => successMessage !== '' && validate(inputFieldValue) && isSuccess,
    [inputFieldValue]
  );

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <InputWithButtonContainer>
        <InputField
          name={valuePayload}
          placeholder={placeholder}
          register={register}
          rules={{
            required: requiredMessage,
            validate: validateRule,
            onBlur: () => handleBlurInputField(trigger, valuePayload),
          }}
        />
        <InputButton
          type="button"
          disabled={!validate(inputFieldValue)}
          onClick={handleClickButton}
        >
          {buttonLabel}
        </InputButton>
      </InputWithButtonContainer>
      {errors[valuePayload] && <FormErrorLabel>{errors[valuePayload]?.message}</FormErrorLabel>}
      {isSuccessMessage && <FormSuccessLabel>{successMessage}</FormSuccessLabel>}
    </FormItem>
  );
};

export default memo(FormItemWithButton);
