import { Map } from 'immutable';


class Typejson {
    do(source :any, rules: iRule[]) :[any, any] {
        rules.forEach(function (rule: iRule) {
            let path = rule.data.path
            let dataPath = path
            if (source[dataPath] === undefined && source[dataPath] === null) {
                throw new Error(`typejson: ${dataPath} is undefined` )
            }
            switch (rule.constructor) {
                case TString:
                    let stringRule : TString = (rule as TString)
                    let sValue :string = source[dataPath]
                    if (sValue === undefined) {
                        throw new Error("typejson: " + dataPath + " must be a string" )
                    }
                    if (stringRule.data.notEmtpy) {
                        if (sValue.length == 0) {
                            throw new Error(`typejson: ${dataPath} can not be empty string` )
                        }
                    }
                    break
                case TNumber:
                    let numberRule : TNumber = (rule as TNumber)
                    let nValue :number = source[dataPath]
                    if (nValue === undefined) {
                        throw new Error(`typejson: ${dataPath} can not be number` )
                    }
                    if (numberRule.data.min.enable) {
                        if (nValue < numberRule.data.min.min) {
                            throw new Error(`${dataPath} can not less than ${rule.data.min.min}` )
                        }
                    }
                    if (numberRule.data.max.enable) {
                        if (nValue > numberRule.data.max.max) {
                            throw new Error(`${dataPath} can not greater than ${rule.data.max.max}` )
                        }
                    }
                    break
                case TBoolean:
                    // let bRule : TArray = (rule as TBoolean)
                    let bValue :[] = source[dataPath]
                    if (bValue === undefined) {
                        throw new Error(`typejson: ${dataPath} can not be boolean` )
                    }
                    break
                case TArray:
                    let arrayRule : TArray = (rule as TArray)
                    let aValue :[] = source[dataPath]
                    if (aValue === undefined) {
                        throw new Error(`typejson: ${dataPath} can not be array` )
                    }
                    if (arrayRule.data.minlen.enable) {
                        if (aValue.length < arrayRule.data.minlen.minlen) {
                            throw new Error(`${dataPath}.length can not less than ${rule.data.minlen.minlen}` )
                        }
                    }
                    if (arrayRule.data.maxlen.enable) {
                        if (aValue.length < arrayRule.data.maxlen.maxlen) {
                            throw new Error(`${dataPath}.length can not greater than ${rule.data.maxlen.maxlen}` )
                        }
                    }
                    break
                case TObject:

                    break
                default:
                    throw new Error(`typejson: tjson.do(rule) ,rule["${path}"] is error type`)
            }
        })
        return [1,1]
    }
}
const tjson = new Typejson()

const typeDict :any = {
    string: "string",
    number: "number",
    array: "array",
    object: "object",
    boolean: "boolean",
}
interface Data {
    _type :string
    path :string
    notEmtpy: boolean
    min:  {
        enable: boolean
        min:number
    }
    max: {
        enable: boolean
        max:number
    }
    minlen: {
        enable: boolean
        minlen:number
    }
    maxlen: {
        enable: boolean
        maxlen:number
    }
    eg: string
    name: string
    note: string
}
function makeData(type: string) :Data {
    return {
        _type: type,
        path: "",
        notEmtpy: false,
        min: {
            enable: false,
            min: 0,
        },
        max: {
            enable: false,
            max: 0,
        },
        minlen: {
            enable: false,
            minlen: 0,
        },
        maxlen: {
            enable: false,
            maxlen: 0,
        },
        eg: "",
        note: "",
        name: "",
    }
}

class TType {
    data :Data
    constructor(data: Data) {
        this.data = data
    }
    note(s: string) :TType {
        this.data.note = s
        return this
    }
    eg(s: string) :TType {
        this.data.eg = s
        return this
    }
    name(s: string) :TType {
        this.data.name = s
        return this
    }
}
class TString extends TType{
    data: Data
    constructor(path :string) {
        let data :Data = makeData(typeDict.string)
        data.path = path
        super(data)
        this.data = data
    }
    notEmpty() :TString {
        this.data.notEmtpy = true
        return this
    }
}
class TNumber extends TType {
    data: Data
    constructor(path :string) {
        let data :Data = makeData(typeDict.number)
        data.path = path
        super(data)
        this.data = data
    }
    min(n:number) :TNumber {
        this.data.min = {
            enable: true,
            min: n
        }
        return this
    }
    max(n:number) :TNumber {
        this.data.max = {
            enable: true,
            max: n
        }
        return this
    }
    minmax(min:number, max:number) :TNumber {
        if (this.data.min.enable) throw  new Error(`typejson: rule.minmax() error, rule.min already set \r\n` + JSON.stringify(this.data))
        if (this.data.max.enable) throw  new Error("typejson: rule.minmax() error, rule.max already set \r\n" + JSON.stringify(this.data)) 
        this.data.min = { enable: true, min: min }
        this.data.max = { enable: true, max: max, }
        return this
    }
}

class TArray extends TType{
    data: Data
    constructor(path :string) {
        let data :Data = makeData(typeDict.array)
        data.path = path
        super(data)
        this.data = data
    }
    minlen(len:number) :TArray {
        this.data.minlen = {
            enable: true,
            minlen: len,
        }
        return this
    }
    maxlen(len:number) :TArray {
        this.data.maxlen = {
            enable: true,
            maxlen: len,
        }
        return this
    }
    minmaxlen(minlen:number, maxlen:number) :TArray {
        if (this.data.minlen.enable) throw  new Error("typejson: rule.minmaxlen() error, rule.min already set \r\n" + JSON.stringify(this.data))
        if (this.data.maxlen.enable) throw  new Error("typejson: rule.minmaxlen() error, rule.max already set \r\n" + JSON.stringify(this.data))
        this.data.minlen = { enable: true, minlen: minlen }
        this.data.maxlen = { enable: true, maxlen: maxlen, }
        return this
    }
    
}
class TObject extends TType {
    data: Data
    constructor(path :string) {
        let data: Data = makeData(typeDict.object)
        data.path = path
        super(data)
        this.data = data
    }
}
class TBoolean extends TType {
    data: Data
    constructor(path :string) {
        let data: Data = makeData(typeDict.object)
        data.path = path
        super(data)
        this.data = data
    }
}
interface Itrule {
    string: TString
    number: TNumber
    array: TArray
    object: TObject
    boolean: TBoolean
}
class TRule {
    string(path :string):TString {
        return new TString(path)
    }
    number(path :string):TNumber {
        return new TNumber(path)
    }
    boolean(path :string):TBoolean {
        return new TBoolean(path)
    }
    array(path :string):TArray {
        return new TArray(path)
    }
    object(path :string):TObject {
        return new TObject(path)
    }
}
type iRule = TString | TType | TNumber | TBoolean | TObject | TArray
const trule = new TRule()
export { tjson, trule, iRule }
