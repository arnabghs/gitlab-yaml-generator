const YAML_FROM_TEMPLATE_PROMPT_NODE = (templateYAML: string): string => `I want you to act as an Devops consultant. I will provide a 'sample-gitlab-ci.yml' template file in two double quotes("") and it will be your job to generate a '.gitlab-ci.yml' file by consuming that sample yaml. You should use your computer science, CI/CD pipeline, node js, docker, AWS and gitlab knowledge to solve my problem.
I want you to reply with the generated '.gitlab-ci.yml' file only, do not write any explanations. My first request is delimited by triple backticks(\`\`\`) -
\`\`\`
The 'sample-gitlab-ci.yml' file is - 
""
${templateYAML}
""

Write a .gitlab-ci.yml file for a 'node js' application by performing the following actions:
  \`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT_NODE}
