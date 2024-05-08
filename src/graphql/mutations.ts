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
export const updateKnowledgeData =  (knowledgeId: number,title: String,content:String) => /* GraphQL */`
mutation updateKnowledgeData {
  updateKnowledgeData(input: {PK:"KWL#data", SK: ${knowledgeId}, title: "${title}",content: "${content}"}) {
    PK
    SK
    title
    content
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