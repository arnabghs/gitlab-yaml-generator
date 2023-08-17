import {Configuration, OpenAIApi} from "openai";

// Controller function to handle chat conversation
export const generateResponseWithInContextLearn = async (inputText: string) => {
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    }));

    try {
        const modelId = "gpt-3.5-turbo";

        const result = await openai.createChatCompletion({
            model: modelId,
            temperature: 0,
            messages: [
                {
                    "role": "system",
                    "content": "Your name is Pia. You are a Devops consultant with hands on experience on CI/CD pipeline, GO, node js, docker, AWS and gitlab CI."
                },
                {
                    "role": "user",
                    "content": "how do you identify a variable in gitlab yaml file ?"
                },
                {
                    "role": "assistant",
                    "content": "variable is a word that starts with prefix `$` or enclosed in between curly brackets `${}`."
                },
                {
                    "role": "user",
                    "content": "what are the keywords in gitlab ci ?"
                },
                {
                    "role": "assistant",
                    "content": "gitlab has 'Global keywords' and 'job keywords' to configure CI/CD pipelines, 'Global keywords' are : `default` `include` `stages` `variables` `workflow`, 'job keywords' are : `after_script` `allow_failure` `artifacts` `before_script` `cache` `coverage` `dast_configuration` `dependencies`  `environment` `except` `extends` `image` `inherit` `interruptible` `needs` `only` `pages` `parallel` `release` `resource_group` `retry` `rules` `script` `secrets` `services` `stage` `tags` `timeout` `trigger` `variables` `when`."
                },
                {
                    "role": "user",
                    "content": "how do you identify a 'job' in gitlab ci?"
                },
                {
                    "role": "assistant",
                    "content": "Top-level elements with an arbitrary name and must contain at least the `script` clause or `extend` clause. Not limited in how many can be defined."
                },
                {
                    "role": "user",
                    "content": "Identify the 'job' name in this gitlab ci code snippet:\n``` job1:\n   stage: build\n  script: \"execute-script-for-job1\" ``` ?"
                },
                {
                    "role": "assistant",
                    "content": "`job1` is the job name in the given code snippet because it has `script` clause."
                },
                {
                    "role": "user",
                    "content": "how do you identify a hidden job?"
                },
                {
                    "role": "assistant",
                    "content": " hidden job name Starts with a dot `.` and it is not processed by GitLab CI/CD. hidden jobs can be used as templates for reusable configuration with: The `extends` keyword or `YAML anchors`."
                },
                {
                    "role": "user",
                    "content": "how do you identify a 'deploy' job?"
                },
                {
                    "role": "assistant",
                    "content": " 'deploy' job will have `deploy-` word in the `stage` name of that job."
                },
                {
                    "role": "user",
                    "content": "Identify the 'deploy' job name in this code snippet: ```cloud-deploy-dev: \n environment: \n   name: dev \n stage: deploy-dev \n extends: .cloud-deploy ```"
                },
                {
                    "role": "assistant",
                    "content": "`cloud-deploy-dev`"
                },
                {
                    "role": "user",
                    "content": "Identify the 'deploy' job name/names in this code snippet: ```cloud-deploy-qa: \n environment: \n   name: qa \n stage: deploy-qa \n extends: .cloud-deploy ```"
                },
                {
                    "role": "assistant",
                    "content": "`cloud-deploy-qa`"
                },
                {
                    "role": "user",
                    "content": "Identify the 'deploy' job name/names in this code snippet: ```cloud-deploy-dev: \n environment: \n   name: dev \n stage: deploy-dev \n extends: .cloud-deploy ```"
                },
                {
                    "role": "assistant",
                    "content": "`cloud-deploy-dev`"
                },
                {
                    "role": "user",
                    "content": "Identify the 'build' job name/names in this code snippet: ```.build: \n  image: node:14 \n  script: \n      - npm run inBuild:${ENVIRONMENT} \n  artifacts: \n    paths:  \n      - dist/ \n    expire_in: 1 day \n  before_script: \n    - npm install  \n \nnode-build-pre-prod: \n  stage: build \n  extends: .build \n variables: \n    ENVIRONMENT: preprod  \nnode-build-prod: \n  stage: build-prod \n  extends: .build \n  variables: \n    ENVIRONMENT: prod \n  rules: \n    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH \n      when: manual ```"
                },
                {
                    "role": "assistant",
                    "content": "`node-build-pre-prod` `node-build-prod` are the build jobs because these jobs `stage` names consists of `build` or `build-` word."
                },
                {
                    "role": "user",
                    "content": "what is the format you will use for listing the variables in '.gitlab-ci.yml'."
                },
                {
                    "role": "assistant",
                    "content": "`VARIABLE_NAME: ${VARIABLE_VALUE}` format is used while listing the variables."
                },
                {
                    "role": "user",
                    "content": "list the variables from the given code snippet under `variables` section of job with exact job name. Don't include any explanations in your responses. Don't include any job definitions in your responses. code snippet is: ``` \n unit-tests: \n  image: node:16 \n  stage: unit-test \n  script: \n    - npm run test:coverage \n  after_script: \n    - echo \"uploading unit test report to JFrog\" \n    - CHECKSUM=$(shasum -a 1 $TEST_COVERAGE_FILE | awk '{ print $1 }') \n    - curl -sSf --header \"X-Checksum-Sha1:${CHECKSUM}\" -u ${ARTIFACTORY_USR}:${ARTIFACTORY_PSW}  -T ${TEST_COVERAGE_FILE} \"https://{JFROG_ARTIFACTORY}/${JFROG_REPORTS_PATH}/${TEST_COVERAGE_FILE}\" -o /dev/null \n  artifacts: \n    when: always \n    reports: \n      codequality: ${TEST_COVERAGE_FILE} \n    expire_in: 1 day \n \n node-build-pre-prod: \n  image: node:16 \n  stage: build \n  script: \n      - npm run inBuild:${ENVIRONMENT} \n  artifacts: \n    paths:  \n      - dist/ \n    expire_in: 1 day  ```"
                },
                {
                    "role": "assistant",
                    "content": "``` \n unit-tests: \n   variables:\n     TEST_COVERAGE_FILE: $TEST_COVERAGE_FILE\n     ARTIFACTORY_USR: ${ARTIFACTORY_USR}\n     ARTIFACTORY_PSW: ${ARTIFACTORY_PSW}\n     JFROG_ARTIFACTORY: ${JFROG_ARTIFACTORY} \n     JFROG_REPORTS_PATH: ${JFROG_REPORTS_PATH}\n \n node-build-pre-prod: \n   variables:\n     ENVIRONMENT: ${ENVIRONMENT} ```"
                },
                {
                    "role": "user",
                    "content": ` a '.gitlab-ci.yml' can be generated if 'sample-gitlab-ci.yml' template file is given. These are the steps that need to be followed to generate a '.gitlab-ci.yml' from a given 'sample-gitlab-ci.yml' template file for CI CD pipeline implementation. Follow these steps: 
                    1 - Make use of \`include\` keyword to include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with \`ref\` 'main' and \`project\` 'my-project'
                    2 - Find out all the variables used in 'sample-gitlab-ci.yml' file, remove the ones used in '.cloud-deploy' job and list the rest of them down under global variables section
                    3 - create seperate variable sections for each deploy jobs with exact job name as mentioned in 'sample-gitlab-ci.yml' template file
                    4 - Find out all the variables used in '.cloud-deploy' job and list them down in respective deploy jobs variable section
                    Note: A - Do not add or include any job definition(of deploy jobs) and 'stages' section in the new 'sample-gitlab-ci.yml' file. 
                    B - Always use the variable names exact as mentioned in 'sample-gitlab-ci.yml' template file.
                    C - Do not give any explanation, just give the code snippet.
                    \n" + "Now the task is: generate a '.gitlab-ci.yml' for given 'sample-gitlab-ci.yml' by following above steps. the 'sample-gitlab-ci.yml' is:\`\`\` 
stages:
  - unit-test
  - build
  - deploy-dev

unit-tests:
  image: node:16
  stage: unit-test
  script:
    - npm run test:coverage
  after_script:
    - echo "uploading unit test report to JFrog"
    - CHECKSUM=$(shasum -a 1 $TEST_COVERAGE_FILE | awk '{ print $1 }')
    - curl -sSf --header "X-Checksum-Sha1:\${CHECKSUM}" -u \${ARTIFACTORY_USR}:\${ARTIFACTORY_PSW}  -T \${TEST_COVERAGE_FILE} "https://\${JFROG_ARTIFACTORY}/\${JFROG_REPORTS_PATH}/\${TEST_COVERAGE_FILE}" -o /dev/null
  artifacts:
    when: always
    reports:
      codequality: \${TEST_COVERAGE_FILE}
    expire_in: 1 day

node-build-pre-prod:
  image: node:16
  stage: build
  script:
      - npm run inBuild:\${ENVIRONMENT}
  artifacts:
    paths: 
      - dist/
    expire_in: 1 day

.cloud-deploy:
  image:
    name: amazon/aws-cli:2.11.7
    entrypoint: [""]
  dependencies: []
  when: manual
  script:
    - |
      aws ecs register-task-definition --cli-input-json \
      file://\${TASK_DEFINITION_PATH}/\${TASK_DEFINITION_TEMPLATE}-\${ENVIRONMENT}.json \
      --profile $AWS_PROFILE --region "\${AWS_DEFAULT_REGION}"
    - >   
    - aws ecs update-service --region "\${AWS_DEFAULT_REGION}" --cluster "\${CLUSTER_NAME}" --service "\${SERVICE_NAME}"  --task-definition "\${TASK_DEFINITION_NAME}"
  tags:
   - aws_ec2_app

cloud-deploy-dev:
  environment:
    name: dev
  stage: deploy-dev
  extends: .cloud-deploy

cloud-deploy-nft:
  environment:
    name: nft
  stage: deploy-nft
  extends: .cloud-deploy
                      \`\`\`  `
                },
                {
                    "role": "assistant",
                    "content": `
include:
  - project: my-project
    ref: main
    file: "sample-gitlab-ci.yml"

variables:
 TEST_COVERAGE_FILE: $TEST_COVERAGE_FILE
 ARTIFACTORY_USR: \${ARTIFACTORY_USR}
 ARTIFACTORY_PSW: \${ARTIFACTORY_PSW}
 JFROG_ARTIFACTORY: \${JFROG_ARTIFACTORY} 
 JFROG_REPORTS_PATH: \${JFROG_REPORTS_PATH}

cloud-deploy-dev:
  variables:
    ENVIRONMENT: dev
    AWS_PROFILE: \${AWS_PROFILE}
    AWS_DEFAULT_REGION: \${AWS_DEFAULT_REGION}
    CLUSTER_NAME: \${CLUSTER_NAME}
    SERVICE_NAME: \${SERVICE_NAME}
    TASK_DEFINITION_NAME: \${TASK_DEFINITION_NAME}
    TASK_DEFINITION_TEMPLATE: \${TASK_DEFINITION_TEMPLATE}
    TASK_DEFINITION_PATH: \${TASK_DEFINITION_PATH}

cloud-deploy-nft:
  variables:
    ENVIRONMENT: nft
    AWS_PROFILE: \${AWS_PROFILE}
    AWS_DEFAULT_REGION: \${AWS_DEFAULT_REGION}
    CLUSTER_NAME: \${CLUSTER_NAME}
    SERVICE_NAME: \${SERVICE_NAME}
    TASK_DEFINITION_NAME: \${TASK_DEFINITION_NAME}
    TASK_DEFINITION_TEMPLATE: \${TASK_DEFINITION_TEMPLATE}
    TASK_DEFINITION_PATH: \${TASK_DEFINITION_PATH}
                    `
                },
                {
                    "role": "user",
                    "content": "generate a '.gitlab-ci.yml' for the given 'sample-gitlab-ci.yml' by following above steps. "  + inputText 
                }
            ],
        });

        return result?.data
    } catch (err) {
        console.error(err);
    }
};
