import { CreateKnowledgeDataInputType, UpdateKnowledgeDataInputType, DeleteKnowledgeDataInputType } from 'src/models/knowledges';
import { CreateCategoryDataInputType } from 'src/models/categories';

//なれっじデータ作成
export const createKnowledgeData =  (input: CreateKnowledgeDataInputType) => /* GraphQL */`
mutation createNarejiroDevTable {
  createNarejiroDevTable(input: {PK:"KWL#data", cat1:${input.cat1}, cat2:${input.cat2}, cat3:${input.cat3}, title:"${input.title}", content:"""${input.content}""", createdBy:${input.createdBy}}) {
    SK
    title
  }
}
`;

//なれっじデータ更新
export const updateKnowledgeData =  (input: UpdateKnowledgeDataInputType) => /* GraphQL */`
mutation updateNarejiroDevTable {
  updateNarejiroDevTable(input: {PK:"KWL#data", SK:${input.SK}, cat1:${input.cat1}, cat2:${input.cat2}, cat3:${input.cat3}, title:"${input.title}", content:"""${input.content}""", updatedBy:${input.updatedBy}}) {
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
    updatedAt
    updatedBy {
      SK
      userName
    }
    createdAt
    createdBy {
      SK
      userName
    }
  }
}
`;

//なれっじデータ削除
export const deleteKnowledgeData = (input: DeleteKnowledgeDataInputType) => /* GraphQL */`
mutation deleteNarejiroDevTable {
  deleteNarejiroDevTable(input: {PK:"KWL#data", SK: ${input.SK}}) {
    SK
    title
  }
}
`;

//カテゴリデータ作成
export const createCategoryData = (input: CreateCategoryDataInputType) => /* GraphQL */`
mutation createCategoryData {
  createNarejiroDevTable(input: {PK:"CAT#data", catType:${input.catType}, catName:"${input.catName}", parentCatId:${input.parentCatId}, createdBy:${input.createdBy}}) {
    PK
    SK
    catType
    catName
    parentCatId
    updatedAt
    updatedBy {
      SK
      userName
    }
    createdAt
    createdBy {
      SK
      userName
    }
  }
}
`;

//ユーザデータ作成
export const createUserData =  (cognitoUserId: string, email: string, userName: string) => /* GraphQL */`
mutation createUserData {
  createNarejiroDevTable(input: {PK: "USR#data", cognitoUserId: "${cognitoUserId}", email: "${email}", userName: "${userName}", createdBy: 0}) {
    cognitoUserId
    email
    userName
  }
}
`;