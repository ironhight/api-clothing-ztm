import { HttpException, HttpStatus } from '@nestjs/common';
import { isArray, isObject } from 'util';
import * as fileHelper from './file';

//-----------------Process Before save
export async function convertContent(field: string, dto: any, files: any, multiFileField?: Array<string>, validations?: Record<any, any>, messages?: Record<any, any>) {
    const { contentImgs, otherFiles } = await convertContentFileDto(dto, files, multiFileField, validations, messages);
    await trackingContent(dto[field], contentImgs);
    return {
        contentImgs,
        otherFiles,
    };
}

export async function convertContentFileDto(dto: any, files: any, multiFileField?: Array<string>, validations?: Record<any, any>, messages?: Record<any, any>) {
    const contentImgs = {};
    const otherFiles = {};
    let errors = [];
    await forEachAny(files, function(file, index) {
        const firstPosition = file.fieldname.indexOf('[');
        const name = file.fieldname.slice(0, firstPosition);
        // sigleFile for a field
        if (multiFileField.includes(file.fieldname)) {
            const newErrors = validationSingleFile(file, validations, messages);
            errors = errors.concat(newErrors);
            //
            dto[file.fieldname] = file.filename;
        } else if (multiFileField.includes(name)) {
            //multiFile for a field
            const firstPosition = file.fieldname.indexOf('[');
            const lastPosition = file.fieldname.indexOf(']');
            const position = file.fieldname.slice(firstPosition + 1, lastPosition);
            const newErrors = validationMultiFile(file, validations, messages, { name, position });
            errors = errors.concat(newErrors);
            // object
            if (isNaN(parseInt(position))) {
                dto[name] = dto[name] || {};
                dto[name][position] = file.filename;
            } else {
                // array
                dto[name] = dto[name] || [];
                dto[name].splice(position, 0, file.filename);
            }
        } else if (!file.fieldname.match(new RegExp('^(contentImgs)'))) {
            // otherFIles as annother collection
            otherFiles[name] = otherFiles[name] || [];
            otherFiles[name].push(file.filename);
        } else {
            // extra data
            const firstPosition = file.fieldname.indexOf('[');
            const lastPosition = file.fieldname.indexOf(']');
            const fieldname = file.fieldname.slice(firstPosition + 1, lastPosition);
            contentImgs[fieldname] = file.filename;
        }
    });

    if (errors.length) {
        throw new HttpException({
            status: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: errors,
        }, HttpStatus.BAD_REQUEST);
    }

    return {
        contentImgs,
        otherFiles,
    };
}

export async function trackingContent(content: any, contentImgs?: any) {
    await forEachAny(content, async function(ele, index) {
        if (isArray(ele) || isObject(ele)) {
            await trackingContent(ele, contentImgs);
        } else if (contentImgs && typeof contentImgs[ele] != 'undefined') {
            content[index] = contentImgs[ele];
        }
    });
}

//-----------------Process After save

export async function deleteSpecifyFile(fileNames: Array<string>, dirPath: string) {
    if (fileNames) {
        fileNames.forEach(function(fileName, index) {
            fileHelper.deleteFile(fileName, dirPath);
        });
    }
}

export async function saveFileContent(field: string, doc: any, collectionName: string, isSave = true) {
    await trackingFileContent(doc[field], doc, field, collectionName, isSave);
}

export async function deleteFileContent(field: string, doc: any, collectionName: string) {
    trackingFileContent(doc[field], doc, field, collectionName, false, true);
}

export async function trackingFileContent(content: any, doc: any, field: string, collectionName: string, isSave: boolean, isDelete = false) {
    await forEachAny(content, async function(ele, index) {
        if (isArray(ele) || isObject(ele)) {
            await trackingFileContent(ele, doc, field, collectionName, isSave, isDelete);
        } else if (ele && fileHelper.isFile(ele)) {
            if (isDelete) {
                deleteSpecifyFile([ele], `${collectionName}/${doc.id}/${field}`);
            } else if (isSave) {
                console.log(ele);
                await fileHelper.saveFile(ele, `${collectionName}/${doc.id}/${field}`);
            }
            content[index] = fileHelper.urlFile(ele, `${collectionName}/${doc.id}/${field}`);
        }
    });
}

export async function forEachAny(data: (Record<any, any> | Array<any>), cb: Function) {
    if (isArray(data) && data) {
        for (let index = 0; index < data.length; index++) {
            await cb(data[index], index);
        }
    } else if (isObject(data) && data) {
        const keys = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            await cb(data[keys[index]], keys[index]);
        }
    }
}

