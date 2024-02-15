
export const listKnowledges = /* GraphQL */ `
query listNarejiroDevTables {
    listNarejiroDevTables(filter: {PK: {eq: "KWL#data"}}) {
      items {
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
  }
  `