const YAML_FROM_TEMPLATE_PROMPT_NODE = (templateYAML: string): string => `
The 'sample-gitlab-ci.yml' file is - 
\`\`\`
${templateYAML}
\`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT_NODE}
