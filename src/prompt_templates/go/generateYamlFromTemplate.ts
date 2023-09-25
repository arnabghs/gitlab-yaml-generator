const YAML_FROM_TEMPLATE_PROMPT = (templateYAML: string): string => `I want you to act as an Devops consultant. I will provide a 'sample-gitlab-ci.yml' template file in two double quotes("") and it will be your job to generate a '.gitlab-ci.yml' file by consuming that sample yaml. You should use your computer science, CI/CD pipeline, golang, docker, AWS and gitlab knowledge to solve my problem.
I want you to reply with the generated '.gitlab-ci.yml' file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
\`\`\`
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""

Write a .gitlab-ci.yml file for a golang application by performing the following actions:

  1 - Include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'.
  2 - IGNORE all the global variables (variables present in top level 'variables' clause) and any variables whose name start with 'CI_', List only the variables used in the jobs 'variable' sections in 'sample-gitlab-ci.yml' file. List them at appropriate places based on the following instructions: 
    - If the variable is used in '.cloud-deploy' hidden job, list it down under 'variable' section of each deploy job separately. Make sure to use exact same deploy job name.
    - If the variable is not used in '.cloud-deploy' hidden job, list it down under top level global variables section of the new gitlab CI file. Strictly do not duplicate any '.cloud-deploy' job variables in global variables section.
    - Do not create any job variable section except 'deploy' jobs. 
  
  Note: 
    1. Do not include 'stages' section in the new '.gitlab-ci.yml' file. 
    2. Do not add any job definition or stages for any job(including deploy jobs) in the new '.gitlab-ci.yml' file. The job should contain ONLY 'variable' section.
    3. Always use the exact variable names.
  \`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT}
