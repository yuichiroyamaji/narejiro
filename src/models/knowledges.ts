export type KnowledgeDataStatus = 'completed' | 'pending' | 'failed';

export interface KnowledgeData {
	PK: string;
	SK: number;
	cat1: string;
	cat2: string;
	cat3: string;
	title: string;
	content: string;
	createdAt: string;
	createdBy: string;
	updatedAt: string;
	updatedBy: string;
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
	cat1: "",
	cat2: "",
	cat3: "",
	title: "",
	content: "",
	createdAt: "",
	createdBy: "",
	updatedAt: "",
	updatedBy: "",
    status: "completed"
};

