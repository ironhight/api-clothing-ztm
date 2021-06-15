import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { deleteFileLocal } from '@core/helpers/file';
const fs = require('fs');
const moment = require('moment');


@Injectable()
export class TaskScheduleService {
    constructor() {

    }

    /**
     * Schedule: Every 5 minutes on first second, at the start of the first minute
     * Description: Delete temporary files in storage/tmp with expire time is 10 minutes
     */
    @Cron('1 */5 * * * *', {
        name: 'deleteTempFiles',
    })
    handleCron() {
        console.log('Task Schedule: Remove tmp files');
        var now = moment(new Date);
        fs.readdir(process.env.PREFIX_UPLOAD_TMP, function (err, files) {
            if(files) {
                files.forEach(function (file) {
                    fs.stat(`${process.env.PREFIX_UPLOAD_TMP}/${file}`, (err, stat) => {
                        if(stat) {
                            var birthtime = moment(stat.birthtime);
                            var diffInMinute = now.diff(birthtime, 'minutes');
                            if(diffInMinute > 5) {
                                deleteFileLocal(`${process.env.PREFIX_UPLOAD_TMP}/${file}`);
                            }
                        }
                    })
                });
            }
        });
    }
}
