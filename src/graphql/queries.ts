/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getNarejiroDevTable = /* GraphQL */ `query GetNarejiroDevTable($PK: String!, $SK: Int!) {
  getNarejiroDevTable(PK: $PK, SK: $SK) {
    PK
    SK
    scanIndex
    lastId
    cat1
    cat2
    cat3
    title
    content
    viewCnt
    catType
    catName
    parentCatId
    searchCnt
    userName
    password
    email
    postCnt
    reviseCnt
    totalCnt
    createdAt
    createdBy
    updatedAt
    updatedBy
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetNarejiroDevTableQueryVariables,
  APITypes.GetNarejiroDevTableQuery
>;
export const listNarejiroDevTables = /* GraphQL */ `query ListNarejiroDevTables(
  $filter: TableNarejiroDevTableFilterInput
  $limit: Int
  $nextToken: String
) {
  listNarejiroDevTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      PK
      SK
      scanIndex
      lastId
      cat1
      cat2
      cat3
      title
      content
      viewCnt
      catType
      catName
      parentCatId
      searchCnt
      userName
      password
      email
      postCnt
      reviseCnt
      totalCnt
      createdAt
      createdBy
      updatedAt
      updatedBy
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListNarejiroDevTablesQueryVariables,
  APITypes.ListNarejiroDevTablesQuery
>;
