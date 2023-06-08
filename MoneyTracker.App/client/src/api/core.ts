const baseURL = "https://localhost:7299/graphql"

export const request = async (query?: string, variables?: any) => {
    if(!query)
        return

    return (await fetch(baseURL, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, variables})
    })).json()
}