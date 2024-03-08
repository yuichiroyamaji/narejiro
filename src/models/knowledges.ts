export type KnowledgeDataStatus = 'completed' | 'pending' | 'failed';

type User = {
	SK: number;
	userName: string;
};

type Category = {
	SK: number;
	catName: string;
};

export interface KnowledgeData {
	PK: string;
	SK: number;
	cat1: Category;
	cat2: Category;
	cat3: Category;
	title: string;
	content: string;
	createdAt: string;
	createdBy: User;
	updatedAt: string;
	updatedBy: User;
  status: KnowledgeDataStatus;
}

export interface CreateKnowledgeDataInput {
	PK: string;
	SK: number;
	cat1: number;
	cat2: number;
	cat3: number;
	title: string;
	content: string;
	ref_mtrl_path: string;
	ref_mtrl_name: string;
	ref_red_url: string;
	ref_link_url: string;
	ref_attch_url: string;
	note: string;
	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
  status: KnowledgeDataStatus;
}

export interface UpdateKnowledgeDataInput {
	PK: string;
	SK: number;
	cat1: number;
	cat2: number;
	cat3: number;
	title: string;
	content: string;
	ref_mtrl_path: string;
	ref_mtrl_name: string;
	ref_red_url: string;
	ref_link_url: string;
	ref_attch_url: string;
	note: string;
	created_at: string;
	created_by: number;
	updated_at: string;
	updated_by: number;
  status: KnowledgeDataStatus;
}

export interface DeleteKnowledgeDataInput {
	PK: string;
	SK: number;
}

export const KnowledgeDataDefault: KnowledgeData = {
	PK: "",
	SK: 0,
	cat1: {SK: 0, catName: ""},
	cat2: {SK: 0, catName: ""},
	cat3: {SK: 0, catName: ""},
	title: "",
	content: "",
	createdAt: "",
	createdBy: {SK: 0, userName: ""},
	updatedAt: "",
	updatedBy: {SK: 0, userName: ""},
    status: "completed"
};

