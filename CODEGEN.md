## Codegen setup steps

#### Get the latest openapi spec
[api-v1.yaml](https://github.com/sniff-ssw/sniff_back/blob/main/src/main/resources/api-v1.yaml)

#### Edit the yaml file at will
[Online Editor Page](https://editor-next.swagger.io)

#### Put api-v1.yaml in project root

#### Generate client

```sh
docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v6.3.0 generate -i /local/api-v1.yaml -g typescript-axios -o ./local/src/client -spaces=2
```
