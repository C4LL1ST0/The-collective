import ServiceInterface from '../components/ServiceInterface';
import { getInfo } from '../lib/connectorClient';

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ port?: string }>;
}) {
  const { id } = await params;
  const { port } = (await searchParams) ?? {};

  let serviceInfo;
  if(port){
    serviceInfo = (await getInfo(parseInt(port))).data;
  } 

  if(!serviceInfo){
    return <div>Not found</div>;
  }

  return <div className="w-screen h-screen"><ServiceInterface serviceInfo={serviceInfo}/></div>;
}
