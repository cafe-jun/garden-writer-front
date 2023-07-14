import { memo, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { emailRegex } from '@/constants/regex';

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
import { SignUpFormValues } from './type';

const FormItemEmail = () => {
  const { handleBlurInputField } = useHandlers();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<SignUpFormValues>();

  const emailValidate = useCallback((value: string) => {
    const isValidEmail = emailRegex.test(value);
    return isValidEmail;
  }, []);

  const emailValidateRule = useMemo(
    () => ({
      validate: (value: string) => emailValidate(value) || '이메일 형식을 지켜주세요.',
    }),
    [emailValidate]
  );

  const emailFieldValue = useMemo(() => getValues('email'), [getValues('email')]);

  const handleClickCertificationButton = () => {
    console.log(emailFieldValue);
  };

  return (
    <FormItem>
      <FormLabel>이메일</FormLabel>
      <InputWithButtonContainer>
        <InputField
          name="email"
          placeholder="이메일"
          register={register}
          rules={{
            required: '이메일을 입력해주세요.',
            validate: emailValidateRule,
            onBlur: () => handleBlurInputField(trigger, 'email'),
          }}
        />
        <InputButton
          type="button"
          disabled={!emailValidate(emailFieldValue)}
          onClick={handleClickCertificationButton}
        >
          인증 메일 발송
        </InputButton>
      </InputWithButtonContainer>
      {errors.email && <FormErrorLabel>{errors.email.message}</FormErrorLabel>}
      {emailValidate(emailFieldValue) && (
        <FormSuccessLabel>사용 가능한 이메일입니다.</FormSuccessLabel>
      )}
    </FormItem>
  );
};

export default memo(FormItemEmail);
