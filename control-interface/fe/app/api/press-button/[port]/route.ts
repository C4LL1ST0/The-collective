import { pressButton } from '@/app/lib/connectorClient';

export async function GET(req: Request, { params }: any) {
  params = await params;
  if (!params.port) {
    return new Response('Missing port', { status: 400 });
  }

  const url = new URL(req.url);
  const buttonName = url.searchParams.get('button-name');
  if (!buttonName) {
    return new Response('Missing buttonName', { status: 400 });
  }

  const portNumber = Number.parseInt(params.port);
  if (Number.isNaN(portNumber)) {
    return new Response('Invalid port', { status: 400 });
  }

  const outp = await pressButton(buttonName, portNumber);
  return new Response(outp, { status: 200 });
}
