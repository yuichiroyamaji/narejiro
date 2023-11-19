/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateKnowledge = /* GraphQL */ `subscription OnCreateKnowledge($filter: ModelSubscriptionKnowledgeFilterInput) {
  onCreateKnowledge(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateKnowledgeSubscriptionVariables,
  APITypes.OnCreateKnowledgeSubscription
>;
export const onUpdateKnowledge = /* GraphQL */ `subscription OnUpdateKnowledge($filter: ModelSubscriptionKnowledgeFilterInput) {
  onUpdateKnowledge(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateKnowledgeSubscriptionVariables,
  APITypes.OnUpdateKnowledgeSubscription
>;
export const onDeleteKnowledge = /* GraphQL */ `subscription OnDeleteKnowledge($filter: ModelSubscriptionKnowledgeFilterInput) {
  onDeleteKnowledge(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteKnowledgeSubscriptionVariables,
  APITypes.OnDeleteKnowledgeSubscription
>;
