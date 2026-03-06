import { ApiMnipageRes } from './types';

export async function getMinipages() {
  const res = await fetch(process.env.STRAPI_API_URL + '/minipages?populate=*', {
    headers: { Authorization: 'bearer ' + process.env.STRAPI_API_TOKEN },
  });
  const parsedRes: ApiMnipageRes = await res.json();
  return parsedRes.data;
}
