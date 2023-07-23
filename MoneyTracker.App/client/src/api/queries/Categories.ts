export const GetCategories = `
query getCategories{
    category {
      getCategories {
        id
        name
        type
        isActive
      }
    }
  }
  `

  export const EditCategory = `
  mutation editCategory($categoryId: String!, $name: String!){
    category {
      renameCategoryTest(categoryId: $categoryId, name: $name)
    }
  }`