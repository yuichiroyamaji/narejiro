//なれっじ一覧データ取得
export const listKnowledgeData = /* GraphQL */ `
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

//カテゴリ一覧データ取得
export const listCategoryData = /* GraphQL */ `
query listNarejiroDevTables {
    listNarejiroDevTables(filter: {PK: {eq: "CAT#data"}}) {
      items {
        PK
        SK
        catType
        catName
        parentCatId
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

//ユーザデータ取得（Eメール）
export const getUserDataByEmail = (email: string) => /* GraphQL */ `
query getUserDataByEmail {
  getUserDataByEmail(email: "${email}") {
    PK
    SK
    cognitoUserId
    userName
    email
  }
}
`;

//ユーザデータ取得（CognitoユーザID）
export const getUserDataByCognitoUserId = (cognitoUserId: string) => /* GraphQL */ `
query getUserDataByCognitoUserId {
  getUserDataByCognitoUserId(cognitoUserId: "${cognitoUserId}") {
    PK
    SK
    cognitoUserId
    userName
    email
  }
}
`;
