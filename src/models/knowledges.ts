export type KnowledgeDataStatus = 'completed' | 'pending' | 'failed';

type UserType = {
	SK: number;
	userName: string;
};

type CategoryType = {
	SK: number;
	catName: string;
};

export interface KnowledgeDataType {
	PK: string;
	SK: number;
	cat1: CategoryType;
	cat2: CategoryType;
	cat3: CategoryType;
	title: string;
	content: string;
	createdAt: string;
	createdBy: UserType;
	updatedAt: string;
	updatedBy: UserType;
	status: KnowledgeDataStatus;
}

export interface CreateKnowledgeDataInputType {
	cat1: number;
	cat2: number;
	cat3: number;
	title: string;
	content: string;
	createdBy: number;
}

export interface UpdateKnowledgeDataInputType {
	SK: number;
	cat1: number;
	cat2: number;
	cat3: number;
	title: string;
	content: string;
	updatedBy: number;
}

export interface DeleteKnowledgeDataInputType {
	PK: string;
	SK: number;
}

export const KnowledgeDataDefault: KnowledgeDataType = {
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