export async function saveThumbOrPhotos(doc: any) {
    if (typeof doc.thumbnail != 'undefined') {
        const thumbnail = doc['thumbnail'];
        if (thumbnail && thumbnail['fields'] && thumbnail['collection']) {
            await Promise.all(Object.keys(thumbnail['fields']).map(async function(field) {
                let compressOption = typeof thumbnail['compress'] != 'undefined' && typeof thumbnail['compress'][field] != 'undefined' ? thumbnail['compress'][field] : {};
                await fileHelper.saveThumb(doc, field, thumbnail['collection'], thumbnail['fields'][field], thumbnail['method'] || 'inside', compressOption);
            }));
        }

        if (thumbnail && thumbnail['fieldTrans'] && thumbnail['collection']) {
            await Promise.all(Object.keys(thumbnail['fieldTrans']).map(async function(field) {
                let compressOption = typeof thumbnail['compress'] != 'undefined' && typeof thumbnail['compress'][field] != 'undefined' ? thumbnail['compress'][field] : {};
                await fileHelper.saveThumbTrans(doc, field, thumbnail['collection'], thumbnail['fieldTrans'][field], thumbnail['method'] || 'inside', compressOption);
            }));
        }
    }
    if (typeof doc.thumbPhotos != 'undefined') {
        const thumbPhotos = doc['thumbPhotos'];
        if (thumbPhotos && thumbPhotos['fields'] && thumbPhotos['collection']) {
            await Promise.all(Object.keys(thumbPhotos['fields']).map(async function(field) {
                let compressOption = typeof thumbPhotos['compress'] != 'undefined' && typeof thumbPhotos['compress'][field] != 'undefined' ? thumbPhotos['compress'][field] : {};
                await fileHelper.savePhotos(doc, field, thumbPhotos['collection'], thumbPhotos['fields'][field], thumbPhotos['method'] || 'inside', compressOption);
            }));
        }
    }
}

export function validationSingleFile(file, validations: Record<any, any>, messages: Record<any, any>): Array<string> {
    const errors = [];
    const rules = {};
    const hasValidations = validations && typeof validations[file.fieldname] != 'undefined';
    if (!hasValidations) return errors;
    validations[file.fieldname].split(';').forEach(function(rule) {
        rule = rule.split(':');
        rules[rule[0]] = rule[1];
    });
    const extError = typeof rules['exts'] != 'undefined' && !file.mimetype.match(new RegExp('(' + rules['exts'] + ')$'));
    if (extError) {
        const defaultMsg = `${file.fieldname}: only image files!`;
        const hasCustomMsg = messages && typeof messages[`${file.fieldname}.exts`] != 'undefined';
        const msg = hasCustomMsg ? messages[`${file.fieldname}.exts`] : defaultMsg;
        errors.push(msg);
    }
    const sizeError = typeof rules['size'] != 'undefined' && (file.size / 1000000) > rules['size'];
    if (sizeError) {
        const defaultMsg = `${file.fieldname}: let's keep the image size to within ${rules['size']}MB!`;
        const hasCustomMsg = messages && typeof messages[`${file.fieldname}.size`] != 'undefined';
        const msg = hasCustomMsg ? messages[`${file.fieldname}.size`] : defaultMsg;
        errors.push(msg);
    }
    return errors;
}

export function validationMultiFile(file, validations: Record<any, any>, messages: Record<any, any>, others: { name, position }): Array<string> {
    const errors = [];
    const rules = {};
    const { name, position } = others;
    //
    const hasStandardValidation = validations && typeof validations[name] != 'undefined';
    const hasEveryValidation = validations && typeof validations[`${name}.*`] != 'undefined';
    const hasSpecialValidation = validations && typeof validations[`${name}.${position}`] != 'undefined';
    const hasValidations = hasStandardValidation || hasEveryValidation || hasSpecialValidation;
    const keyValidation = hasSpecialValidation ? `${name}.${position}` : (hasEveryValidation ? `${name}.*` : name);
    //
    if (hasValidations) {
        validations[keyValidation].split(';').forEach(function(rule) {
            rule = rule.split(':');
            rules[rule[0]] = rule[1];
        });
    }
    const extError = typeof rules['exts'] != 'undefined' && !file.mimetype.match(new RegExp('(' + rules['exts'] + ')$'));
    if (extError) {
        const hasEveryMessage = messages && typeof messages[`${name}.exts.*`] != 'undefined';
        const hasSpecialMessage = messages && typeof messages[`${name}.${position}.exts`] != 'undefined';
        const keyMessage = hasSpecialMessage ? `${name}.${position}.exts` : (hasEveryMessage ? `${name}.exts.*` : `${name}.exts`);
        const defaultMsg = `${name}(${position}): only image files!`;
        const hasCustomMsg = messages && typeof messages[keyMessage] != 'undefined';
        const msg = hasCustomMsg ? messages[keyMessage] : defaultMsg;
        errors.push(msg);
    }
    const sizeError = typeof rules['size'] != 'undefined' && (file.size / 1000000) > rules['size'];
    if (sizeError) {
        const hasEveryMessage = messages && typeof messages[`${name}.size.*`] != 'undefined';
        const hasSpecialMessage = messages && typeof messages[`${name}.${position}.size`] != 'undefined';
        const keyMessage = hasSpecialMessage ? `${name}.${position}.size` : (hasEveryMessage ? `${name}.size.*` : `${name}.size`);
        const defaultMsg = `${name}(${position}): let's keep the image size to within ${rules['size']}MB!`;
        const hasCustomMsg = messages && typeof messages[keyMessage] != 'undefined';
        const msg = hasCustomMsg ? messages[keyMessage] : defaultMsg;
        errors.push(msg);
    }
    return errors;
}