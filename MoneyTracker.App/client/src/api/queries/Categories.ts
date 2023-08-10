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

export const CreateCategory = `
  mutation createCategory($category: CategoryInputType!){
    category{
      createCategory(category: $category)
    }
  }
`


export const EditCategory = `
  mutation createCategory($category: CategoryInputType!){
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