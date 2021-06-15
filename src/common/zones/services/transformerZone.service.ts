import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DateTime } from '@src/core/constants/dateTime.enum';
const moment = require('moment');

@Injectable({ scope: Scope.REQUEST })
export class TransformerZoneService {
    private locale;

    constructor( @Inject(REQUEST) private request: any) {
        this.locale = this.request.locale;
    }

    transformZoneProvinceList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}){
        var self = this;
        if(docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformZoneProvinceDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformZoneProvinceDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformZoneProvinceDetail(doc, appendData = {}, isTranslate = false) {
        let locale = this.locale;
        let mustTranslate = locale && isTranslate;
        if(!doc) return doc;
        return {
            id: doc.id,
            translations: doc.translations ? doc.translations.map(tran => {
                return {
                    locale: tran.locale,
                    name: tran.name,
                }
            }) : [],
            code: doc.code,
            active: doc.active,
            lat: doc.lat,
            lng: doc.lng,
            sortOrder: doc.sortOrder,
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            ...appendData
        };
    }

    transformZoneDistrictList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}){
        var self = this;
        if(docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformZoneDistrictDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformZoneDistrictDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformZoneDistrictDetail(doc, appendData = {}, isTranslate = false) {
        let locale = this.locale;
        let mustTranslate = locale && isTranslate;
        if(!doc) return doc;
        return {
            id: doc.id,
            zoneProvince: doc.zoneProvince,
            translations: doc.translations ? doc.translations.map(tran => {
                return {
                    locale: tran.locale,
                    name: tran.name,
                }
            }) : [],
            code: doc.code,
            active: doc.active,
            name: mustTranslate && doc.name ? doc.name[locale] : doc.name,
            lat: doc.lat,
            lng: doc.lng,
            sortOrder: doc.sortOrder,
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            ...appendData
        };
    }

    transformZoneWardList(docs, appendDetailData = {}, isTranslate = false, appendListData = {}){
        var self = this;
        if(docs.items) {
            docs.items = docs.items.map(function(doc) {
                return self.transformZoneWardDetail(doc, appendDetailData, isTranslate);
            });
            return {
                ...docs,
                appendListData,
            };
        } else {
            docs = docs.map(function(doc) {
                return self.transformZoneWardDetail(doc, appendDetailData, isTranslate);
            });
            return docs;
        }
    }

    transformZoneWardDetail(doc, appendData = {}, isTranslate = false) {
        let locale = this.locale;
        let mustTranslate = locale && isTranslate;
        if(!doc) return doc;
        return {
            id: doc.id,
            zoneDistrict: doc.zoneDistrict,
            translations: doc.translations ? doc.translations.map(tran => {
                return {
                    locale: tran.locale,
                    name: tran.name,
                }
            }) : [],
            code: doc.code,
            active: doc.active,
            name: mustTranslate && doc.name ? doc.name[locale] : doc.name,
            lat: doc.lat,
            lng: doc.lng,
            sortOrder: doc.sortOrder,
            createdAt: moment(doc.createdAt).format(DateTime.CREATED_AT),
            ...appendData
        };
    }
}
