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
            "content": "Identify the job name in this gitlab ci code snippet:" +
                `"
                test:
                    stage: build
                    script: echo hello
                 "`
        },
        {
            "role": "assistant",
            "content": "`test` is the job name in the given code snippet because it has `script` clause."
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
            "content": "'deploy' job will contain `deploy-` word in the name and extends to the hidden job '.cloud-deploy'"
        },
        {
            "role": "user",
            "content": "what are the global variables?"
        },
        {
            "role": "assistant",
            "content": "In gitlab ci file, elements/variables under Top-level `variables` clause, which are not part of any job are called global variables"
        },
        {
            "role": "user",
            "content": "what are the job level variables?"
        },
        {
            "role": "assistant",
            "content": "In gitlab ci file, variables present under any specific job's `variables` clause are known as job level variables."
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
            "content": "generate a '.gitlab-ci.yml' for the given 'sample-gitlab-ci.yml' by following above steps. "  + inputText 
        }
    ]
}

export {addTrainingMessages}
