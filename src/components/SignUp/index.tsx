import Form from '@/common/components/Form/Form';

import { initFormValues } from './initFormValues';
import SignUpForm from './SignUpForm';

const SignUp = () => (
  <Form defaultValues={initFormValues}>
    <SignUpForm />
  </Form>
);

export default SignUp;
