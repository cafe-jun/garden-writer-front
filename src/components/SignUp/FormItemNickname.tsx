import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { nicknameRegex } from '@/constants/regex';

import { useHandlers } from './handler';
import { initFormValues } from './initFormValues';
import InputField from './InputField';
import {
  FormErrorLabel,
  FormItem,
  FormLabel,
  InputButton,
  InputWithButtonContainer,
} from './style';
import { SignUpFormValues } from './type';

const FormItemNickname = () => {
  const { handleBlurInputField } = useHandlers();
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<SignUpFormValues>({
    defaultValues: initFormValues,
  });

  const nicknameValidate = useCallback((value: string) => {
    const isValidNickname = nicknameRegex.test(value);
    return isValidNickname;
  }, []);

  const nicknameValidateRule = useMemo(
    () => ({
      validate: (value: string) => nicknameValidate(value) || '닉네임 형식을 지켜주세요.',
    }),
    [nicknameValidate]
  );

  const nicknameFieldValue = useMemo(() => getValues('nickname'), [getValues('nickname')]);

  return (
    <FormItem>
      <FormLabel>닉네임</FormLabel>
      <InputWithButtonContainer>
        <InputField
          name="nickname"
          placeholder="닉네임"
          register={register}
          rules={{
            required: '닉네임을 입력해주세요.',
            validate: nicknameValidateRule,
            onBlur: () => handleBlurInputField(trigger, 'nickname'),
          }}
        />
        <InputButton type="button" disabled={!nicknameValidate(nicknameFieldValue)}>
          중복확인
        </InputButton>
      </InputWithButtonContainer>
      {errors.nickname && <FormErrorLabel>{errors.nickname.message}</FormErrorLabel>}
    </FormItem>
  );
};

export default FormItemNickname;
