export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  raw: File;
  status: "ready" | "uploading" | "success" | "fail";
  progress?: number;
  url?: string;
  response?: any;
  error?: any;
}

export type UploadStatus = UploadFile["status"];
