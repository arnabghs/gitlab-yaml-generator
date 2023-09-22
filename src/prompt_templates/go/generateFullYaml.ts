import {BuildParam, Stage, StaticCheckJobName} from "../../data/data";

const VariablesPrompt = (stages: string[]): string => {
    let prompt = `
    Use variables:
        `

    if (stages.includes("build")) {
        prompt = prompt + ` - 'GOLANG_IMAGE' to determine the image to use in 'build' and 'test' job. Use value "golang:1.16"
         - 'GO_SERVICE' to determine the path of go build output. Use value "output"
        `
    }
    if (stages.includes("static-checks")) {
        prompt = prompt + ` - 'GOLINT_IMAGE' to determine the docker image for running 'golangci-lint'. Use the latest image available
        `
    }
    if (stages.includes("package")) {
        prompt = prompt + ` - 'DOCKERFILE_PATH' to be used to specify file Dockerfile path. Use value 'Dockerfile'  
                            - 'DOCKER_IMAGE_TARFILE': to be used to specify tar file. Use value "\${CI_PROJECT_TITLE}-tar.tar"
        `
    }
    if (stages.includes("publish")) {
        prompt = prompt + ` - 'FINAL_IMAGETAG' to determine the final tag of the image before it is pushed. Use value 'arnabghs/$APP_NAME-\${CI_COMMIT_SHORT_SHA}'
        `
    }
    if (stages.includes("DAST-scan")) {
        prompt = prompt + ` - 'DAST_ENDPOINT' to be used in 'zap-baseline-dast' job. Use value "https://apidev.my-app.com"
        `
    }

    return prompt
}

const staticCheckPrompt = (jobs?: StaticCheckJobName[]): string => {
    if (!Array.isArray(jobs)) return ""

    let jobPrompt: { [key: string]: string } = {
        "lint": "this job will run linter for the golang repository using 'golangci-lint' tool. Use the docker image in '$GOLINT_IMAGE' variable. Output format should be 'code-climate'. Pass the output in artefacts as gitlab 'codequality' reports.",
        "gemnasium-dependency_scanning": "this job uses the gitlab template 'Security/Dependency-Scanning.gitlab-ci.yml' to run dependency check. Pass the job report in artefacts as 'dependency_scanning' reports."
    }

    return jobs.reduce((prevInstruction, job) => {
        return prevInstruction + `  - '${job}': ${jobPrompt[job]}
        `
    }, `'static-checks' stage will contain following job names:
        `)
}

const buildPrompt = (buildParam?: BuildParam): string => {
    if (!buildParam) return ""
    return `
    'build' stage will contain following job names:
      - 'compile': this job will use $GOLANG_IMAGE to build binary from 'main.go' file after setting env variables to build the binary for '${buildParam.GOOS}' operating system and '${buildParam.GOARCH}' architecture. It will output the binary in '$GO_SERVICE' variable path and pass it along in artefacts path.
`
}

const TestPrompt = `
    'test' stage will contain following job names:
      - 'unit-test': this job will use $GOLANG_IMAGE to run all tests in the repository
`

const PackagePrompt = `
    'package' stage will contain following job names:
      - 'docker-build': this job will build a docker image from docker file mentioned in '$DOCKERFILE_PATH' variable  with tag '$CI_PROJECT_TITLE-\${CI_COMMIT_SHORT_SHA}' and build context as current directory. This job uses the 'latest' tag of the 'docker' "image" at the job level. This job also exposes Docker within Docker (DinD) as a service with 'name' value 'docker:24.0.5-dind' and 'alias' value 'dockerdeamon'. This job uses variable 'DOCKER_TLS_CERTDIR' with value "". This job also uses 'DOCKER_HOST' variable with value 'tcp://dockerdeamon:2375' to specify docker host. Then it will create a tar of the generated image under the output path '$DOCKER_IMAGE_TARFILE' and pass it along in artefacts path.
`

