<!-- !!!!!!!!!! 
This file is create by compile, do not edit this file 
!!! -->
# typejson

    yarn add typejson
```ts
import { tjson , trule as _ } from "../lib/index"

test("demo", function () {
    // expect(1).toBe(1)
    var data :any = {
        name: 'nimo',
        age: 1,
    }
    var rules :any = {
        'name': _.string().notEmpty().eg('nimo').name('你的姓名'),
        'age': _.number().min(1).name('你的年龄'),
        // "children": _.array().minlen(1).name('你的子女'),
        // "children.*": _.object(),
        // "children.*.name": _.string().notEmpty().eg("nico").name('子女姓名'),
        // "children.*.age": _.number().minmax(1,10).name("子女年龄"),
    }
    data = tjson.do(data, rules)
})
```

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
```ts
```