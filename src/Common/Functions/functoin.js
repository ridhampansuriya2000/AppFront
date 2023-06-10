export function convertObjToArray(jsonObj) {
    let result = [];

    for (let key in jsonObj) {
        let item = {
            detailsTitle: key,
            fields: [],
            sections: []
        };

        let value = jsonObj[key];

        if (typeof value === 'object') {
            for (let subKey in value) {
                let subValue = value[subKey];

                if (typeof subValue === 'object') {
                    let section = {
                        title: subKey,
                        fields: []
                    };

                    for (let subSubKey in subValue) {
                        let subSubValue = subValue[subSubKey];

                        section.fields.push([subSubKey, subSubValue, typeof subSubValue]);
                    }

                    item.sections.push(section);
                } else {
                    item.fields.push([subKey, subValue, typeof subValue]);
                }
            }
        }
        result.push(item);
    }
    console.log("Converted array",result);
    return result;
}

export function createObj (arr){
    let obj = {};
    arr?.forEach(item => {
        obj[item.detailsTitle] = {};

        item.fields.forEach(field => {
            obj[item.detailsTitle][field[0]] = field[1];
        });

        item?.sections?.forEach(section => {
            obj[item.detailsTitle][section.title] = {};

            section.fields.forEach(field => {
                obj[item.detailsTitle][section.title][field[0]] = field[1];
            });
        });
    });
    console.log(obj);
    return obj;
}