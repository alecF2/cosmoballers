import path from 'node:path';
import { Elysia, t } from 'elysia';
import { type FileMetadata, type StandardResponse } from '@/types/rest';
import { getFileExtension } from '@/services/file-service';

const app = new Elysia()
  .post(
    '/upload',
    async ({ body: { id, file } }): Promise<StandardResponse<FileMetadata>> => {
      const { dir } = import.meta;
      const fileName = `${id}${getFileExtension(file.name)}`;

      await Bun.write(path.join(dir, 'assets', fileName), file);

      return {
        status: 'SUCCESS',
        data: {
          metadata: {
            size: file.size,
            type: file.type,
          },
        },
      };
    },
    {
      body: t.Object({
        id: t.Numeric(),
        file: t.File({
          type: ['image', 'video', 'application/pdf'],
        }),
      }),
    },
  )
  .listen(3000);

console.log(`server is running at ${app.server?.hostname}:${app.server?.port}`);
