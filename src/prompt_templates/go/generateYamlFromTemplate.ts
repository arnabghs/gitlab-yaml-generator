const YAML_FROM_TEMPLATE_PROMPT = (templateYAML: string): string => `
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""
  
Write a .gitlab-ci.yml file for a golang application by performing the following actions:

  1 - Include 'sample-gitlab-ci.yml' file at top of new '.gitlab-ci.yml' file with ref 'main' and project 'my-project'.
  2 - Create separate variable sections ONLY for deploy jobs(except '.cloud-deploy' hidden job) with exact job name as mentioned in 'sample-gitlab-ci.yml' template file.
  3 - Find out all the variables used in '.cloud-deploy' job and list them down in all deploy jobs variable section.
  4 - Find out all other variables used in 'sample-gitlab-ci.yml' file except the variables used in '.cloud-deploy' hidden job and list them down under global variables section. 
  
  Note: 
    1. Do not include 'stages' section in the new '.gitlab-ci.yml' file. 
    2. Do not add any job definition or stages for any job(including deploy jobs) in the new '.gitlab-ci.yml' file. The job should contain ONLY 'variable' clause.
    3. Always use the exact variable names.
`

export {YAML_FROM_TEMPLATE_PROMPT}
