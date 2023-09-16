export const GetCategories = `
query getCategories{
    category {
      getCategories {
        id
        name
        type
        color
        iconUrl
        isActive
        isService
      }
    }
  }
  `

export const CreateCategory = `
  mutation createCategory($category: CreateCategoryInputType!){
    category{
      createCategory(category: $category)
    }
  }
`


export const EditCategory = `
  mutation createCategory($category: UpdateCategoryInputType!){
    category{
      editCategory(category: $category)
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