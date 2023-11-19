/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getKnowledge = /* GraphQL */ `query GetKnowledge($id: ID!) {
  getKnowledge(id: $id) {
    id
    title
    contents
    cat_1
    cat_2
    cat_3
    ref_file_path
    ref_file_name
    ref_redmine_url
    ref_link
    note
    created_at
    created_by
    updated_at
    updated_by
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetKnowledgeQueryVariables,
  APITypes.GetKnowledgeQuery
>;
export const listKnowledges = /* GraphQL */ `query ListKnowledges(
  $filter: ModelKnowledgeFilterInput
  $limit: Int
  $nextToken: String
) {
  listKnowledges(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      contents
      cat_1
      cat_2
      cat_3
      ref_file_path
      ref_file_name
      ref_redmine_url
      ref_link
      note
      created_at
      created_by
      updated_at
      updated_by
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListKnowledgesQueryVariables,
  APITypes.ListKnowledgesQuery
>;
