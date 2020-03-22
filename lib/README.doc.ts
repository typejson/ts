;`
# typejson

    yarn add typejson
`

import { tjson , trule as _, iRule } from "../lib/index"

test("demo", function () {
    // expect(1).toBe(1)
    var data :any = {
        name: 'nimo',
        age: 1,
        children: [
            {
                name: "mumu",
                age: 1,
            }
        ],
    }
    var rules :iRule[] = [
        _.string("name").notEmpty().eg('nimo').name('你的姓名'),
        _.number('age').min(1).name('你的年龄'),
        _.array("children").minlen(1).name('你的子女'),
        _.object("children.*"),
        _.string("children.*.name").notEmpty().eg("nico").name('子女姓名'),
        _.number("children.*.age").minmax(1,10).name("子女年龄"),
    ]
    data = tjson.do(data, rules)
})
;`
## dev
     
    # watch **.doc.ts file compile **.md
    npm run dev
    # preview online doc
    # http://localhost:5000 
    yarn add global serve
    serve
   
    # create doc and typescript compile
    npm run release
   
    npm publish
`