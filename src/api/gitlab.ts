import axios from "axios";

const uploadToGitlab = (uploadOption: string, repoID: string, accessToken: string, branch: string, yamlOutput: string): void => {
    let method = ""

    if (uploadOption === "create") {
        method = "post"
    }

    if (uploadOption === "update") {
        method = "put"
    }

    axios({
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
}

export {uploadToGitlab}
