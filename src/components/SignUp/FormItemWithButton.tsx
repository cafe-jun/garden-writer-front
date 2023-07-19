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
  regex?: RegExp;
  valuePayload: Name;
  requiredMessage?: string;
  validateErrorMessage?: string;
  validateSuccessMessage?: string;
  isCustomSuccess?: boolean;
  label: string;
  placeholder: string;
  buttonLabel: string;
  validate?: (value: string) => boolean;
  handleClickButton?: () => void;
}

const FormItemWithButton = ({
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
      validate: (value: string) => inputValidate(value) || validateErrorMessage,
    }),
    [inputValidate]
  );

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  const isvalidateSuccessMessage = useMemo(
    () => validateSuccessMessage !== '' && inputValidate(inputFieldValue) && isCustomSuccess,
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
      {isvalidateSuccessMessage && <FormSuccessLabel>{validateSuccessMessage}</FormSuccessLabel>}
    </FormItem>
  );
};

export default memo(FormItemWithButton);
