import {ChatCompletionRequestMessage} from "openai";

const addTrainingMessages = (inputText: string): ChatCompletionRequestMessage[] => {
    return [
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
            "content": "Top-level elements with an arbitrary name and must contain at least the `script` clause or `extend` clause"
        },
        {
            "role": "user",
            "content": "what are the global variables?"
        },
        {
            "role": "assistant",
            "content": "In gitlab ci file, Top-level elements under `variables` clause which are not part of any job are called global variables"
        },
        {
            "role": "user",
            "content": "Identify the job name in this gitlab ci code snippet:" +
                `"
                job1:
                    stage: build
                    script: echo hello
                 "`
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
            "content": "Identify the job name in this gitlab ci code snippet:" +
                `"
                .hidden-job:
                    image: $IAMGE
                    script:
                        - echo hello world
                
                job2:
                    stage: build
                    extends: .hidden job
                 "`
        },
        {
            "role": "assistant",
            "content": "`job2` is the job name in the given code snippet because it has `extends` clause"
        },
        {
            "role": "user",
            "content": "how do you identify a 'deploy' job?"
        },
        {
            "role": "assistant",
            "content": " 'deploy' job will contain `deploy-` word in the `stage` name"
        },
        {
            "role": "user",
            "content": "Identify the 'deploy' job name in this code snippet: " +
                `"
                .cloud-deploy:
                    image: amazon/aws-cli:2.11.7
                    script:
                      - echo hello
                    
                cloud-deploy-one:
                    stage: deploy-dev
                    extends: .cloud-deploy
                    
                cloud-deploy-two:
                    stage: deploy-dev
                    extends: .cloud-deploy
                "`
        },
        {
            "role": "assistant",
            "content": "'cloud-deploy-one' and 'cloud-deploy-two' because they extend the hidden job '.cloud-deploy'"
        },
        {
            "role": "user",
            "content": "what is the format you will use for listing the variables in '.gitlab-ci.yml'."
        },
        {
            "role": "assistant",
            "content": "`VARIABLE_NAME: $VARIABLE_VALUE` format is used while listing the variables."
        },
        {
            "role": "user",
            "content": "List down the job variables and do not include global variables:" +
                `"
                stages:
                  - build
                  - test
                  
                variables:
                  VAR_ONE: "VALUE_ONE"
                  VAR_TWO: "VALUE_TWO"
                
                job1:
                    stage: build
                    script: echo hello
                    variables:
                        VAR_THREE: "VALUE_THREE"
                        
                job2:
                    stage: test
                    script: echo hello
                    variables:
                        VAR_FOUR: "VALUE_FOUR"        
                 "`
        },
        {
            "role": "assistant",
            "content": "The job variables are - " +
                `
                variables:
                    VAR_THREE: $VAR_THREE
                    VAR_FOUR: $VAR_FOUR
                `
        },
        {
            "role": "user",
            "content": ` a '.gitlab-ci.yml' can be generated if 'sample-gitlab-ci.yml' template file is given. These are the steps that need to be followed to generate a '.gitlab-ci.yml' from a given 'sample-gitlab-ci.yml' template file for CI CD pipeline implementation. Follow these steps: 
            1 - Include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'.
  2. Ignore all the global variables (variables present in top level 'variables' clause) and list only the variables used in the jobs 'variable' sections in 'sample-gitlab-ci.yml' file.
  3. Remove any variables whose name start with 'CI_'.
  4. Separate the variables based on whether they are used in '.cloud-deploy' hidden job of 'sample-gitlab-ci.yml' file.
    - If the variable is used in '.cloud-deploy' hidden job, list it down under 'variable' section of each deploy job separately. Make sure to use exact same deploy job name.
    - If the variable is not used in '.cloud-deploy' hidden job, list it down under global variables section of the new file. 
  
  Note: 
    1. Do not include 'stages' section in the new '.gitlab-ci.yml' file. 
    2. Do not add any job definition or stages for any job(including deploy jobs) in the new '.gitlab-ci.yml' file. The job should contain ONLY 'variable' section.
    3. Always use the exact variable names. + "Now the task is: generate a '.gitlab-ci.yml' for given 'sample-gitlab-ci.yml' by following above steps. the 'sample-gitlab-ci.yml' is:\`\`\` 

stages:
  - static-checks
  - deploy-dev

  variables:
  JFROG_ARTIFACTORY: "cicd-jfrog.telkomsel.co.id/artifactory"
  JFROG_DOCKER_REGISTRY: "docker.cicd-jfrog.telkomsel.co.id"
  TEST_COVERAGE_FILE: "test-coverage/coverage.cov"
  JFROG_REPORTS_PATH: "\${PROJECT_NAME}/\${CI_PROJECT_NAME}/\${CI_PIPELINE_ID}-\${CI_COMMIT_SHORT_SHA}/reports"

      lint:
      image: \${JFROG_DOCKER_REGISTRY}/golangci/golangci-lint:v1.51-alpine
      stage: static-checks
      before_script:
        - *import-curl
      script:
        - golangci-lint run --out-format code-climate | tee \${LINT_REPORT_FILE}.json
      after_script:
        - echo "uploading lint report to JFrog"
        - CHECKSUM=$(md5sum \${LINT_REPORT_FILE}.json | awk '{ print $1 }')
        - curl -Ssf --header "X-Checksum-MD5:\${CHECKSUM}" -u "\${ARTIFACTORY_USR}:\${ARTIFACTORY_PSW}" -T \${LINT_REPORT_FILE}.json "https://\${JFROG_ARTIFACTORY}/\${JFROG_REPORTS_PATH}/lint-report/\${LINT_REPORT_FILE}.json" -o /dev/null
      artifacts:
        when: always
        reports:
          codequality: \${LINT_REPORT_FILE}.json
          expire_in: 1 day

      .cloud-deploy:
      image:
        name: amazon/aws-cli:2.11.7
        entrypoint: [""]
      dependencies: []
      when: manual
      before_script:
        - mkdir -p /root/.aws/
        - *get-aws-profile
        - yum install jq -y
      script:
        - cp /root/.aws/$NON_PROD_ECR_AWS_PROFILE /root/.aws/config
        - aws sts get-caller-identity --profile $NON_PROD_ECR_AWS_PROFILE
        # - aws sts get-caller-identity --profile $AWS_PROFILE
        - echo "Updating the Task Definiton file"
        - |
          echo $(cat \${TASK_DEFINITION_PATH}/\${TASK_DEFINITION_TEMPLATE} | \
          jq '.containerDefinitions[0].image="'$REPOSITORY_URL':'$IMAGE_TAG'"') | \
          jq . >  \${TASK_DEFINITION_PATH}/\${TASK_DEFINITION_TEMPLATE}-\${ENVIRONMENT}.json
        - cat \${TASK_DEFINITION_PATH}/\${TASK_DEFINITION_TEMPLATE}-\${ENVIRONMENT}.json
        - |
          aws ecs register-task-definition --cli-input-json \
          file://\${TASK_DEFINITION_PATH}/\${TASK_DEFINITION_TEMPLATE}-\${ENVIRONMENT}.json \
          --profile $NON_PROD_ECR_AWS_PROFILE --region "\${AWS_DEFAULT_REGION}"
        - >       
          SERVICE_CHECK_MISSING=$(aws ecs describe-services --region "\${AWS_DEFAULT_REGION}"  \
                        --cluster "\${CLUSTER_NAME}" --services "\${SERVICE_NAME}" \
                        | jq 'any(.failures[]; .reason == "MISSING")')
    
          if [ "\${SERVICE_CHECK_MISSING}" == "true" ]; then
            aws ecs create-service \
            --cluster "\${CLUSTER_NAME}" \
            --service-name "\${SERVICE_NAME}" \
            --cli-input-json file://\${TASK_DEFINITION_PATH}/\${SERVICE_DEFINITION_FILE} \
            --region "\${AWS_DEFAULT_REGION}"
          else 
            aws ecs update-service --region "\${AWS_DEFAULT_REGION}" --cluster "\${CLUSTER_NAME}" \
            --service "\${SERVICE_NAME}"  --task-definition "\${TASK_DEFINITION_NAME}"
          fi
      tags:
       - aws_ec2_app
    
    
    cloud-deploy-dev:
      environment:
        name: $ENVIRONMENT
      stage: deploy-dev
      extends: .cloud-deploy

              \`\`\`  `
        },
        {
            "role": "assistant",
            "content": `
            `
        },
        {
            "role": "user",
            "content": "generate a '.gitlab-ci.yml' for the given 'sample-gitlab-ci.yml' by following above steps. "  + inputText 
        }
    ]
}

export {addTrainingMessages}
