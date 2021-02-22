class DBConf {
    constructor(){
        this._URL = process.env.DATABASE_URL || process.env.DATABASE_LOCAL_URL
    }

    url(){
        return this._URL
    }
}

module.exports = {
    DBConf
}