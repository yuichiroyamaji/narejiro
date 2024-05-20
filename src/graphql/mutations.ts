import { CreateKnowledgeDataInputType, UpdateKnowledgeDataInputType } from 'src/models/knowledges';
import {  } from 'src/models/categories';

//なれっじデータ作成
export const createKnowledgeData =  (title: string, content: string) => /* GraphQL */`
mutation createKnowledgeData {
  createKnowledgeData(input: {PK:"KWL#data", title: "${title}", content: "${content}"}) {
    title
    content
  }
}
`;

//なれっじデータ更新
export const updateKnowledgeData =  (input: UpdateKnowledgeDataInputType) => /* GraphQL */`
mutation updateNarejiroDevTable {
  updateNarejiroDevTable(input: {PK:"KWL#data", SK:${input.SK}, cat1:${input.cat1}, cat2:${input.cat2}, cat3:${input.cat3}, title:"${input.title}", content:"${input.content}", updatedBy:${input.updatedBy}}) {
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
export const deleteKnowledgeData = (knowledgeId: number) => /* GraphQL */`
mutation deleteNarejiroDevTable {
  deleteNarejiroDevTable(input: {PK:"KWL#data", SK: ${knowledgeId}}) {
    PK
    SK
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