const PublishPrompt = `
    'publish' stage will contain following job names:
     - 'publish-image': this job loads the docker image from '$DOCKER_IMAGE_TARFILE' input using 'latest' tag of 'docker' image. This job also exposes Docker within Docker (DinD) as a service with 'name' value 'docker:24.0.5-dind' and 'alias' value 'dockerdeamon'. This job uses variable 'DOCKER_TLS_CERTDIR' with value "". This job also uses 'DOCKER_HOST' variable with value 'tcp://dockerdeamon:2375' to specify docker host. Then the image will be tagged as '$FINAL_IMAGETAG' and pushed to dockerhub. Authenticate with Docker registry with username stored in gitlab environment variable '$DOCKER_USERNAME' and password stored in gitlab environment variable '$DOCKER_PASSWORD'  before pushing the image.
`

const CloudDeployPrompt = `
    create a gitlab job named '.cloud-deploy' without associating it any stage. It will use 'amazon/aws-cli:2.11.7' image to deploy the image into AWS ECS. First it is going register-task-definition with cli input json '$TASK_DEFINITION_FILE' and aws profile '$AWS_PROFILE' variable into '$AWS_DEFAULT_REGION' region. Next, it will update-service with cli input json '$SERVICE_DEFINITION_FILE', service-name '$SERVICE_NAME' and cluster '$CLUSTER_NAME' in '$AWS_DEFAULT_REGION' region.
`

const deployPrompt = (envs?: string[]): string => {
    if (!Array.isArray(envs)) return ""

    let instructions = envs.reduce((prevInstruction, env) => {
        return prevInstruction + `  - 'deploy-${env}': this job will extend '.cloud-deploy'. Use environment name: '${env}'
        `
    }, `'deploy' stage will contain following job names:
        `)

    instructions = `${instructions}  Note: Do not create a job with only 'deploy' name.
    `
    return instructions
}

const DastScanPrompt = `
    'DAST-scan' stage will contain following job names:
      - 'zap-baseline-dast': this job will run zap baseline scan on '$DAST_ENDPOINT' variable url and pass the generated report in artefacts path.
`

const IncludeStagesPrompt = (stages: Stage[]): string => {
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

const stagesToInclude = (stages: Stage[], buildParams?: BuildParam, deployParams?: string[], staticCheckParams?: StaticCheckJobName[]): string => {
    const stagePromptMap: { [key: string]: string } = {
        "static-checks": staticCheckPrompt(staticCheckParams),
        "build": buildPrompt(buildParams),
        "test": TestPrompt,
        "package": PackagePrompt,
        "publish": PublishPrompt,
        "CloudDeploy": CloudDeployPrompt,
        "deploy": deployPrompt(deployParams),
        "DAST-scan": DastScanPrompt
    }

    const promptKeys: string[] = [...stages]

    if (promptKeys.includes("deploy")) {
        let index = promptKeys.findIndex((element) => element === "deploy")
        promptKeys.splice(index, 0, "CloudDeploy")
    }

    let actions = ""
    promptKeys.forEach((promptKey, index) => {
        actions = actions + `${index + 3} - ${stagePromptMap[promptKey]}
    `
    })

    return actions
}

const COMPLETE_YAML_PROMPT = (stages: Stage[], buildParams?: BuildParam, deployParams?: string[], staticCheckParams?: StaticCheckJobName[]): string => `
    I want you to act as an Devops consultant. I will provide some specific information about different jobs and stages of a gitlab pipeline and it will be your job to generate a .gitlab-ci.yml file based on the requirements. You should use your computer science, CI/CD pipeline, golang, docker, AWS and gitlab knowledge to solve my problem.
  I want you to reply with the .gitlab-ci.yml file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
  \`\`\`
  Write a .gitlab-ci.yml file for a golang application by performing the following actions:
    
    1 - ${IncludeStagesPrompt(stages)}
    
    2 - ${VariablesPrompt(stages)}
    
    ${stagesToInclude(stages, buildParams, deployParams, staticCheckParams)}
    
  Note: Map the job names attentively with the stages. Don't create any template unless specifically instructed, define the jobs directly.
  \`\`\`
`

export {COMPLETE_YAML_PROMPT}
