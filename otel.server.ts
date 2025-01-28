import { trace } from "npm:@opentelemetry/api@1";

console.log('OpenTelemetry Environment Variables:')
console.table(
  Object.fromEntries(Object.entries(Deno.env.toObject()).filter(([k]) => k.includes('OTEL_')))
)

Deno.serve((req) => {

  // set name ant route span
  const span = trace.getActiveSpan();
  if (span) {
    span.setAttribute("http.route", '/');
    span.updateName(`${req.method} /`);
  }

  return new Response('Yay OpenTelemetry!');
});
