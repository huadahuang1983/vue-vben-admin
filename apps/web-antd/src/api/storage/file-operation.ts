import { v4 as uuid } from 'uuid';

import { baseRequestClient, requestClient } from '#/api/request';

export interface FileUploadRequestModel {
  platform?: string;
  path?: string;
  originalFilename?: string;
  file: string;
}

export interface FileInfoModel {
  url: string;
  platform: string;
  path: string;
  filename: string;
  createTime: Date;
  thUrl: string;
  originalFilename: string;
}

interface FilePresignedParam {
  id?: string;
  url?: string;
  platform?: string;
  path?: string;
  originalFilename?: string;
  filename?: string;
  contentDisposition?: string; // 下载时设置
  contentType?: string;
  method?: string;
}

/**
 *
 * @param param 预签名
 * @returns
 */
export async function filePresignedApi(param: FilePresignedParam) {
  return requestClient.post('/storage/file/presigned', param);
}

export async function filePresignedRecordApi(param: FilePresignedParam) {
  return requestClient.post('/storage/file/presigned/record', param);
}

/**
 * 一般上传接口
 * @param platform
 * @param path
 * @param file
 * @returns
 */
export async function uploadFileApi(
  platform: string = '',
  path: string = '',
  file: File,
) {
  const originalFilename = file.name;
  const filename =
    uuid().replaceAll('-', '') +
    originalFilename.slice(Math.max(0, originalFilename.lastIndexOf('.')));
  const mimeType = file.type;
  // 请求预签名
  const presignedParam = {
    platform,
    path,
    method: 'PUT',
    filename,
    originalFilename,
    contentType: mimeType,
  };
  const presignedResult = await filePresignedApi(presignedParam);
  if (presignedResult) {
    const config = {
      headers: {
        ...presignedResult.headers,
        ContentType: 'application/x-www-form-urlencoded',
        timeout: 30 * 60 * 1000,
      },
    };

    await baseRequestClient.put(presignedResult.url, file, config);
    return filePresignedRecordApi(presignedParam);
  } else {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        timeout: 30 * 60 * 1000,
      },
    };
    const formData = new FormData();
    formData.append('platform', platform);
    formData.append('path', path);
    formData.append('file', file);
    return requestClient.post<FileInfoModel>(
      '/storage/file/upload',
      formData,
      config,
    );
  }
}
/**
 *
 * @param formData 特殊情况上传表单
 * @returns
 */
export async function uploadFileFormApi(formData: FormData) {
  // 设置请求的 Content-Type 头为 multipart/form-data
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return requestClient.post<FileInfoModel>(
    '/storage/file/upload',
    formData,
    config,
  );
}

export async function uploadImageDataApi(file: FileUploadRequestModel) {
  return requestClient.post<FileInfoModel>(
    '/storage/file/upload-image-data',
    file,
  );
}

export async function downloadFilePresignedApi(param: FilePresignedParam) {
  const presignedParam = {
    id: param.id,
    url: param.url,
    contentDisposition: param.contentDisposition,
    method: 'GET',
  };
  return filePresignedApi(presignedParam);
}

export async function loadFileDetailByIdApi(id: string) {
  return requestClient.get(`file/detail/query-by-id/${id}`);
}

export async function deleteFileByIdApi(ids: Array<string>) {
  return requestClient.post('/storage/file/delete-by-ids', ids);
}
