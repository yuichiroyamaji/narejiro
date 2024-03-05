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

export const deleteKnowledgeData = (knowledgeId: number) => /* GraphQL */`
mutation deleteNarejiroDevTable {
  deleteNarejiroDevTable(input: {PK:"KWL#data", SK: ${knowledgeId}}) {
    PK
    SK
  }
}
`