export const GetCategories = `
query getCategories{
    category {
      getCategories {
        id
        name
        type
        color
        iconUrl
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

export const CreateCategory = `
  mutation createCategory($category: CategoryInputType!){
    category{
      createCategory(category: $category)
    }
  }
`

export const DeleteCategory = `
  mutation deleteCategory($id: String!){
    category{
      deleteCategory(id: $id)
    }
  }
`