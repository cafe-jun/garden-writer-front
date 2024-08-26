import Form from '@/components/Form/Form';
import SignUpForm from '@/components/SignUp/SignUpForm';
import { SignUpFormValues } from '@/components/SignUp/type';

const initFormValues: SignUpFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  nickname: '',
};

const JoinPage = () => (
  <Form<SignUpFormValues> defaultValues={initFormValues}>
    <SignUpForm />
  </Form>
);

export default JoinPage;
