/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateKnowledgeInput = {
  id?: string | null,
  title: string,
  contents?: string | null,
  cat_1?: number | null,
  cat_2?: number | null,
  cat_3?: number | null,
  ref_file_path?: string | null,
  ref_file_name?: string | null,
  ref_redmine_url?: string | null,
  ref_link?: string | null,
  note?: string | null,
  created_at?: string | null,
  created_by?: number | null,
  updated_at?: string | null,
  updated_by?: number | null,
};

export type ModelKnowledgeConditionInput = {
  title?: ModelStringInput | null,
  contents?: ModelStringInput | null,
  cat_1?: ModelIntInput | null,
  cat_2?: ModelIntInput | null,
  cat_3?: ModelIntInput | null,
  ref_file_path?: ModelStringInput | null,
  ref_file_name?: ModelStringInput | null,
  ref_redmine_url?: ModelStringInput | null,
  ref_link?: ModelStringInput | null,
  note?: ModelStringInput | null,
  created_at?: ModelStringInput | null,
  created_by?: ModelIntInput | null,
  updated_at?: ModelStringInput | null,
  updated_by?: ModelIntInput | null,
  and?: Array< ModelKnowledgeConditionInput | null > | null,
  or?: Array< ModelKnowledgeConditionInput | null > | null,
  not?: ModelKnowledgeConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Knowledge = {
  __typename: "Knowledge",
  id: string,
  title: string,
  contents?: string | null,
  cat_1?: number | null,
  cat_2?: number | null,
  cat_3?: number | null,
  ref_file_path?: string | null,
  ref_file_name?: string | null,
  ref_redmine_url?: string | null,
  ref_link?: string | null,
  note?: string | null,
  created_at?: string | null,
  created_by?: number | null,
  updated_at?: string | null,
  updated_by?: number | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateKnowledgeInput = {
  id: string,
  title?: string | null,
  contents?: string | null,
  cat_1?: number | null,
  cat_2?: number | null,
  cat_3?: number | null,
  ref_file_path?: string | null,
  ref_file_name?: string | null,
  ref_redmine_url?: string | null,
  ref_link?: string | null,
  note?: string | null,
  created_at?: string | null,
  created_by?: number | null,
  updated_at?: string | null,
  updated_by?: number | null,
};

export type DeleteKnowledgeInput = {
  id: string,
};

export type ModelKnowledgeFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  contents?: ModelStringInput | null,
  cat_1?: ModelIntInput | null,
  cat_2?: ModelIntInput | null,
  cat_3?: ModelIntInput | null,
  ref_file_path?: ModelStringInput | null,
  ref_file_name?: ModelStringInput | null,
  ref_redmine_url?: ModelStringInput | null,
  ref_link?: ModelStringInput | null,
  note?: ModelStringInput | null,
  created_at?: ModelStringInput | null,
  created_by?: ModelIntInput | null,
  updated_at?: ModelStringInput | null,
  updated_by?: ModelIntInput | null,
  and?: Array< ModelKnowledgeFilterInput | null > | null,
  or?: Array< ModelKnowledgeFilterInput | null > | null,
  not?: ModelKnowledgeFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelKnowledgeConnection = {
  __typename: "ModelKnowledgeConnection",
  items:  Array<Knowledge | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionKnowledgeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  contents?: ModelSubscriptionStringInput | null,
  cat_1?: ModelSubscriptionIntInput | null,
  cat_2?: ModelSubscriptionIntInput | null,
  cat_3?: ModelSubscriptionIntInput | null,
  ref_file_path?: ModelSubscriptionStringInput | null,
  ref_file_name?: ModelSubscriptionStringInput | null,
  ref_redmine_url?: ModelSubscriptionStringInput | null,
  ref_link?: ModelSubscriptionStringInput | null,
  note?: ModelSubscriptionStringInput | null,
  created_at?: ModelSubscriptionStringInput | null,
  created_by?: ModelSubscriptionIntInput | null,
  updated_at?: ModelSubscriptionStringInput | null,
  updated_by?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionKnowledgeFilterInput | null > | null,
  or?: Array< ModelSubscriptionKnowledgeFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateKnowledgeMutationVariables = {
  input: CreateKnowledgeInput,
  condition?: ModelKnowledgeConditionInput | null,
};

export type CreateKnowledgeMutation = {
  createKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateKnowledgeMutationVariables = {
  input: UpdateKnowledgeInput,
  condition?: ModelKnowledgeConditionInput | null,
};

export type UpdateKnowledgeMutation = {
  updateKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteKnowledgeMutationVariables = {
  input: DeleteKnowledgeInput,
  condition?: ModelKnowledgeConditionInput | null,
};

export type DeleteKnowledgeMutation = {
  deleteKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetKnowledgeQueryVariables = {
  id: string,
};

export type GetKnowledgeQuery = {
  getKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListKnowledgesQueryVariables = {
  filter?: ModelKnowledgeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListKnowledgesQuery = {
  listKnowledges?:  {
    __typename: "ModelKnowledgeConnection",
    items:  Array< {
      __typename: "Knowledge",
      id: string,
      title: string,
      contents?: string | null,
      cat_1?: number | null,
      cat_2?: number | null,
      cat_3?: number | null,
      ref_file_path?: string | null,
      ref_file_name?: string | null,
      ref_redmine_url?: string | null,
      ref_link?: string | null,
      note?: string | null,
      created_at?: string | null,
      created_by?: number | null,
      updated_at?: string | null,
      updated_by?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateKnowledgeSubscriptionVariables = {
  filter?: ModelSubscriptionKnowledgeFilterInput | null,
};

export type OnCreateKnowledgeSubscription = {
  onCreateKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateKnowledgeSubscriptionVariables = {
  filter?: ModelSubscriptionKnowledgeFilterInput | null,
};

export type OnUpdateKnowledgeSubscription = {
  onUpdateKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteKnowledgeSubscriptionVariables = {
  filter?: ModelSubscriptionKnowledgeFilterInput | null,
};

export type OnDeleteKnowledgeSubscription = {
  onDeleteKnowledge?:  {
    __typename: "Knowledge",
    id: string,
    title: string,
    contents?: string | null,
    cat_1?: number | null,
    cat_2?: number | null,
    cat_3?: number | null,
    ref_file_path?: string | null,
    ref_file_name?: string | null,
    ref_redmine_url?: string | null,
    ref_link?: string | null,
    note?: string | null,
    created_at?: string | null,
    created_by?: number | null,
    updated_at?: string | null,
    updated_by?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
