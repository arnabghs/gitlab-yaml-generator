export type Stage = "static-checks" | "build" | "test" | "package" | "publish" | "deploy" | "DAST-scan"

export type StageProps = {
    name: Stage
    selected: boolean
}

export type BuildParam = { "GOOS": string, "GOARCH": string }

export type UserInput = {
    stages?: Stage[]
    templateYAML?: string
    buildParams?: BuildParam
    deployParams?: string[]
}

export type TechBtnProps = {
    label: string
    disabled: boolean
}

export const TechStackButtons: TechBtnProps[] = [
    {label: "GO", disabled: false},
    {label: "node", disabled: true},
    {label: "php", disabled: true},
    {label: "kotlin", disabled: true}
]

export const Stages: StageProps[] = [
    {name: "static-checks", selected: false},
    {name: "build", selected: false},
    {name: "test", selected: false},
    {name: "package", selected: false},
    {name: "publish", selected: false},
    {name: "deploy", selected: false},
    {name: "DAST-scan", selected: false}
]
