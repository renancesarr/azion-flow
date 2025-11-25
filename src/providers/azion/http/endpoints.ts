export const AZION_API_BASE = "https://api.azion.com/v4";

// storage
export const getBucketsUrl = () => "/edge_storage/buckets";
export const createBucketUrl = () => "/edge_storage/buckets";
export const uploadFileUrl = (bucket: string, path: string) => `/edge_storage/buckets/${bucket}/files/${path}`;

// applications
export const listApplicationsUrl = () => "/applications";

// domains
export const getDomainConfigUrl = (domainId: string) => `/domains/${domainId}/config`;
