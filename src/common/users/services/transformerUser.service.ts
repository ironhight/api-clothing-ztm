import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@src/core/constants/dateTime.enum';
import { TransformerRoleService } from '@common/roles/services/transformerRole.service';
const moment = require('moment');
@Injectable({ scope: Scope.REQUEST })
export class TransformerUserService {
    private locale;

    constructor( 
        @Inject(REQUEST) private request: any,
        private readonly transformerRole: TransformerRoleService
    ) {
        this.locale = this.request.locale;
    }

    // Role
    transformUserList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}){
        var self = this;
        if(docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformUserDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                ...appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformUserDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformUserDetail(doc, appendData = {}, isTranslate = false) {
        if(!doc || typeof doc == 'number') return doc;
        return {
            id: doc.id,
            profileImage: doc.thumb('profileImage'),
            name: doc.name,
            email: doc.email,
            active: doc.active,
            isAdmin: doc.role != null ? doc.role.isAdmin : null,
            role: this.transformerRole.transformRoleDetail(doc.role),
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            ...appendData
        };
    }
}
