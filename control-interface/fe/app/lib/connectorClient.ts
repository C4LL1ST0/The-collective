import { AliveDTO, InfoDTO, ServicesDTO } from './types';

export async function serviceIsAlive(port = parseInt(process.env.FIRST_SERVICE_PORT ?? '3001')) {
  const url = (process.env.BE_URL ?? 'http://be') + ':' + port + '/alive';
  let res;
  try {
    res = await fetch(url, { headers: {} });
  } catch {
    return false;
  }

  const parsed: AliveDTO = await res.json();
  return parsed.data;
}

export async function getInfo(port = parseInt(process.env.FIRST_SERVICE_PORT ?? '3001')) {
  if (!(await serviceIsAlive(port))) throw new Error('Requested service is down.');

  const url = (process.env.BE_URL ?? 'http://be') + ':' + port + '/info';
  const res = await fetch(url);
  const parsed: InfoDTO = await res.json();
  return parsed;
}

export async function getServices() {
  if (!(await serviceIsAlive())) return { data: [] } as ServicesDTO;

  const port = process.env.FIRST_SERVICE_PORT ?? 3001;
  const url = (process.env.BE_URL ?? 'http://be') + ':' + port + '/services';
  const res = await fetch(url);
  const parsed: ServicesDTO = await res.json();
  return parsed;
}

export async function pressButton(buttonName: string, servicePort: number) {
  if (!(await serviceIsAlive(servicePort))) throw new Error('Requested service is down');

  const url =
    (process.env.BE_URL ?? 'http://be') + ':' + servicePort + '/input/' + buttonName;
  const res = await fetch(url);

  let status: any;
  try {
    status = (await res.json()).data;
  } catch {}
  return status;
}
