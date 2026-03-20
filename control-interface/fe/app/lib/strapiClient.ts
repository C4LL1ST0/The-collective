import { ApiMinipageRes } from './types';

export async function getMinipages() {
  let res;
  try {
    res = await fetch(process.env.STRAPI_API_URL + '/minipages?populate=*', {
      headers: { Authorization: 'bearer ' + process.env.STRAPI_API_TOKEN },
    });
  } catch {
    return [];
  }

  if (!res.ok) return [];
  const parsedRes: ApiMinipageRes = await res.json();
  return parsedRes.data;
}
