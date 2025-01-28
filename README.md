# deno-otel

Example repo for issue with `deno` OTEL:

1. config via env file in with deno does not work
2. exporter crashes when running in docker container
3. OTEL works perfectly when setting env variables in shell

[Deno OTEL docs](https://docs.deno.com/runtime/fundamentals/open_telemetry/)

See [trace-payload.jsonc](./trace-payload.jsonc) for example of http/json payload to tracing endpoint.

### 1. Env file issue

Does not seem like values from env variables are respected:

- `OTEL_SERVICE_NAME`
- `OTEL_EXPORTER_OTLP_ENDPOINT`
- `OTEL_EXPORTER_OTLP_PROTOCOL`

#### Run "working example" (working because default values are used):

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


## 2. Docker export TCP connection error (or might be me that is missing something)

Exporter fails when running in docker image (env variables work great though)

Start server via 
```sh
docker compose up --build
```

Yields the following output

```sh
name="BatchSpanProcessor.Flush.ExportError" reason="Other(hyper_util::client::legacy::Error(Connect, ConnectError(\"tcp connect error\", Os { code: 111, kind: ConnectionRefused, message: \"Connection refused\" })))" message=Failed during the export process
```

## 3. Working example (env set in shell)

Run server by setting environment variables in shell:

```sh
deno task shell-start
```

or

```sh
OTEL_DENO=true OTEL_SERVICE_NAME=my-deno-app OTEL_EXPORTER_OTLP_ENDPOINT=localhost:4318 OTEL_EXPORTER_OTLP_PROTOCOL=http/json deno run -A --watch --unstable-otel otel.server.ts
```
