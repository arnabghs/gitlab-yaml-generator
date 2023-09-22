export type Stage = "static-checks" | "build" | "test" | "package" | "publish" | "deploy" | "DAST-scan" | "deploy-minikube"

export type StaticCheckJobName = "lint" | "gemnasium-dependency_scanning"

export type StageProps = {
    name: Stage
    selected: boolean
}

export type BuildParam = { "GOOS": string, "GOARCH": string }

export type TechStackType = "GO" | "node" | "php" | "kotlin" | "none"

export type TechBtnProps = {
    label: TechStackType
}

export const TechStackButtons: TechBtnProps[] = [
    {label: "GO"},
    {label: "node"},
    // {label: "php"},
    // {label: "kotlin"}
]

export const Stages: StageProps[] = [
    {name: "static-checks", selected: false},
    {name: "build", selected: false},
    {name: "test", selected: false},
    {name: "package", selected: false},
    {name: "publish", selected: false},
    {name: "deploy", selected: false},
    {name: "DAST-scan", selected: false},
    {name: "deploy-minikube", selected: false}
]
