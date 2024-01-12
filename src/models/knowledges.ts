export type KnowledgeDataStatus = 'completed' | 'pending' | 'failed';

export interface KnowledgeData {
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
	created_at: Date;
	created_by: number;
	updated_at: Date;
	updated_by: number;
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
	created_at: Date;
	created_by: number;
	updated_at: Date;
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
	created_at: Date;
	created_by: number;
	updated_at: Date;
	updated_by: number;
  status: KnowledgeDataStatus;
}

export interface DeleteKnowledgeDataInput {
	PK: string;
	SK: number;
}

