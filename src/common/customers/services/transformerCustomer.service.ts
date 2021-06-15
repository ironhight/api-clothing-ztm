import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@src/core/constants/dateTime.enum';
import { AuthTypeEnum } from '@core/constants/authType.enum';
import { Customer } from '@entities/customer.entity';

const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerCustomerService {
    private locale;

    constructor(@Inject(REQUEST) private request: any) {
        this.locale = this.request.locale;
    }

    // Role
    transformCustomerList(
        docs: Record<string, any>,
        appendDetailData = {},
        isTranslate = false,
        appendListData = {},
    ): Record<string, any> {
        const self = this;
        if (docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformCustomerDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                ...appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformCustomerDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformCustomerDetail(doc: Record<string, any>, appendData = {}, isTranslate = false) {
        if (!doc) return doc;
        return {
            id: doc.id,
            profileImage:
                doc.profileImage && doc.profileImage.includes('https://')
                    ? doc.profileImage
                    : doc.thumb('profileImage'),
            name: doc.name,
            email: doc.email,
            active: doc.active,
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            registerSource:
                doc.registerSource === AuthTypeEnum.APP
                    ? { value: doc.registerSource, en: 'Website', vi: 'Website' }
                    : doc.registerSource === AuthTypeEnum.FACEBOOK
                    ? { value: doc.registerSource, en: 'Facebook', vi: 'Facebook' }
                    : doc.registerSource === AuthTypeEnum.GOOGLE
                    ? { value: doc.registerSource, en: 'Google', vi: 'Google' }
                    : null,
            ...appendData,
        };
    }

    transformCustomerExport(docs, appendData = {}, fileName?: string, customHeaders?: string[]){
        return {
            excel: {
                name: fileName || `Customers-${moment().format('YYYY-MM-DD')}`,
                data: docs.length > 0 ? docs.map((doc: Customer) => {
                    return {
                        id: doc.id,
                        image: doc.thumb('profileImage', 'FB'),
                        name: doc.name,
                        active: doc.active,
                        email: doc.email,
                        phone: doc.phone,
                        profileId: doc.profileId,
                        registerSource: doc.registerSource,
                        createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
                        updatedAt: moment(doc.updatedAt).format(DateTime.CREATED_AT),
                    };
                }) : [{}],
                customHeaders: customHeaders || [
                    'ID',
                    'Profile Image',
                    'Name',
                    'Active',
                    'Email',
                    'Phone',
                    'ProfileId',
                    'Register Source',
                    'Create date',
                    'Update date',
                ],                
            }
        };
    }
}
