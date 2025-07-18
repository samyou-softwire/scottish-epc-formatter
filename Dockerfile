FROM public.ecr.aws/docker/library/python:3.11.9-bookworm

ENTRYPOINT ["tail", "-f", "/dev/null"]