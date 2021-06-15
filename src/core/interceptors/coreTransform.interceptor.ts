import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
import { CorePaginateResult } from '@core/interfaces/corePaginateResult.interface';
import { CoreResponse } from '@core/interfaces/coreResponse.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { isIn } from 'class-validator';
import { ExportService } from '@core/services/export.service';
import { MessageEnum } from '@core/constants/message.enum';
@Injectable()
export class CoreTransformInterceptor implements NestInterceptor<CorePaginateResult> {
    constructor(private readonly exportService: ExportService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<CorePaginateResult> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse<Response>();

        return next.handle().pipe(
            map((result: CoreResponse) => {
                let respStatus: boolean;

                if (isIn(result.status, [true, false])) {
                    respStatus = result.status;
                } else {
                    respStatus = result.status || response.statusCode == HttpStatus.OK || response.statusCode == HttpStatus.CREATED;
                }

                if (!respStatus) {
                    response.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                }

                // This line must below respStatus check
                const respMessage = result.message || (respStatus && MessageEnum[request.locale].SUCCESS) || MessageEnum[request.locale].FAILED;
                const respStatusCode = result.statusCode || response.statusCode;

                if (result.excel) {
                    /*
                    Export Excel
                    */
                    this.exportService.toExcel(response, result, respStatusCode);
                } else if (result.pdf) {
                    this.exportService.toPdf(response, result, respStatusCode);
                } else {
                    if (result.data) {
                        // Paging/Single documents
                        const pagination = result.data as Pagination<any>;
                        if (pagination.items) {
                            let { items, meta } = pagination;
                            // Paging documents
                            return {
                                status: respStatus,
                                statusCode: respStatusCode,
                                message: respMessage,
                                data: {
                                    list: items,
                                    paginator: {
                                        total: meta.totalItems,
                                        limit: meta.itemsPerPage,
                                        pageCount: meta.totalPages,
                                        currentPage: meta.currentPage,
                                        slNo: 1,
                                        hasPrevPage: meta.currentPage > 1 ? true : false,
                                        hasNextPage: meta.currentPage < meta.totalPages ? true : false,
                                        prev: meta.currentPage > 1 ? meta.currentPage - 1 : null,
                                        next: meta.currentPage < meta.totalPages ? meta.currentPage + 1 : null,
                                    },
                                },
                            };
                        } else {
                            // Single document
                            // console.log(result, respStatus);
                            return {
                                status: respStatus,
                                statusCode: respStatusCode,
                                message: respMessage,
                                data: result.data,
                            };
                        }
                    } else {
                        // No return data
                        return {
                            status: respStatus,
                            statusCode: respStatusCode,
                            message: respMessage,
                            data: null,
                        };
                    }
                }
            }),
        );
    }
}
