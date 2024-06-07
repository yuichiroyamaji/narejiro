type UserType = {
	SK: number;
	userName: string;
};

export interface CategoryDataType {
	PK: string;
	SK: number;
	catType: number;
	catName: string;
	parentCatId: number;
	srchCnt: number;
	createdAt: string;
	createdBy: UserType;
	updatedAt: string;
	updatedBy: UserType;
};

export interface CreateCategoryDataInputType {
	PK: string;
	catType: number;
	catName: string;
	parentCatId: number;
	createdBy: number;
};

export interface UpdateCategoryDataInputType {
	PK: string;
	SK: number;
	catType: number;
	catName: string;
	parentCatId: number;
	srchCnt: number;
	updated_by: number;
};

export interface DeleteCategoryDataInputType {
	PK: string;
	SK: number;
};

export const CategoryDataDefault: CategoryDataType[] = [
	{
		PK: "",
		SK: 1,
		catType: 1,
		catName: "",
		parentCatId: 0,
		srchCnt: 0,
		createdAt: "",
		createdBy: {SK: 0, userName: ""},
		updatedAt: "",
		updatedBy: {SK: 0, userName: ""}
	},
	{
		PK: "",
		SK: 2,
		catType: 2,
		catName: "",
		parentCatId: 0,
		srchCnt: 0,
		createdAt: "",
		createdBy: {SK: 0, userName: ""},
		updatedAt: "",
		updatedBy: {SK: 0, userName: ""}
	},
	{
		PK: "",
		SK: 3,
		catType: 3,
		catName: "",
		parentCatId: 0,
		srchCnt: 0,
		createdAt: "",
		createdBy: {SK: 0, userName: ""},
		updatedAt: "",
		updatedBy: {SK: 0, userName: ""}
	}
];

