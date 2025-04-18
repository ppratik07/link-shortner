export interface LinkCreateInput {
    url: string;
    slug?: string;
  }
  
  export interface LinkResponse {
    id: number;
    url: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
  }