export async function GET(req: Request, { params }: any) {
  params = await params;
  if (!params.path) {
    return new Response('Missing path', { status: 400 });
  }

  const url = process.env.IMAGE_BASE_URL + '/' + params.path.join('/');

  const res = await fetch(url);

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}