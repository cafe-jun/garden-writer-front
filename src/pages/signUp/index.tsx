import { ChangeEvent, useState } from 'react';

interface SignUpFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  certificationNumber: string;
  nickName: string;
}

const initFormValues: SignUpFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  certificationNumber: '',
  nickName: '',
};

const SignUpPage = () => {
  const [formValues, setFormValues] = useState<SignUpFormValues>(initFormValues);

  const handleChangeFormValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form>
      <div>
        <input
          name="email"
          value={formValues.email}
          onChange={handleChangeFormValues}
          placeholder="이메일"
        />
        <input
          name="password"
          value={formValues.password}
          onChange={handleChangeFormValues}
          placeholder="비밀번호"
        />
        <input
          name="passwordConfirm"
          value={formValues.passwordConfirm}
          onChange={handleChangeFormValues}
          placeholder="비밀번호 확인"
        />
        <input
          name="name"
          value={formValues.name}
          onChange={handleChangeFormValues}
          placeholder="이름"
        />
        <div>
          <input
            name="phoneNumber"
            value={formValues.phoneNumber}
            onChange={handleChangeFormValues}
            placeholder="'-'없이 번호만"
          />
          <button type="button">인증번호 받기</button>
        </div>
        <div>
          <input
            name="certificationNumber"
            value={formValues.certificationNumber}
            onChange={handleChangeFormValues}
            placeholder="인증번호"
          />
          <button type="button">인증번호 받기</button>
        </div>
        <input
          name="nickName"
          value={formValues.nickName}
          onChange={handleChangeFormValues}
          placeholder="닉네임"
        />
      </div>
      <button type="button">시작하기</button>
    </form>
  );
};

export default SignUpPage;
