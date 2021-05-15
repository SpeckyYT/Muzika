module.exports = (client, normal = false) => {
    client.getType = (object,type) => {
        if(typeof object != 'object' || !object) return normal;
        for(const value of Object.values(object))
            if(typeof value == type) return value;
        return normal;
    }
}
