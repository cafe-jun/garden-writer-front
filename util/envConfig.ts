export const envApiConfig = () => {
  const envConfig = process.env.NODE_ENV;
  return 'http://localhost:3001';
  // if (envConfig === 'development') {
  // }
  // return `https://port-0-garden-of-writer-server-71t02clq3bpxzf.sel4.cloudtype.app/api`;
  // return '/api';
};
