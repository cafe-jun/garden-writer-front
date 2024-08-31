import FindUserPasswdForm from '@/components/FindUserPasswd/FindUserPasswdForm';
import FindPassNoticModal from '@/components/FindUserPasswd/modal/FindPassNoticeModal';
import { TempPasswordFormValues } from '@/components/FindUserPasswd/types';
import Form from '@/components/Form/Form';
import { useState } from 'react';

const FindUserPasswdPage = () => {
  const initFormValues: TempPasswordFormValues = {
    email: '',
  };
  const [isModal, setIsModal] = useState<boolean>(false);
  return (
    <Form<TempPasswordFormValues> defaultValues={initFormValues}>
      <FindUserPasswdForm setModal={setIsModal} />
      {isModal && <FindPassNoticModal cancel={() => setIsModal(false)} />}
    </Form>
  );
};

export default FindUserPasswdPage;
