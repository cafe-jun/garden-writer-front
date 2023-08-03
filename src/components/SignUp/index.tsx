import Form from '@/common/components/Form/Form';

import { initFormValues } from './initFormValues';
import SignUpForm from './SignUpForm';
import { SignUpFormValues } from './type';

const SignUp = () => (
  <Form<SignUpFormValues> defaultValues={initFormValues}>
    <SignUpForm />
  </Form>
);

export default SignUp;
