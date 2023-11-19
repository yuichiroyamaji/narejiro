/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createKnowledge = /* GraphQL */ `mutation CreateKnowledge(
  $input: CreateKnowledgeInput!
  $condition: ModelKnowledgeConditionInput
) {
  createKnowledge(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateKnowledgeMutationVariables,
  APITypes.CreateKnowledgeMutation
>;
export const updateKnowledge = /* GraphQL */ `mutation UpdateKnowledge(
  $input: UpdateKnowledgeInput!
  $condition: ModelKnowledgeConditionInput
) {
  updateKnowledge(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateKnowledgeMutationVariables,
  APITypes.UpdateKnowledgeMutation
>;
export const deleteKnowledge = /* GraphQL */ `mutation DeleteKnowledge(
  $input: DeleteKnowledgeInput!
  $condition: ModelKnowledgeConditionInput
) {
  deleteKnowledge(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteKnowledgeMutationVariables,
  APITypes.DeleteKnowledgeMutation
>;
