/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createNarejiroDevTable = /* GraphQL */ `mutation CreateNarejiroDevTable($input: CreateNarejiroDevTableInput!) {
  createNarejiroDevTable(input: $input) {
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
` as GeneratedMutation<
  APITypes.CreateNarejiroDevTableMutationVariables,
  APITypes.CreateNarejiroDevTableMutation
>;
export const updateNarejiroDevTable = /* GraphQL */ `mutation UpdateNarejiroDevTable($input: UpdateNarejiroDevTableInput!) {
  updateNarejiroDevTable(input: $input) {
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
` as GeneratedMutation<
  APITypes.UpdateNarejiroDevTableMutationVariables,
  APITypes.UpdateNarejiroDevTableMutation
>;
export const deleteNarejiroDevTable = /* GraphQL */ `mutation DeleteNarejiroDevTable($input: DeleteNarejiroDevTableInput!) {
  deleteNarejiroDevTable(input: $input) {
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
` as GeneratedMutation<
  APITypes.DeleteNarejiroDevTableMutationVariables,
  APITypes.DeleteNarejiroDevTableMutation
>;
