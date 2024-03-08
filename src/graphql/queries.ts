export const listKnowledgeDatas = /* GraphQL */ `
query listNarejiroDevTables {
    listNarejiroDevTables(filter: {PK: {eq: "KWL#data"}}) {
      items {
        PK
        SK
        cat1 {
          SK
          catName
        }
        cat2 {
          SK
          catName
        }
        cat3 {
          SK
          catName
        }
        title
        content
        createdAt
        createdBy {
          SK
          userName
        }
        updatedAt
        updatedBy {
          SK
          userName
        }
    }
  }
}
`;

export const listCat1s = /* GraphQL */ `
query listKnowledgeDatas {
  listKnowledgeDatas {
    items {
      PK
      SK
      cat1
      cat2
      cat3
      created_at
      created_by
      scan_index
      updated_at
      updated_by
      last_id
      title
      content
    }
  }
}
`;