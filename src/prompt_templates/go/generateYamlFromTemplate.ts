const YAML_FROM_TEMPLATE_PROMPT = (templateYAML: string): string => `I want you to act as an Devops consultant. I will provide a 'sample-gitlab-ci.yml' template file in two double quotes("") and it will be your job to generate a '.gitlab-ci.yml' file by consuming that sample yaml. You should use your computer science, CI/CD pipeline, golang, docker, AWS and gitlab knowledge to solve my problem.
I want you to reply with the generated '.gitlab-ci.yml' file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
\`\`\`
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""

Write a .gitlab-ci.yml file for a golang application by performing the following actions:

  1 - Include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'.
  2. Ignore all the global variables (variables present in top level 'variables' clause) and list only the variables used in the jobs 'variable' sections in 'sample-gitlab-ci.yml' file.
  3. Remove any variables whose name start with 'CI_'.
  4. Separate the variables based on whether they are used in '.cloud-deploy' hidden job of 'sample-gitlab-ci.yml' file.
    - If the variable is used in '.cloud-deploy' hidden job, list it down under 'variable' section of each deploy job separately. Make sure to use exact same deploy job name.
    - If the variable is not used in '.cloud-deploy' hidden job, list it down under global variables section of the new file. 
  
  Note: 
    1. Do not include 'stages' section in the new '.gitlab-ci.yml' file. 
    2. Do not add any job definition or stages for any job(including deploy jobs) in the new '.gitlab-ci.yml' file. The job should contain ONLY 'variable' section.
    3. Always use the exact variable names.
  \`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT}
