import st from './find-password.module.scss';
import { useState } from 'react';
import { TempPasswordFormValues } from '@/components/user/find-password-form/types';
import Form from '@/components/Form/Form';
import { FindPasswordForm, FindPasswordModal } from '@/components';

export const FindUserPassword = () => {
const initFormValues: TempPasswordFormValues = {
  email: '',
};

const [isModal, setIsModal] = useState<boolean>(false);


return (<Form<TempPasswordFormValues> defaultValues={initFormValues}>
  <FindPasswordForm setModal={setIsModal} />
  {isModal && <FindPasswordModal cancel={() => setIsModal(false)} />}
</Form>)
}
export default FindUserPassword;
