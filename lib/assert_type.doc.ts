
import * as at from "./assert_type";

test("Array", function () {
    at.assertType("typejson ", {
        v: 0,
        type: at.AssertTypeDataType.Array
    })
})