import st from './LoginDataInput.module.scss';

export interface LoginDataInputProps extends React.ComponentProps<'input'> {
  isError: boolean;
}

export const LoginDataInput = ({ isError, ...props }: LoginDataInputProps) => (
  <div className={`${st.container} ${st.mt18}`}>
    <input {...props} />
    {isError && <p>로그인 정보가 일치 하지 않습니다</p>}
  </div>
);
