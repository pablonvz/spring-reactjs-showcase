import moment from 'moment';

export default class FileRecord {
    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this._createdAt = moment().format();
        this.file = null;
    }

    get createdAt() {
        return moment(this._createdAt);
    }

    set createdAt(createdAt) {
        this._createdAt = createdAt.format();
    }

    static from(details) {
        const fileRecord = new FileRecord();

        [
            'id',
            'title',
            'description',
            'createdAt',
            'file'
        ].forEach(propName =>  {
            fileRecord[propName] = details[propName];
        });

        return fileRecord;
    }

    asDataForm() {
        const data = new FormData();

        for (let k in this)
            data.set(k, this[k]);

        return data;
    }
}
