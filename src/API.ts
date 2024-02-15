/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNarejiroDevTableInput = {
  PK: string,
  SK?: number | null,
  cat1?: number | null,
  cat2?: number | null,
  cat3?: number | null,
  title?: string | null,
  content?: string | null,
  catType?: number | null,
  catName?: string | null,
  parentCatId?: number | null,
  userName?: string | null,
  password?: string | null,
  email?: string | null,
  createdBy?: number | null,
};

export type NarejiroDevTable = {
  __typename: "NarejiroDevTable",
  PK: string,
  SK: number,
  scanIndex?: string | null,
  lastId?: number | null,
  cat1?: string | null,
  cat2?: string | null,
  cat3?: string | null,
  title?: string | null,
  content?: string | null,
  viewCnt?: number | null,
  catType?: number | null,
  catName?: string | null,
  parentCatId?: number | null,
  searchCnt?: number | null,
  userName?: string | null,
  password?: string | null,
  email?: string | null,
  postCnt?: number | null,
  reviseCnt?: number | null,
  totalCnt?: number | null,
  createdAt?: string | null,
  createdBy?: string | null,
  updatedAt?: string | null,
  updatedBy?: string | null,
};

export type UpdateNarejiroDevTableInput = {
  PK: string,
  SK: number,
  cat1?: number | null,
  cat2?: number | null,
  cat3?: number | null,
  title?: string | null,
  content?: string | null,
  catType?: number | null,
  catName?: string | null,
  parentCatId?: number | null,
  userName?: string | null,
  password?: string | null,
  email?: string | null,
  createdBy?: number | null,
};

export type DeleteNarejiroDevTableInput = {
  PK: string,
  SK: number,
};

export type TableNarejiroDevTableFilterInput = {
  PK?: TableStringFilterInput | null,
  SK?: TableStringFilterInput | null,
  scanIndex?: TableStringFilterInput | null,
  lastId?: TableStringFilterInput | null,
  cat1?: TableStringFilterInput | null,
  cat2?: TableStringFilterInput | null,
  cat3?: TableStringFilterInput | null,
  title?: TableStringFilterInput | null,
  content?: TableStringFilterInput | null,
  viewCnt?: TableStringFilterInput | null,
  catType?: TableStringFilterInput | null,
  catName?: TableStringFilterInput | null,
  parentCatId?: TableStringFilterInput | null,
  searchCnt?: TableStringFilterInput | null,
  userName?: TableStringFilterInput | null,
  password?: TableStringFilterInput | null,
  email?: TableStringFilterInput | null,
  postCnt?: TableStringFilterInput | null,
  reviseCnt?: TableStringFilterInput | null,
  totalCnt?: TableStringFilterInput | null,
  createdAt?: TableStringFilterInput | null,
  createdBy?: TableStringFilterInput | null,
  updatedAt?: TableStringFilterInput | null,
  updatedBy?: TableStringFilterInput | null,
};

export type TableStringFilterInput = {
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
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type NarejiroDevTableConnection = {
  __typename: "NarejiroDevTableConnection",
  items?:  Array<NarejiroDevTable | null > | null,
  nextToken?: string | null,
};

export type CreateNarejiroDevTableMutationVariables = {
  input: CreateNarejiroDevTableInput,
};

export type CreateNarejiroDevTableMutation = {
  createNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type UpdateNarejiroDevTableMutationVariables = {
  input: UpdateNarejiroDevTableInput,
};

export type UpdateNarejiroDevTableMutation = {
  updateNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type DeleteNarejiroDevTableMutationVariables = {
  input: DeleteNarejiroDevTableInput,
};

export type DeleteNarejiroDevTableMutation = {
  deleteNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type GetNarejiroDevTableQueryVariables = {
  PK: string,
  SK: number,
};

export type GetNarejiroDevTableQuery = {
  getNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type ListNarejiroDevTablesQueryVariables = {
  filter?: TableNarejiroDevTableFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNarejiroDevTablesQuery = {
  listNarejiroDevTables?:  {
    __typename: "NarejiroDevTableConnection",
    items?:  Array< {
      __typename: "NarejiroDevTable",
      PK: string,
      SK: number,
      scanIndex?: string | null,
      lastId?: number | null,
      cat1?: string | null,
      cat2?: string | null,
      cat3?: string | null,
      title?: string | null,
      content?: string | null,
      viewCnt?: number | null,
      catType?: number | null,
      catName?: string | null,
      parentCatId?: number | null,
      searchCnt?: number | null,
      userName?: string | null,
      password?: string | null,
      email?: string | null,
      postCnt?: number | null,
      reviseCnt?: number | null,
      totalCnt?: number | null,
      createdAt?: string | null,
      createdBy?: string | null,
      updatedAt?: string | null,
      updatedBy?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateNarejiroDevTableSubscriptionVariables = {
  PK?: string | null,
  SK?: number | null,
  cat1?: number | null,
  cat2?: number | null,
  cat3?: number | null,
};

export type OnCreateNarejiroDevTableSubscription = {
  onCreateNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type OnUpdateNarejiroDevTableSubscriptionVariables = {
  PK?: string | null,
  SK?: number | null,
  cat1?: number | null,
  cat2?: number | null,
  cat3?: number | null,
};

export type OnUpdateNarejiroDevTableSubscription = {
  onUpdateNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};

export type OnDeleteNarejiroDevTableSubscriptionVariables = {
  PK?: string | null,
  SK?: number | null,
  cat1?: number | null,
  cat2?: number | null,
  cat3?: number | null,
};

export type OnDeleteNarejiroDevTableSubscription = {
  onDeleteNarejiroDevTable?:  {
    __typename: "NarejiroDevTable",
    PK: string,
    SK: number,
    scanIndex?: string | null,
    lastId?: number | null,
    cat1?: string | null,
    cat2?: string | null,
    cat3?: string | null,
    title?: string | null,
    content?: string | null,
    viewCnt?: number | null,
    catType?: number | null,
    catName?: string | null,
    parentCatId?: number | null,
    searchCnt?: number | null,
    userName?: string | null,
    password?: string | null,
    email?: string | null,
    postCnt?: number | null,
    reviseCnt?: number | null,
    totalCnt?: number | null,
    createdAt?: string | null,
    createdBy?: string | null,
    updatedAt?: string | null,
    updatedBy?: string | null,
  } | null,
};
