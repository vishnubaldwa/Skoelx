export interface CreateProductInput {
  code: string;
  name: string;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DEVELOPMENT" | "RETIRED";
}

export interface UpdateProductInput {
  code?: string;
  name?: string;
  description?: string;
  status?: "ACTIVE" | "INACTIVE" | "DEVELOPMENT" | "RETIRED";
}

export interface ProductFilters {
  search?: string;
  status?: "ACTIVE" | "INACTIVE" | "DEVELOPMENT" | "RETIRED";
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  id: string;
  code: string;
  name: string;
  description: string | null;
  status: "ACTIVE" | "INACTIVE" | "DEVELOPMENT" | "RETIRED";
  createdAt: Date;
  updatedAt: Date;
}