/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateNarejiroDevTable = /* GraphQL */ `subscription OnCreateNarejiroDevTable(
  $PK: String
  $SK: Int
  $cat1: Int
  $cat2: Int
  $cat3: Int
) {
  onCreateNarejiroDevTable(
    PK: $PK
    SK: $SK
    cat1: $cat1
    cat2: $cat2
    cat3: $cat3
  ) {
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
` as GeneratedSubscription<
  APITypes.OnCreateNarejiroDevTableSubscriptionVariables,
  APITypes.OnCreateNarejiroDevTableSubscription
>;
export const onUpdateNarejiroDevTable = /* GraphQL */ `subscription OnUpdateNarejiroDevTable(
  $PK: String
  $SK: Int
  $cat1: Int
  $cat2: Int
  $cat3: Int
) {
  onUpdateNarejiroDevTable(
    PK: $PK
    SK: $SK
    cat1: $cat1
    cat2: $cat2
    cat3: $cat3
  ) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateNarejiroDevTableSubscriptionVariables,
  APITypes.OnUpdateNarejiroDevTableSubscription
>;
export const onDeleteNarejiroDevTable = /* GraphQL */ `subscription OnDeleteNarejiroDevTable(
  $PK: String
  $SK: Int
  $cat1: Int
  $cat2: Int
  $cat3: Int
) {
  onDeleteNarejiroDevTable(
    PK: $PK
    SK: $SK
    cat1: $cat1
    cat2: $cat2
    cat3: $cat3
  ) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteNarejiroDevTableSubscriptionVariables,
  APITypes.OnDeleteNarejiroDevTableSubscription
>;
