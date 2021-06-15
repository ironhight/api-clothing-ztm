import { SetMetadata } from '@nestjs/common';

export const ACL = (args: string): any => SetMetadata('acl', args);
