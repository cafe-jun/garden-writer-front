import { useRouter } from 'next/router';
import React from 'react';

const RecruitmentDetailPostPage = () => {
  const router = useRouter();
  return <p>Post: {router.query.post}</p>;
};

export default RecruitmentDetailPostPage;
