import { AliveDTO, InfoDTO, ServicesDTO } from './types';

export async function serviceIsAlive(port = parseInt(process.env.FIRST_SERVICE_PORT ?? '3001')) {
  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/alive';
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
  console.log(port);
  if (!serviceIsAlive(port)) throw new Error('Requested service is down.');

  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/info';
  const res = await fetch(url);
  const parsed: InfoDTO = await res.json();
  return parsed;
}

export async function getServices() {
  if (!(await serviceIsAlive())) return { data: [] } as ServicesDTO;

  const port = process.env.FIRST_SERVICE_PORT ?? 3001;
  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/services';
  const res = await fetch(url);
  const parsed: ServicesDTO = await res.json();
  return parsed;
}

export async function pressTextButton(buttonName: string, servicePort: number): Promise<string> {
  if (!(await serviceIsAlive(servicePort))) throw new Error('Requested service is down');

  const url =
    (process.env.BE_URL ?? 'http://localhost') + ':' + servicePort + '/input/' + buttonName;
  const res = await fetch(url);

  let text: string = '';
  try {
    text = (await res.json()).data;
  } catch {}
  return text;
}

export async function pressButton(buttonName: string, servicePort: number) {
  if (!(await serviceIsAlive(servicePort))) throw new Error('Requested service is down');

  const url =
    (process.env.BE_URL ?? 'http://localhost') + ':' + servicePort + '/input/' + buttonName;
  await fetch(url);
}
