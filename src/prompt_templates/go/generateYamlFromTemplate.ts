const YAML_FROM_TEMPLATE_PROMPT = (templateYAML: string): string => `
The 'sample-gitlab-ci.yml' file is - 
\`\`\`
${templateYAML}
\`\`\`
`

export {YAML_FROM_TEMPLATE_PROMPT}
