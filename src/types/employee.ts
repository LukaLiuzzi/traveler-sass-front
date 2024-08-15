export type Employee = {
  _id: string;
  email: string;
  name: string;
  lastName: string;
  createdAt: Date;
  deletedAt: Date;
  updatedAt: Date;
  status: "active" | "inactive" | "deleted";
  role: "admin" | "support" | "sales" | "finance";
  tenantId: string;
};
