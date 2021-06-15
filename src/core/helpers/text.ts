export const removeAccents = (str: string): string => {
    const AccentsMap = [
        'aàảãáạăằẳẵắặâầẩẫấậ',
        'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
        'dđ',
        'DĐ',
        'eèẻẽéẹêềểễếệ',
        'EÈẺẼÉẸÊỀỂỄẾỆ',
        'iìỉĩíị',
        'IÌỈĨÍỊ',
        'oòỏõóọôồổỗốộơờởỡớợ',
        'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
        'uùủũúụưừửữứự',
        'UÙỦŨÚỤƯỪỬỮỨỰ',
        'yỳỷỹýỵ',
        'YỲỶỸÝỴ',
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
        const re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        const char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
};

export function camelCaseToSnakeCase(text: string): string {
    return removeAccents(text.trim())
        .split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
}
export function snakeCaseToCamelCase(text: string): string {
    return removeAccents(text.trim()).replace(/_([a-z])/g, ch => {
        return ch[1].toUpperCase();
    });
}

