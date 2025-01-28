FROM denoland/deno:2.1.7

EXPOSE 8000

WORKDIR /usr/src/app

# prefer not to run as root
USER deno

ADD . /usr/src/app

ENV OTEL_DENO=true
ENV OTEL_SERVICE_NAME=my-deno-app
ENV OTEL_EXPORTER_OTLP_ENDPOINT=host.docker.internal:4318
ENV OTEL_EXPORTER_OTLP_PROTOCOL=http/json

CMD ["run", "docker-start"]