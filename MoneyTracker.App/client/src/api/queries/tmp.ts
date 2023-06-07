export const query = `
    Тут повинен бути gql запит
`
const isDev = process.env.NODE_ENV === 'development';
export const GraphQlEndpoint = isDev ? "https://localhost:7299/graphql" : "/graphql";