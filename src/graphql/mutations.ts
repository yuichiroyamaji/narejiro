export const createTodo = /* GraphQL */ `
mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const deleteKnowledge = (knowledgeId: number) => /* GraphQL */`
mutation deleteNarejiro {
    deleteNarejiroDevTable(input: {PK: "KWL#data", SK: ${knowledgeId}}) {
      PK
      SK
      cat1
      cat2
      cat3
      title
      content
      createdAt
      createdBy
      updatedAt
      updatedBy
    }
  }
`