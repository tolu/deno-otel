# deno-otel

Example repo for issue with OTEL config via environment variables in with deno.

[Deno OTEL docs](https://docs.deno.com/runtime/fundamentals/open_telemetry/)

### Issue

Does not seem like values from env variables are respected:

- `OTEL_SERVICE_NAME`
- `OTEL_EXPORTER_OTLP_ENDPOINT`
- `OTEL_EXPORTER_OTLP_PROTOCOL`

#### Run working example (working because default values are used):

```sh
deno task server
deno task logger
deno task client
```

You should see output from "logger" `otel.logger.ts` like:

> so we get protobuf even  though we defined `http/json` in `.env`  
> `service.name` is output as `unknown_service` even though provided

```sh
Listening on http://0.0.0.0:4318/
 --> POST http://localhost:4318/v1/logs
 --> POST http://localhost:4318/v1/traces
application/x-protobuf

---------Payload---------

�
�
*
telemetry.sdk.name
deno-opentelemetry
%
telemetry.sdk.language

        deno-rust
'
telemetry.sdk.version

2.1.7-0.27.0
```

#### Failing example

Edit `.env` and change the port from `4318` to `4317`. Restart the services like above.

Now we get no log output at all. Which would imply that the server is still reporting to `4318`.

