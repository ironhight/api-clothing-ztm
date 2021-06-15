import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@src/core/constants/dateTime.enum';
const moment = require('moment');
@Injectable({ scope: Scope.REQUEST })
export class TransformerRoleService {
    private locale;

    constructor( @Inject(REQUEST) private request: any) {
        this.locale = this.request.locale;
    }

    // Role
    transformRoleList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}){
        var self = this;
        if(docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformRoleDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                ...appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformRoleDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformRoleDetail(doc, appendData = {}, isTranslate = false) {
        if(!doc || typeof doc == 'number') return doc;
        return {
            id: doc.id,
            isAdmin: doc.isAdmin,
            name: doc.name,
            permissions: doc.permissions,
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            ...appendData
        };
    }
}
