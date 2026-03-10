import { AliveDTO, InfoDTO, ServicesDTO } from './types';

export async function serviceIsAlive(port = process.env.FIRST_SERVICE_PORT ?? 3001) {
  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/alive';
  const res = await fetch(url);
  const parsed: AliveDTO = await res.json();
  return parsed.data;
}

export async function getInfo(port = process.env.FIRST_SERVICE_PORT ?? 3001) {
  if(!serviceIsAlive(port)) throw new Error('Requested service is down.');

  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/info';
  const res = await fetch(url);
  const parsed: InfoDTO = await res.json();
  return parsed;
}

export async function getServices(){
  if(!serviceIsAlive()) throw new Error('No services available.');

  const port = process.env.FIRST_SERVICE_PORT ?? 3001;
  const url = (process.env.BE_URL ?? 'http://localhost') + ':' + port + '/services';
  const res = await fetch(url);
  const parsed: ServicesDTO = await res.json();
  return parsed;
}