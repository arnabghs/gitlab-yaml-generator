const YAML_FROM_TEMPLATE_PROMPT_NODE = (templateYAML: string): string => `I want you to act as an Devops consultant. I will provide a 'sample-gitlab-ci.yml' template file in two double quotes("") and it will be your job to generate a '.gitlab-ci.yml' file by consuming that sample yaml. You should use your computer science, CI/CD pipeline, node js, docker, AWS and gitlab knowledge to solve my problem.
I want you to reply with the generated '.gitlab-ci.yml' file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
\`\`\`
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""

Write a .gitlab-ci.yml file for a 'node js' application by performing the following actions:

1 - Make use of \`include\` keyword of 'gitlab' to include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'. Do not include any contents or script of 'sample-gitlab-ci.yml' file in new '.gitlab-ci.yml' to avoid duplication.

2 - create seperate variable sections for each deploy jobs with exact job name as mentioned in 'sample-gitlab-ci.yml' file and Do not create separate variable section for '.cloud-deploy' job.

3 - Figure out the variables used in '.cloud-deploy' job in provided 'sample-gitlab-ci.yml' file and list the variables under the deploy jobs variable section. 

4 - Figure out the remaining all variables excluding '.cloud-deploy' job variables used in the 'sample-gitlab-ci.yml' file and list them in global variable section of '.gitlab-ci.yml' file.

5 - Do not repeat or duplicate the variables listed in global variable section again in deploy jobs variable section and vice versa.

6 - Do not add any job definition(of deploy jobs, '.cloud-deploy' job), environment and 'stages' section in the new '.gitlab-ci.yml' file from 'sample-gitlab-ci.yml' file. Always use the exact variable name.

7 - Use \`VARIABLE_NAME: \${VARIABLE_VALUE}\` format while listing the variables.

  \`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT_NODE}
