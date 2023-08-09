const VariablesPrompt = `
    Use variables:
     - 'GO_DOCKER_VERSION' to determine the version of golang docker image
     - 'GOLINT_IMAGE' to determine the docker image for running 'golangci-lint'. Use the latest image available
     - 'FINAL_IMAGETAG' to determine the final tag of the image before it is pushed. Use value 'arnabghs/$APP_NAME-\${CI_COMMIT_SHORT_SHA}'
     - 'DAST_ENDPOINT' to be used in 'zap-baseline-dast' job. Use value "https://apidev.my-app.com"
`

const StaticCheckPrompt = `
    'static-checks' stage will contain following job names:
     - 'lint': this job will run linter for the golang repository using 'golangci-lint' tool. Use the docker image in '$GOLINT_IMAGE' variable. Output format should be 'code-climate'. Pass the output in artefacts as gitlab 'codequality' reports.
     - 'gemnasium-dependency_scanning': this job uses the gitlab template 'Security/Dependency-Scanning.gitlab-ci.yml' to run dependency check. Pass the job report in artefacts as 'dependency_scanning' reports.
`

const BuildPrompt = `
    'build' stage will contain following job names:
      - 'compile': this job will build binary from 'cmd/server/main.go' file after setting env variables to build the binary for 'linux' operating system and 'amd64' architecture. It will output the binary in '$GO_SERVICE' variable path and pass it along in artefacts path.
`

const TestPrompt = `
    'test' stage will contain following job names:
      - 'unit-test': this job will run go test on all repository with '!integration' tags
`

const PackagePrompt = `
    'package' stage will contain following job names:
      - 'docker-build': this job will build a docker image from '$DOCKERFILE_PATH' variable with tag '$APP_NAME-\${CI_COMMIT_SHORT_SHA}' using 'latest' tag of 'docker' image. Then it will create a tar of the generated image under the output path '$DOCKER_IMAGE_TARFILE' and pass it along in artefacts path.
`

const PublishPrompt = `
    'publish' stage will contain following job names:
     - 'publish-image': this job loads the docker image from '$DOCKER_IMAGE_TARFILE' input using 'latest' tag of 'docker' image.Then the image will be tagged as '$FINAL_IMAGETAG' and pushed to dockerhub.
`

const CloudDeployPrompt = `
    create a gitlab job named '.cloud-deploy' without associating it any stage. It will use 'amazon/aws-cli:2.11.7' image to deploy the image into AWS ECS. First it is going register-task-definition with cli input json '$TASK_DEFINITION_FILE' and aws profile '$AWS_PROFILE' variable into '$AWS_DEFAULT_REGION' region. Next, it will update-service with cli input json '$SERVICE_DEFINITION_FILE', service-name '$SERVICE_NAME' and cluster '$CLUSTER_NAME' in '$AWS_DEFAULT_REGION' region.
`

const DeployPrompt = `
    'deploy' stage will contain following job names:
      - 'deploy-dev': this job will extend '.cloud-deploy'. Use environment name: 'dev'.
      - 'deploy-qa': this job will extend '.cloud-deploy'. Use environment name: 'qa'.
`

const DastScanPrompt = `
    'DAST-scan' stage will contain following job names:
      - 'zap-baseline-dast': this job will run zap baseline scan on '$DAST_ENDPOINT' variable url and pass the generated report in artefacts path.
`

const IncludeStagesPrompt = (stages: string[]): string => {
    let promptString = "Include"
    stages.forEach((stage, index) => {
        if (index === (stages.length - 1)) {
            promptString = promptString + ` and '${stage}' stage`
        } else {
            promptString = promptString + ` '${stage}',`
        }
    })

    return promptString
}

// use as type [key in Stages]
// enum Stages {
//     StaticChecks = "static-checks",
//     Build = "build",
//     Test = "test",
//     Package = "package",
//     Publish = "publish",
//     Deploy = "deploy",
//     DastScan = "DAST-scan"
// }

const stagePromptMap: { [key: string]: string } = {
    "static-checks": StaticCheckPrompt,
    "build": BuildPrompt,
    "test": TestPrompt,
    "package": PackagePrompt,
    "publish": PublishPrompt,
    "CloudDeploy": CloudDeployPrompt,
    "deploy": DeployPrompt,
    "DAST-scan": DastScanPrompt
}

const stagesToInclude = (stages: string[]): string => {
    if (stages.includes("deploy")) {
        let index = stages.findIndex((element) => element == "deploy")
        stages.splice(index,0,"CloudDeploy")
    }

    let actions = ""
    stages.forEach((stage, index) => {
        actions = actions + `${index + 3} - ${stagePromptMap[stage]}    `
    })

    return actions
}

const COMPLETE_YAML_PROMPT = (stages: string[]): string => `
    I want you to act as an Devops consultant. I will provide some specific information about different jobs and stages of a gitlab pipeline and it will be your job to generate a .gitlab-ci.yml file based on the requirements. You should use your computer science, CI/CD pipeline, golang, docker, AWS and gitlab knowledge to solve my problem.
  I want you to reply with the .gitlab-ci.yml file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
  \`\`\`
  Write a .gitlab-ci.yml file for a golang application by performing the following actions:
    
    1 - ${IncludeStagesPrompt(stages)}
    
    2 - ${VariablesPrompt}
    
    ${stagesToInclude(stages)}
    
  Note: Map the job names attentively with the stages. Don't create any template unless specifically instructed, define the jobs directly.
  \`\`\`
`

export {COMPLETE_YAML_PROMPT}
