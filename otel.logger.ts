// deno-lint-ignore ban-ts-comment
// @ts-ignore
const port = parseInt(Deno.env.get('OTEL_EXPORTER_OTLP_ENDPOINT').split(':').at(1));

Deno.serve({
  port,
},

  async (req) => {
    console.log(` --> ${req.method} ${req.url}`);
    if (req.url.endsWith('traces')) {
      console.log(req.headers.get('content-type'));
      // read req.body as json
      console.log(`
---------Payload---------
${await req.text()}
`);
    }
    return new Response('ok', { status: 200 });
  })