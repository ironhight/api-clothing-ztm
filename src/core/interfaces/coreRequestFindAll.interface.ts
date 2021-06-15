export interface ICoreRequestFindAll {
    page: number;
    limit: number;
    select: Array<any>;
    where: Array<Record<string, any>>;
    order: Record<string, any>
}
