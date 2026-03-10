import { ApiMinipageRes } from './types';

export async function getMinipages() {
  try {
    const res = await fetch(process.env.STRAPI_API_URL + '/minipages?populate=*', {
      headers: { Authorization: 'bearer ' + process.env.STRAPI_API_TOKEN },
    });
    const parsedRes: ApiMinipageRes = await res.json();
    return parsedRes.data;
  } catch {
    return;
  }
}
