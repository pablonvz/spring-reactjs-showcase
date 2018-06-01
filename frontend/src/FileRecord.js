export default class FileRecord {
    constructor() {
        this.id = null;
        this.title = '';
        this.description = '';
        this.file = null;
    }

    static from(details) {
        const fileRecord = new FileRecord();

        Object.assign(fileRecord, details);

        return fileRecord;
    }

    asDataForm() {
        const data = new FormData();

        for (let k in this)
            data.set(k, this[k]);

        return data;
    }
}
