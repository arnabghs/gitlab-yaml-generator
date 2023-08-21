const YAML_FROM_TEMPLATE_PROMPT = (templateYAML: string): string => `I want you to act as an Devops consultant. I will provide a 'sample-gitlab-ci.yml' template file in two double quotes("") and it will be your job to generate a '.gitlab-ci.yml' file by consuming that sample yaml. You should use your computer science, CI/CD pipeline, golang, docker, AWS and gitlab knowledge to solve my problem.
I want you to reply with the generated '.gitlab-ci.yml' file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
\`\`\`
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""

Write a .gitlab-ci.yml file for a golang application by performing the following actions:

  1 - Include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'
  2 - Find out all the variables used in 'sample-gitlab-ci.yml' file, remove the ones used in '.cloud-deploy' job and list the rest of them down under global variables section
  3 - create seperate variable sections for each deploy jobs with exact job name as mentioned in 'sample-gitlab-ci.yml' template file
  4 - Find out all the variables used in '.cloud-deploy' job and list them down in respective deploy jobs variable section
  
  Note: Do not add any job definition(including deploy jobs) and 'stages' section in the new 'sample-gitlab-ci.yml' file. Always use the exact variable name.
  \`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT}
