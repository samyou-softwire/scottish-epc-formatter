# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM public.ecr.aws/docker/library/node:18 AS node_base

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# this ensures psql is available on the container
# we may use this in support when connecting to EC2 container & we need to query the database
RUN apt-get update && apt-get install -y postgresql-client

# switch to a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

WORKDIR /app

ENTRYPOINT ["tail", "-f", "/dev/null"]
