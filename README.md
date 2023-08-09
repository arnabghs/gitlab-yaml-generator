# Gitlab CI YAML Generator

This app uses generative AI to build .gitlab-ci.yml. 
You can generate a complete YAML specification file just by mentioning the stages you require.

Alternatively if you have created a YAML template and generate a consumer YAML based on that, just put your template file and it will generate the YAML for you.


## Currently Supported Tech Stacks

 - Golang

## Get started with this repo:

1. Clone the repo
2. From root dir, run `npm ci`. It will install all the dependencies with exact version.
3. create a .env file in root and add your openAPI key there:
```
REACT_APP_OPENAI_API_KEY='XYZ-123'
```
4. `npm run start` & you're all set

