import axios, {AxiosError, AxiosResponse} from "axios";

const uploadToGitlab = (uploadOption: string, repoID: string, accessToken: string, branch: string, yamlOutput: string,
                        setIsLoading: (b: boolean) => void,
                        handleClose: () => void): void => {
    let method = ""

    if (uploadOption === "create") {
        method = "post"
    }

    if (uploadOption === "update") {
        method = "put"
    }

    let response = axios({
        method: method,
        url: `https://gitlab.com/api/v4/projects/${repoID}/repository/files/.gitlab-ci.yml`,
        data: {
            "branch": branch,
            "author_email": "arnabghosh144@gmail.com",
            "author_name": "Arnab Ghosh",
            "content": yamlOutput,
            "commit_message": `${uploadOption} gitlab yaml file from app`
        },
        headers: {'Content-Type': 'application/json', 'PRIVATE-TOKEN': accessToken},
    });

    response.then((res: AxiosResponse) => {
        setIsLoading(false)
        if (res.status >= 200 && res.status < 300) {
            handleClose()
            console.log("Push successful !")
        }
    }).catch((err: AxiosError) => alert(err.code))
}

export {uploadToGitlab}
