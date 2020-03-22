interface iAssertTypeData {
    v :any
    type: AssertTypeDataType
}
enum AssertTypeDataType {
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Array = "Array",
    Object = "Object",
}
interface AssertTypeDataTypeSwitchHandle {
    String() :void
    Number() :void
    Boolean() :void
    Array() :void
    Object() :void
}
function AssertTypeDataTypeSwitch(type :AssertTypeDataType, handle: AssertTypeDataTypeSwitchHandle) {
    switch (type) {
        case AssertTypeDataType.Array:
            handle.Array()
            break
        case AssertTypeDataType.Boolean:
            handle.Boolean()
            break
        case AssertTypeDataType.Number:
            handle.Number()
            break
        case AssertTypeDataType.Object:
            handle.Object()
            break
        case AssertTypeDataType.String:
            handle.String()
            break
        default:
            throw new Error("typejson:assertType(data) AssertTypeDataTypeSwitch " + type +  " not find")
    }
}
function assertType(errorPrefix: string, data: iAssertTypeData) {
    AssertTypeDataTypeSwitch(data.type, {
        Array(): void {
            if (data.v.constructor !== Array) {
                throw  new Error(errorPrefix + "can not be " + data.v.constructor.name + ", must be Array")
            }
        },
        Boolean(): void {
            if (data.v.constructor !== Boolean) {
                throw  new Error(errorPrefix + "can not be " + data.v.constructor.name + ", must be Boolean")
            }
        },
        Number(): void {
            if (data.v.constructor !== Number) {
                throw  new Error(errorPrefix + "can not be " + data.v.constructor.name + ", must be Number")
            }
        },
        Object(): void {
            if (data.v.constructor !== Object) {
                throw  new Error(errorPrefix + "can not be " + data.v.constructor.name + ", must be Object")
            }
        },
        String(): void {
            if (data.v.constructor !== String) {
                throw  new Error(errorPrefix + "can not be " + data.v.constructor.name + ", must be String")
            }
        }
    })
}
export { assertType, iAssertTypeData, AssertTypeDataType }