import { BeforeRemove, AfterRemove, PrimaryGeneratedColumn } from 'typeorm';
import * as fileHelper from '@core/helpers/file';
import {
    DefCreateDateColumn,
    DefUpdateDateColumn,
    DefDeleteDateColumn,
} from '@core/decorators/entity.decorator';
import { DefColumn } from '@core/decorators/entity.decorator';

export abstract class BaseEntity {
    public currentId?: number;

    @PrimaryGeneratedColumn()
    id?: number;

    @DefCreateDateColumn({ nullable: false, type: 'timestamp' })
    createdAt?: Date;

    @DefUpdateDateColumn({ nullable: false, type: 'timestamp' })
    updatedAt?: Date;

    @DefDeleteDateColumn({ nullable: true, type: 'timestamp' })
    deletedAt?: Date;

    @BeforeRemove()
    beforeRemove?(): void {
        this.currentId = this['id'];
    }

    @AfterRemove()
    afterRemove?(): void {
        if (typeof this['thumbnail'] != 'undefined') {
            const thumbnail = this['thumbnail'];
            if (thumbnail && thumbnail['fields'] && thumbnail['collection']) {
                fileHelper.deleteFolder(`${thumbnail['collection']}/${this.currentId}`);
            }
        }
    }

    thumb?(field: string, type?: string): string {
        if (typeof this['thumbnail'] != 'undefined') {
            const thumbnail = this['thumbnail'];
            if (!this[field]) {
                return null;
            } else {
                return fileHelper.thumb(
                    this,
                    field,
                    thumbnail['collection'],
                    thumbnail['fields'][field],
                    type,
                );
            }
        }
        return null;
    }

    thumbTrans?(field: string, type: string, locale?: string) {
        if (typeof this['thumbnail'] !== 'undefined') {
            const thumbnail = this['thumbnail'];
            if (!this[field]) {
                return null;
            } else {
                return fileHelper.thumbTrans(
                    this,
                    field,
                    thumbnail['collection'],
                    locale,
                    thumbnail['fieldTrans'][field],
                    type,
                );
            }
        }
    }
}
export abstract class BaseEntitySortOrder extends BaseEntity {
    @DefColumn({ default: 0 })
    sortOrder: number;
}
