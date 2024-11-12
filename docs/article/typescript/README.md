---
star: false
category:
  - TypeScript
tag:
  - TypeScript
---
# TypeScript

![TypeScript](../images/TypeScript.png)



## TypeScript 是什么

`TypeScript` 是 `JavaScript` 的类型的超集，支持`ES6`语法，支持面向对象编程的概念，如类、接口、继承、泛型等；

其是一种静态类型检查的语言，提供了类型注解，在代码编译阶段就可以检查出数据类型的错误；

同时扩展了`JavaScript` 的语法，所以任何现有的`JavaScript` 程序可以不加改变的在 `TypeScript` 下工作；

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 [ECMAScript](https://so.csdn.net/so/search?q=ECMAScript&spm=1001.2101.3001.7020) 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。下图显示了 TypeScript 与 ES5、ES2015 和 ES2016 之间的关系：

![图片](../images/typescript集合.png)

###  TypeScript 与 JavaScript 的区别

|                            |                      TypeScript                      |                     JavaScript                     |
| :------------------------: | :--------------------------------------------------: | :------------------------------------------------: |
|        **类型系统**        |             静态类型系统，编译时检查类型             |            动态类型系统，运行时检查类型            |
|        **类型推断**        |      支持类型推断，可以根据变量赋值自动推断类型      |         支持类型推断，但不如TypeScript强大         |
|        **类型注解**        |      支持类型注解，可以显式声明变量或函数的类型      |                   不支持类型注解                   |
|   **接口（Interfaces）**   |             支持接口，用于定义对象的结构             |                     不支持接口                     |
|    **泛型（Generics）**    |          支持泛型，可以用于创建可重用的组件          |                     不支持泛型                     |
|     **枚举（Enums）**      |           支持枚举，用于定义一组命名的常量           |        不支持枚举，但可以通过对象或数组模拟        |
|     **元组（Tuples）**     |         支持元组，允许表示具有不同类型的数组         |           不支持元组，但可以通过数组模拟           |
| **命名空间（Namespaces）** |            支持命名空间，可以避免命名冲突            |    不支持命名空间，但可以通过对象或模块模式模拟    |
|    **可选参数和默认值**    |                 支持可选参数和默认值                 |                支持可选参数和默认值                |
|        **函数重载**        |          支持函数重载，允许函数具有多个签名          |                   不支持函数重载                   |
|  **装饰器（Decorators）**  | 支持装饰器，用于添加或修改类、方法、属性或参数的行为 |        不支持装饰器，但可以通过其他方式模拟        |
|        **工具支持**        | 强大的开发工具支持，如Visual Studio Code、WebStorm等 |  良好的开发工具支持，但可能没有TypeScript那么丰富  |
|         **兼容性**         |     是JavaScript的超集，可以直接转换为JavaScript     |              原生JavaScript，无需转换              |
|        **学习曲线**        |   对于已熟悉JavaScript的开发者来说，学习曲线较平缓   |           原生JavaScript，学习曲线较简单           |
|     **社区和生态系统**     | 庞大的社区和生态系统，有大量的库和框架支持TypeScript | 庞大的社区和生态系统，但可能没有TypeScript那么广泛 |
|        **大型项目**        |   更适合大型项目，有助于提高代码的可维护性和可读性   | 适合小型到中型项目，但对于大型项目可能显得不够强大 |
|       **浏览器支持**       |    最终被编译成 JavaScript 代码，使浏览器可以理解    |               可以直接在浏览器中使用               |
|         **ES支持**         |             支持 ES3，ES4，ES5 和 ES6 等             |      不支持编译其他 ES3，ES4，ES5 或 ES6 功能      |

### 获取 TypeScript

命令行的 TypeScript 编译器可以使用 Node.js 包来安装。

**1.安装 TypeScript**

```js
$ npm install -g typescript
```

**2.编译 TypeScript 文件**

```js
$ tsc helloworld.ts
# helloworld.ts => helloworld.js
```

当然，对于刚入门 TypeScript 的小伙伴，也可以不用安装 `typescript`，而是直接使用线上的 TypeScript Playground 来学习新的语法或新特性。

> TypeScript Playground：https://www.typescriptlang.org/play/

### **特性**

**类型批注和编译时类型检查** ：在编译时批注变量类型

**类型推断**：ts 中没有批注变量类型会自动推断变量的类型

**类型擦除**：在编译过程中批注的内容和接口会在运行时利用工具擦除

**接口**：ts 中用接口来定义对象类型

**枚举**：用于取值被限定在一定范围内的场景

**Mixin**：可以接受任意类型的值

**泛型编程**：写代码时使用一些以后才指定的类型

**名字空间**：名字只在该区域内有效，其他区域可重复使用该名字而不冲突

**元组**：元组合并了不同类型的对象，相当于一个可以装不同类型数据的数组

## **核心概念**

|        核心概念        |                           描述说明                           |
| :--------------------: | :----------------------------------------------------------: |
|      **类型系统**      | TypeScript扩展了JavaScript的动态类型系统，引入了静态类型。这允许开发者在编写代码时明确变量的类型，从而增强代码的可读性和可维护性。 |
|      **类型注解**      | 类型注解是一种显式指定变量、函数参数或函数返回值类型的方式。例如：`let name: string = "Alice";` |
|        **接口**        | 接口定义了一个对象的结构，包括它应该具有的属性和方法。接口在TypeScript中广泛用于定义对象的形状，以及确保对象满足某种预期的结构。 |
|         **类**         | 类是面向对象编程的一个核心概念，用于定义对象的结构。TypeScript中的类可以包含属性、方法和构造函数。 |
|        **泛型**        | 泛型允许在定义函数、接口或类时，不预先指定具体的类型，而在使用的时候再为其指定类型。这增加了代码的重用性和灵活性。 |
|        **模块**        | 模块是封装代码的一种方式，它可以包含变量、函数、类、接口等。模块允许将代码分割成独立的部分，并在需要时导入和使用。 |
|      **命名空间**      | 命名空间提供了一种避免命名冲突的方式。它允许开发者将相关的代码组织在一起，并为其指定一个唯一的名称。 |
|     **访问修饰符**     | 访问修饰符（如`public`、`private`和`protected`）用于控制类成员的可见性和可访问性。这有助于封装数据和控制对数据的访问。 |
|       **装饰器**       | 装饰器是一种特殊类型的声明，它可以被附加到类声明、方法、属性或参数上。装饰器使用`@expression`这样的形式，其中`expression`必须计算为一个函数，该函数将在运行时被调用。 |
| **联合类型与交叉类型** |             联合类型表示一个值可以是几种类型之一             |
|      **类型推断**      | TypeScript编译器会根据赋值的值或其他上下文信息自动推断变量的类型。这减少了显式类型注解的需要，使代码更加简洁。 |
|        **枚举**        | 枚举是一种定义命名常量的方式。它允许开发者为一组相关的值（如状态码、颜色等）创建有意义的名称。 |
|        **元组**        | 元组是一种可以包含不同类型元素的数组。这允许开发者在一个数组中存储不同类型的值。 |
|   **可选属性与参数**   | 可选属性或参数表示在对象或函数调用中，该属性或参数是可选的，不需要总是提供。这增加了代码的灵活性。 |
|      **默认参数**      | 默认参数允许在函数定义时为参数指定默认值。如果在调用函数时没有提供该参数的值，将使用默认值。 |
|      **剩余参数**      | 剩余参数允许函数接受任意数量的参数，并将它们收集到一个数组中。这有助于处理可变数量的参数。 |
|      **类型别名**      | 类型别名是为现有类型创建新名称的一种方式。这有助于简化复杂的类型声明，提高代码的可读性。 |
|      **映射类型**      | 映射类型允许开发者基于一个已存在的类型创建新的类型，并对其进行修改或扩展。 |
|      **条件类型**      | 条件类型是一种基于条件表达式的结果来选择类型的方式。它允许开发者在类型级别进行条件逻辑。 |
|      **索引类型**      | 索引类型允许开发者通过字符串或数字索引来访问对象的属性。这有助于处理具有动态属性名的对象。 |
|     **关键字类型**     | TypeScript提供了一些内置的关键字类型，如`any`、`void`、`null`、`undefined`等，用于处理特殊的类型情况。 |

## 基础类型

和`javascript`基本一致，也分成：

- 基本类型
- 引用类型

在基础类型上，`typescript`增添了`void`、`any`、`emum`等原始类型

`typescript` 的数据类型主要有如下：

| 分类         |       类型        | 名称       |                             描述                             |
| ------------ | :---------------: | ---------- | :----------------------------------------------------------: |
| **基本类型** |                   |            |                                                              |
|              |    **Number**     | 数字类型   |                  用于表示双精度64位浮点数。                  |
|              |    **String**     | 字符串类型 |                    用于表示文本数据类型。                    |
|              |    **Boolean**    | 布尔类型   |                  逻辑数据类型，表示真或假。                  |
|              |    **Symbol**     |            |       表示唯一的、不可变的原始值，常用于对象的属性键。       |
|              |     **Null**      |            |                  表示一个只有null值的类型。                  |
|              |   **Undefined**   |            |               表示一个只有undefined值的类型。                |
|              | **Literal Types** |            | 表示具体的值，如字符串字面量类型 `type EventNames = 'click'  |
| **引用类型** |                   |            |                                                              |
|              |     **Array**     | 数组类型   | 表示对象的集合，使用类型后面接方括号 `[]` 来定义数组。<br />例如：`let arr: number[] = [1, 2, 3];` |
|              |     **Tuple**     | 元组类型   | 表示一个已知元素数量和类型的数组。<br />例如：`let x: [string, number] = ['hello', 10];` |
|              |     **Enum**      | 枚举类型   | 枚举类型，用于定义数值集合。<br />例如：`enum Color {Red, Green, Blue}` |
|              |     **Void**      |            |        表示没有任何类型。通常用于表示函数没有返回值。        |
|              |     **Never**     |            | 表示的是那些永不存在的值的类型。<br />例如：函数总是抛出异常或根本不会有返回值。 |
|              |    **Object**     |            |        用于非原始类型，比如数组、null以外的对象类型。        |
|              |      **Any**      | 任意类型   |            表示任意类型，可以是任何JavaScript值。            |

`Any` 类型在TypeScript中是一个特殊的类型，它可以被赋予任何值，因此它**不属于基本类型或引用类型的严格分类**。

### Boolean 类型

```js
let isDone: boolean = false;
// ES5：var isDone = false;
```

### Number 类型

```js
let count: number = 10;
// ES5：var count = 10;
```

### String 类型

```js
let name: string = "Semliker";
// ES5：var name = 'Semlinker';
```

### Array 类型

```js
解释let list: number[] = [1, 2, 3];
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3]; // Array<number>泛型语法
// ES5：var list = [1,2,3];
```

### Enum 类型

枚举是一个被命名的整型常数的集合，用于声明一组命名的常数,当一个变量有几种可能的取值时,可以将它定义为枚举类型

通俗来说，枚举就是一个对象的所有可能取值的集合。

枚举的使用是通过`enum`关键字进行定义，形式如下：

```ts
enum xxx { ... }
```

声明关键字为枚举类型的方式如下：

```ts
// 声明d为枚举类型Direction
let d: Direction;
```

类型可以分成：

- 数字枚举
- 字符串枚举
- 异构枚举



#### **数字枚举**

```js
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST,
}

let dir: Direction = Direction.NORTH;
```

默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3。上面的枚举示例代码经过编译后会生成以下代码：

```js
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["NORTH"] = 0)] = "NORTH";
  Direction[(Direction["SOUTH"] = 1)] = "SOUTH";
  Direction[(Direction["EAST"] = 2)] = "EAST";
  Direction[(Direction["WEST"] = 3)] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
```

当然我们也可以设置 NORTH 的初始值，比如：

```js
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
```

#### **字符串枚举**

在 TypeScript 2.4 版本，允许我们使用字符串枚举。在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```js
enum Direction {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
```

以上代码对于的 ES5 代码如下：

```js
"use strict";
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```

#### **异构枚举**

异构枚举的成员值是数字和字符串的混合：

```js
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

以上代码对于的 ES5 代码如下：

```js
"use strict";
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

通过观察上述生成的 ES5 代码，我们可以发现数字枚举相对字符串枚举多了 “反向映射”：

```js
console.log(Enum.A) //输出：0
console.log(Enum[0]) // 输出：A
```

### Any 类型

在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。

```js
let notSure: any = 666;
notSure = "Semlinker";
notSure = false;
```

`any` 类型本质上是类型系统的一个逃逸舱。作为开发者，这给了我们很大的自由：TypeScript 允许我们对 `any` 类型的值执行任何操作，而无需事先执行任何形式的检查。比如：

```js
解释let value: any;

value.foo.bar; // OK
value.trim(); // OK
value(); // OK
new value(); // OK
value[0][1]; // OK
```

在许多场景下，这太宽松了。使用 `any` 类型，可以很容易地编写类型正确但在运行时有问题的代码。如果我们使用 `any` 类型，就无法使用 TypeScript 提供的大量的保护机制。为了解决 `any` 带来的问题，TypeScript 3.0 引入了 `unknown` 类型。

### Unknown 类型

就像所有类型都可以赋值给 `any`，所有类型也都可以赋值给 `unknown`。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型（另一种是 `any`）。下面我们来看一下 `unknown` 类型的使用示例：

```js
let value: unknown;

value = true; // OK
value = 42; // OK
value = "Hello World"; // OK
value = []; // OK
value = {}; // OK
value = Math.random; // OK
value = null; // OK
value = undefined; // OK
value = new TypeError(); // OK
value = Symbol("type"); // OK
```

对 `value` 变量的所有赋值都被认为是类型正确的。但是，当我们尝试将类型为 `unknown` 的值赋值给其他类型的变量时会发生什么？

```js
let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

`unknown` 类型只能被赋值给 `any` 类型和 `unknown` 类型本身。直观地说，这是有道理的：只有能够保存任意类型值的容器才能保存 `unknown` 类型的值。毕竟我们不知道变量 `value` 中存储了什么类型的值。

现在让我们看看当我们尝试对类型为 `unknown` 的值执行操作时会发生什么。以下是我们在之前 `any` 章节看过的相同操作：

```js
let value: unknown;

value.foo.bar; // Error
value.trim(); // Error
value(); // Error
new value(); // Error
value[0][1]; // Error
```

将 `value` 变量类型设置为 `unknown` 后，这些操作都不再被认为是类型正确的。通过将 `any` 类型改变为 `unknown` 类型，我们已将允许所有更改的默认设置，更改为禁止任何更改。

### Tuple 类型

众所周知，数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型，其工作方式类似于数组。

元组可用于定义具有有限数量的未命名属性的类型。每个属性都有一个关联的类型。使用元组时，必须提供每个属性的值。为了更直观地理解元组的概念，我们来看一个具体的例子：

```js
let tupleType: [string, boolean];
tupleType = ["Semlinker", true];
```

在上面代码中，我们定义了一个名为 `tupleType` 的变量，它的类型是一个类型数组 `[string, boolean]`，然后我们按照正确的类型依次初始化 tupleType 变量。与数组一样，我们可以通过下标来访问元组中的元素：

```js
console.log(tupleType[0]); // Semlinker
console.log(tupleType[1]); // true
```

在元组初始化的时候，如果出现类型不匹配的话，比如：

```js
tupleType = [true, "Semlinker"];
```

此时，TypeScript 编译器会提示以下错误信息：

```js
[0]: Type 'true' is not assignable to type 'string'.
[1]: Type 'string' is not assignable to type 'boolean'.
```

很明显是因为类型不匹配导致的。在元组初始化的时候，我们还必须提供每个属性的值，不然也会出现错误，比如：

```js
tupleType = ["Semlinker"];
```

此时，TypeScript 编译器会提示以下错误信息：

```js
Property '1' is missing in type '[string]' but required in type '[string, boolean]'.
```

### Void 类型

某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有返回值时，你通常会见到其返回值类型是 void：

```js
// 声明函数返回值为void
function warnUser(): void {
  console.log("This is my warning message");
}
```

以上代码编译生成的 ES5 代码如下：

```js
"use strict";
function warnUser() {
  console.log("This is my warning message");
}
```

需要注意的是，声明一个 void 类型的变量没有什么作用，因为它的值只能为 `undefined` 或 `null`：

```js
let unusable: void = undefined;
```

### Null 和 Undefined 类型

TypeScript 里，`undefined` 和 `null` 两者有各自的类型分别为 `undefined` 和 `null`。

```js
let u: undefined = undefined;
let n: null = null;
```

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。**然而，如果你指定了`--strictNullChecks` 标记，`null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。**

### Never 类型

`never` 类型表示的是那些永不存在的值的类型。 例如，`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```js
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

```js
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```

注意在 else 分支里面，我们把收窄为 never 的 foo 赋值给一个显示声明的 never 变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事修改了 Foo 的类型：

```js
type Foo = string | number | boolean;
```

然而他忘记同时修改 `controlFlowAnalysisWithNever` 方法中的控制流程，这时候 else 分支的 foo 类型会被收窄为 `boolean` 类型，导致无法赋值给 never 类型，这时就会产生一个编译错误。通过这个方式，我们可以确保

`controlFlowAnalysisWithNever` 方法总是穷尽了 Foo 的所有可能类型。 通过这个示例，我们可以得出一个结论：**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**

## **类型推断**

TypeScript 的类型推断是一种编译器功能，它允许编译器根据代码的上下文自动推断变量、函数参数和函数返回值的类型，而无需显式地指定这些类型。这种自动类型推断功能可以大大提高代码的可读性和可维护性，同时减少编写冗余的类型注解。

下面是一些 TypeScript 类型推断的例子：

### **变量类型推断**

当声明一个变量并初始化它时，TypeScript 编译器可以根据初始值的类型推断出变量的类型。

```typescript
let isDone = false; // 推断出 isDone 是 boolean 类型  
  
let age = 25; // 推断出 age 是 number 类型  
  
let name = "Alice"; // 推断出 name 是 string 类型  
  
let list = [1, 2, 3]; // 推断出 list 是 number[] 类型
```

### **函数返回类型推断**

如果函数的返回值可以通过函数的实现逻辑推断出来，那么你可以省略返回类型注解。

```typescript
function add(a: number, b: number): number {  
    return a + b; // 返回类型被推断为 number  
}
```

### **函数参数类型推断**

同样，如果函数参数的类型可以通过参数的使用情况推断出来，那么也可以省略参数的类型注解。

```typescript
function greet(name: string) {  
    console.log("Hello, " + name); // 参数 name 的类型被推断为 string  
}  
  
greet("Alice"); // 调用函数时不需要显式指定类型
```

### **类型推断与类型兼容性**

类型推断不仅限于基础类型，还包括对象、数组和函数类型。TypeScript 会检查类型兼容性，确保推断的类型与预期的类型相匹配。

```typescript
let person: { name: string, age: number };  
  
person = { name: "Alice", age: 25 }; // 类型被推断为 { name: string, age: number }  
  
function printPersonInfo(p: { name: string, age?: number }) {  
    console.log("Name: " + p.name);  
    if (p.age) {  
        console.log("Age: " + p.age);  
    }  
}  
  
printPersonInfo(person); // 调用函数时，age 是可选的，因此不会报错
```

类型推断并不总是完全准确的，特别是当涉及到复杂的类型逻辑或条件语句时。在这些情况下，你可能需要显式地指定类型，以确保代码的正确性和类型安全。

## 断言

有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起作用。

类型断言的语法使用尖括号 `<Type>` 或者 `as Type` 来实现。这是两种等效的语法，你可以选择使用其中的一种。

### **尖括号 `<Type>` 的语法**

```typescript
let someValue: any = "this is a string";  
let strLength: number = (<string>someValue).length;
```

###  **`as Type` 的语法**

```typescript
let someValue: any = "this is a string";  
let strLength: number = (someValue as string).length;
```

在这两个例子中，我们都将一个 `any` 类型的变量 `someValue` 断言为 `string` 类型，以便可以安全地访问其 `length` 属性。

类型断言在以下情况中非常有用：

- 当 TypeScript 编译器无法推断出变量的确切类型时。
- 当变量可能是多种类型之一，但你确信在特定情况下它会是某个特定的类型。
- 当从第三方库或 API 获取数据时，该库或 API 可能使用 `any` 类型，但你希望使用更具体的类型。



## **类型守卫**

**概念**

TypeScript 中的类型守卫（Type Guards）是一种在运行时用于检查和过滤变量类型的技术。它定义了在语句的块级作用域（如 if 语句内或条目运算符表达式内）缩小变量类型的一种行为。

**作用**

帮助 TypeScript 编译器在特定的代码块中更明确地指定变量的类型。当 TypeScript 编译器遇到类型守卫时，它会在语句的块级作用域内缩小变量的类型。这种类型推断的行为被称为类型守卫。

类型守卫是一种强大的功能，因为它可以帮助开发者避免类型错误，同时还能利用 TypeScript 的类型系统来提供更好的代码智能提示和自动补全。这对于提高代码的可读性、可维护性和安全性非常有帮助。

**注意**

类型守卫是在运行时执行的，而不是在编译时。这意味着在编译 TypeScript 代码时，编译器不会执行类型守卫的逻辑。而是在代码运行时，根据条件表达式的结果来动态地确定变量的类型。

**思想**

类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。

**实现**

目前主要有四种的方式来实现类型保护：

###  in 关键字

> 在 JavaScript 中，`in` 是一个操作符，用于**检查一个对象是否包含特定的属性**。换句话说，它用于检查对象是否有某个属性作为其直接属性或继承自其原型链的属性。

```js
interface Admin { // 定义Admin类
  name: string;
  privileges: string[];
}

interface Employee {// 定义Employee类
  name: string;
  startDate: Date;
}
 
type UnknownEmployee = Employee | Admin; // UnknownEmployee 类型为 Admin类或Employee类

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("Name: " + emp.name); // 输出 Admin类或Employee类 的相同的属性
  if ("privileges" in emp) { //检查 privileges 属性是否存在emp，如果是，则emp是Admin类
    console.log("Privileges: " + emp.privileges);
  }
  if ("startDate" in emp) {//检查 startDate 属性是否存在emp，如果是，则emp是Employee类
    console.log("Start Date: " + emp.startDate);
  }
}
```



### typeof 关键字

> 在JavaScript中，`typeof` 是一个一元操作符，用于获取一个变量或表达式的类型，并返回一个字符串来表示该类型。
>
> `typeof` 返回的类型是以下这些字符串之一：
>
> - `"undefined"`：如果变量未定义。
> - `"boolean"`：如果变量是布尔值。
> - `"string"`：如果变量是字符串。
> - `"number"`：如果变量是数值。
> - `"object"`：如果变量是对象或null。
> - `"function"`：如果变量是函数。
> - `"symbol"`：如果变量是Symbol（ECMAScript 2015 新增）。
>
> `typeof` 的一个常见用途是在编程中检查变量的类型，以便进行条件判断或执行特定的操作。

```js
function padLeft(value: string, padding: string | number) { // 使用 typeof 明确参数类型
  if (typeof padding === "number") { 
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

### instanceof 关键字

> 在JavaScript中，`instanceof` 是一个操作符，用于**测试构造函数的 `prototype` 属性是否出现在对象的原型链中的任何位置**。换句话说，它用于**确定一个对象是否是一个特定类型的实例**。
>
> `instanceof` 的基本语法是：
>
> ```javascript
> object instanceof constructor
> ```

```js
interface Padder { // 定义边距类
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder { // 定义数字类型的边距类
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder { // 定义字符串类型的边距类
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);

if (padder instanceof SpaceRepeatingPadder) { // 使用 instanceof 判断实例的具体类型
  // padder的类型收窄为 'SpaceRepeatingPadder'
}
```

### 自定义类型保护的类型谓词

```js
/**
*
这个函数接受一个参数 x，其类型为 any，意味着它可以接受任何类型的值。
函数返回一个布尔值，表明 x 是否是 number 类型。这是通过检查 x 的类型是否为 "number" 来实现的。
返回类型 x is number 是一个类型守卫的返回类型。它告诉 TypeScript，如果这个函数返回 true，那么在后续的代码中，x 可以被当作 number 类型来安全地使用。
**/
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

//使用示例：
const value: any = /* some value */;  

if (isNumber(value)) {  
  console.log(value.toFixed(2)); // TypeScript 知道 value 是 number 类型  
} else if (isString(value)) {  
  console.log(value.length); // TypeScript 知道 value 是 string 类型  
}
```

> 这段代码定义了两个 TypeScript 的用户定义类型守卫（User-Defined Type Guards）。这些类型守卫用于在运行时检查某个值是否属于特定的类型，并返回一个布尔值来表明这个检查结果。如果返回 `true`，则 TypeScript 会认为在后续的代码块中，该变量是所检查的类型。



## **类型约束**

在 TypeScript 中，类型约束（Type Constraints）通常指的是对泛型参数或类型变量的限制，以确保它们满足特定的条件或具有特定的属性。这有助于增强代码的类型安全性，并允许开发者在编译时捕获可能的错误。

实现方式

类型约束可以通过以下几种方式实现：

### **接口约束**

你可以使用接口来定义泛型参数必须满足的形状。

```typescript
interface Lengthwise {  
  length: number;  
}  
  
function loggingIdentity<T extends Lengthwise>(arg: T): T {  
  console.log(arg.length); // 这里我们知道 arg.length 总是存在的  
  return arg;  
}
```

在这个例子中，泛型 `T` 被约束为必须实现 `Lengthwise` 接口，这意味着任何传递给 `loggingIdentity` 的类型都必须有一个 `length` 属性。

### **类型参数约束**

在定义泛型函数或类时，你可以直接在类型参数后面加上 `extends` 关键字和约束类型。

```typescript
function createArray<T extends number | string>(length: number, value: T): Array<T> {  
  return new Array(length).fill(value);  
}  
  
const numberArray = createArray<number>(5, 0); // [0, 0, 0, 0, 0]  
const stringArray = createArray<string>(3, "hello"); // ["hello", "hello", "hello"]
```

在这个例子中，泛型 `T` 被约束为必须是 `number` 或 `string` 类型。

### **类类型约束**

你也可以约束泛型参数必须是某个类的实例。

```typescript
class Animal {  
  name: string;  
}  
  
class Dog extends Animal {  
  breed: string;  
}  
  
function greetAnimal<T extends Animal>(animal: T): void {  
  console.log(`Hello, ${animal.name}`);  
}  
  
const myDog = new Dog();  
myDog.name = "Buddy";  
myDog.breed = "Labrador";  
  
greetAnimal(myDog); // 输出 "Hello, Buddy"
```

在这个例子中，泛型 `T` 被约束为必须是 `Animal` 类或其子类的实例。

### **联合类型约束**

你可以使用联合类型来定义泛型参数可以是多种类型中的一种。

```typescript
function padLeft<T extends string | number>(value: T, padding: string | number): T {  
  if (typeof value === "string") {  
    return (value + padding.toString()).padStart(value.length + padding.toString().length, padding.toString());  
  } else {  
    return value + padding;  
  }  
}  
  
const paddedString = padLeft("42", 5); // "4242424242"  
const paddedNumber = padLeft(42, 3); // 45
```

在这个例子中，泛型 `T` 可以是 `string` 或 `number` 类型，函数根据 `T` 的实际类型执行不同的逻辑。

类型约束增强了 TypeScript 的类型系统，允许开发者编写更加健壮和可维护的代码。通过限制泛型参数的可能类型，你可以减少运行时错误，并更好地利用 TypeScript 的类型推断和自动补全功能。



## **高级类型**

高级类型，是`typescript`为了保证语言的灵活性，所使用的一些语言特性。这些特性有助于我们应对复杂多变的开发场景

TypeScript 的高级类型提供了一种灵活且强大的方式来描述数据的形状和约束。以下是 TypeScript 的一些高级类型，以及它们的简要描述和特点：

|                   类型名称                   |          特点          |                             描述                             |
| :------------------------------------------: | :--------------------: | :----------------------------------------------------------: |
|      **交叉类型（Intersection Types）**      |      组合多个类型      |     允许你将多个类型合并成一个类型，满足所有类型的成员。     |
|         **联合类型（Union Types）**          |    选择多个类型之一    |          表示一个值可以是几种类型之一。使用竖线表示          |
|             **泛型（Generics）**             |       类型参数化       |  允许你定义灵活且可重用的组件，这些组件可以支持不同的类型。  |
|         **映射类型（Mapped Types）**         | 基于现有类型创建新类型 | 映射类型允许你从一个已有的类型创建一个新的类型，并添加或修改属性的类型。 |
|      **条件类型（Conditional Types）**       |    基于条件选择类型    |  允许你根据条件选择两个类型中的一个。这通常与泛型一起使用。  |
|         **索引类型（Index Types）**          |   描述对象属性的类型   |           索引类型允许你查询或设置对象的属性类型。           |
|        **只读类型（Readonly Types）**        |        属性只读        | 通过在属性名前添加 `readonly` 关键字，你可以将对象的属性设置为只读，确保它们不会被修改。 |
|        **排除类型（Exclude Types）**         |      排除特定类型      |               从一个类型集合中排除指定的类型。               |
|        **提取类型（Extract Types）**         |      提取特定类型      |               从一个类型集合中提取指定的类型。               |
| **非空断言类型（Non-null Assertion Types）** |      断言值不为空      | 使用 `!` 后缀来告诉 TypeScript 编译器该值是非空的，即使它可能是 `null` 或 `undefined`。 |
|         **类型别名（Type Aliases）**         |   为复杂类型创建别名   |      允许你为复杂的类型表达式创建易于理解和使用的别名。      |



### **类型别名**

在 TypeScript 中，类型别名（Type Aliases）是一种为现有的类型定义一个新名称的方式。这有助于简化复杂的类型声明，提高代码的可读性和可维护性。

类型别名可以使用 `type` 关键字来定义。

下面是一些使用类型别名的例子：

#### 基本类型别名

```typescript
// 定义 string 类型别名为 Name
type Name = string;  
// 定义 number 类型别名为 Age
type Age = number;  
  
const name: Name = "Alice";  
const age: Age = 30;
```

>  在这个例子中，我们为 `string` 和 `number` 类型分别定义了别名 `Name` 和 `Age`。

#### 联合类型别名

```typescript
// 定义联合类型的别名为 Shape
type Shape =  
  | { kind: "circle"; radius: number }  
  | { kind: "rectangle"; width: number; height: number };  
  
const circle: Shape = { kind: "circle", radius: 10 };  
const rectangle: Shape = { kind: "rectangle", width: 20, height: 10 };
```



#### 交叉类型别名

```typescript
type Loggable = {  
  log(): void;  
}  
  
type Named = {  
  name: string;  
}  
// 定义 Loggable & Named 交叉类型别名为 LoggableNamed
type LoggableNamed = Loggable & Named;  
  
const obj: LoggableNamed = {  
  name: "Alice",  
  log() {  
    console.log(this.name);  
  }  
};
```

> 在这个例子中，我们定义了 `Loggable` 和 `Named` 两个类型，并使用 `&` 符号创建了一个交叉类型别名 `LoggableNamed`，它结合了 `Loggable` 和 `Named` 的所有成员。

#### 泛型类型别名

```typescript
// 定义 泛型类型别名 `Id`
type Id<T> = {  
  id: T;  
};  
  
const numberId: Id<number> = { id: 1 };  
const stringId: Id<string> = { id: "hello" };
```

>  在这个例子中，我们定义了一个泛型类型别名 `Id`，它接受一个类型参数 `T`，并创建了一个具有 `id` 属性的对象类型，该属性的类型是 `T`。

类型别名有助于简化代码，特别是在处理复杂的类型时。它们不仅提高了代码的可读性，而且还允许我们更灵活地组织和复用类型定义。



### **联合类型**

在 TypeScript 中，联合类型（Union Types）允许一个变量在编译时可以是几种类型之一。

联合类型是通过竖线（`|`）分隔每个类型来定义的。当你为变量分配一个值时，该值必须匹配联合类型中的至少一个类型。

例如：

```typescript
let myVar: string | number;  
  
myVar = "hello"; // string 类型，可以赋值  
myVar = 42;     // number 类型，也可以赋值  
  
// myVar = true; // 错误，因为 true 不是 string 也不是 number 类型
```

>  在这个例子中，`myVar` 可以是 `string` 类型或 `number` 类型。

#### **判断联合类型**

`keyof` 类似于 `Object.keys` ，用于获取一个接口中 Key 的联合类型。

```ts
解释interface Button {
    type: string
    text: string
}

type ButtonKeys = keyof Button
// 等效于
type ButtonKeys = "type" | "text"
```

#### **可识别联合类型**

然而，当你试图访问一个联合类型对象的属性或方法时，TypeScript 不一定知道你要使用的是哪个类型，因此可能不会提供类型安全。为了解决这个问题，TypeScript 提供了可识别联合类型（Discriminated Unions）的概念。

可识别联合类型是指每个成员类型都有一个独特的属性，这个属性在其他成员类型中不存在。这个独特的属性被称为“识别符”（discriminant）。当使用这个识别符时，TypeScript 可以确定变量当前的具体类型，从而提供类型安全。

```typescript
type Shape =  
  | { kind: "circle"; radius: number }  
  | { kind: "rectangle"; width: number; height: number };  
  
function area(s: Shape) {  
  switch (s.kind) {  
    case "circle":  
      return Math.PI * s.radius ** 2;  
    case "rectangle":  
      return s.width * s.height;  
  }  
}  
  
const circle = { kind: "circle", radius: 10 };  
const rectangle = { kind: "rectangle", width: 20, height: 10 };  
  
console.log(area(circle)); // 输出圆的面积  
console.log(area(rectangle)); // 输出矩形的面积
```

> 在这个例子中，`Shape` 是一个可识别联合类型，因为它有一个 `kind` 属性，该属性在每个成员类型中都有不同的值（`"circle"` 或 `"rectangle"`）。这使得我们可以安全地根据 `kind` 的值来确定如何计算面积。

通过使用可识别联合类型，我们可以编写更加类型安全的代码，因为 TypeScript 能够在编译时确定每个变量的具体类型。

### **交叉类型**

TypeScript的交叉类型（Intersection Types）是将多个类型合并为一个类型的方式。这意味着你可以将现有的多种类型叠加到一起，形成一个新的类型，这个新类型将包含所有原类型的特性。

交叉类型是通过使用`&`运算符来定义的。

例如，假设你有两个接口`IPerson`和`IWorker`，分别定义了人的基本信息和工作信息。你可以使用交叉类型来创建一个新的类型`IStaff`，这个类型将同时包含`IPerson`和`IWorker`的所有成员。

```typescript
interface IPerson {  
  id: string;  
  age: number;  
}  
  
interface IWorker {  
  companyId: string;  
}  
  
type IStaff = IPerson & IWorker;  
  
const staff: IStaff = {  
  id: 'E1006',  
  age: 33,  
  companyId: 'EXE'  
};
```

> 在这个例子中，`IStaff`类型就是一个交叉类型，它包含了`IPerson`和`IWorker`的所有成员。因此，当你创建一个`IStaff`类型的变量时，你需要提供所有这些成员的值。

交叉类型在TypeScript中非常有用，特别是在你需要组合多个类型的特性时。例如，在混入（Mixins）或其他不适合典型面向对象模型的地方，你经常会看到交叉类型的使用。

### **映射类型**

在 TypeScript 中，映射类型（Mapped Types）是一种高级类型，它允许你基于已有的类型创建新的类型，通过遍历原始类型的所有属性并应用一些转换规则来生成新的属性。映射类型使用了一种特殊的语法，即在类型名后面加上尖括号 `<>`，并在其中定义转换规则。

映射类型最常见的应用场景是当你想要基于一个对象的形状创建一个新的对象，但需要对原始对象的每个属性应用一些转换逻辑时。例如，你可以将对象的所有属性都变为只读，或者将属性的类型从一种类型转换为另一种类型。

下面是一些映射类型的例子：

#### 只读映射类型

```typescript
type Readonly<T> = {  
  readonly [P in keyof T]: T[P];  
};  
  
interface Todo {  
  title: string;  
  description: string;  
}  
  
const todo: Readonly<Todo> = {  
  title: "Learn TypeScript",  
  description: "Read the official documentation",  
};  
  
// 下面的代码将会报错，因为 todo 的属性是只读的  
// todo.title = "Update TypeScript knowledge";
```

在这个例子中，`Readonly` 映射类型将对象 `T` 的所有属性都标记为只读。

#### 写入映射类型

```typescript
type Writable<T> = {  
  -readonly [P in keyof T]: T[P];  
};  
  
const readonlyTodo: Readonly<Todo> = {  
  title: "Learn TypeScript",  
  description: "Read the official documentation",  
};  
  
const writableTodo: Writable<Readonly<Todo>> = readonlyTodo;  
  
// 现在 writableTodo 的属性是可以写入的  
writableTodo.title = "Update TypeScript knowledge";
```

`Writable` 映射类型将对象 `T` 的所有只读属性移除只读修饰符，使其变为可写。

#### 转换属性类型的映射类型

```typescript
type Partial<T> = {  
  [P in keyof T]?: T[P];  
};  
  
interface Todo {  
  title: string;  
  description: string;  
}  
  
const todo: Partial<Todo> = {  
  title: "Learn TypeScript"  
  // description 属性是可选的  
};
```

在这个例子中，`Partial` 映射类型将对象 `T` 的所有属性都变为可选的。

#### 自定义映射类型

你也可以创建自定义的映射类型，根据需要对属性进行更复杂的转换。

```typescript
type Capitalize<T> = {  
  [P in keyof T]: T[P] extends string ? CapitalizeString<T[P]> : T[P];  
};  
  
type CapitalizeString<S extends string> = S extends `${infer First}${infer Rest}`  
  ? `${Uppercase<First>}${Rest}`  
  : S;  
  
type Greeting = Capitalize<{ hello: string; world: string }>;  
  
// 结果类型是 { hello: "Hello"; world: "World"; }  
const greeting: Greeting = {  
  hello: "Hello",  
  world: "World"  
};
```

在这个例子中，`Capitalize` 映射类型将对象 `T` 的所有字符串属性都转换为首字母大写。

映射类型是 TypeScript 中非常强大的工具，它们允许你以声明式的方式创建新类型，而无需显式地定义每个属性的类型。通过使用映射类型，你可以更加灵活地操作类型，并编写更加通用和可重用的代码。



### **条件类型**

TypeScript 中的条件类型（Conditional Types）是一种高级类型，它允许你根据一个条件表达式来选择两个类型中的一个。条件类型使用了一个特殊的语法，它类似于 JavaScript 中的三元条件运算符（ternary operator），但应用于类型系统。

条件类型的基本语法如下：

```typescript
typescript复制代码

T extends U ? X : Y
```

这里，`T` 和 `U` 是两个类型变量，`X` 和 `Y` 是两个类型。如果 `T` 可以赋值给 `U`（即 `T` 是 `U` 的子类型或相同类型），则条件类型的结果是 `X`；否则，结果是 `Y`。

条件类型在类型操作和高级类型创建中非常有用，例如，你可以使用条件类型来创建联合类型、交叉类型、映射类型等。

下面是一些条件类型的例子：

**示例 1：提取字符串中的字符长度**

```typescript
type StringLength<T extends string> = T['length'];  
  
const str: StringLength<'hello'> = 5; // 类型是 5
```

**示例 2：根据条件返回不同的类型**

```typescript
type TypeOf<T> = T extends string | number ? T : never;  
  
const isStringOrNumber = <T>(value: T): TypeOf<T> => {  
  if (typeof value === 'string' || typeof value === 'number') {  
    return value;  
  }  
  throw new Error('Invalid type');  
};  
  
const num = isStringOrNumber(123); // 类型是 number  
const str = isStringOrNumber('hello'); // 类型是 string
```

**示例 3：使用条件类型实现 `Exclude`**

`Exclude` 是一个内置的条件类型，它可以从一个类型中排除掉另一个类型的所有属性。

```typescript
type Exclude<T, U> = T extends U ? never : T;  
  
type Animals = 'Dog' | 'Cat' | 'Bird';  
type Mammals = 'Dog' | 'Cat';  
  
type OtherAnimals = Exclude<Animals, Mammals>;  
// 类型 OtherAnimals 等于 'Bird'，因为 'Dog' 和 'Cat' 被排除了
```

**示例 4：使用条件类型实现 `Extract`**

`Extract` 是另一个内置的条件类型，它从一个类型中提取出另一个类型的所有属性。

```typescript
type Extract<T, U> = T extends U ? T : never;  
  
type Animals = 'Dog' | 'Cat' | 'Bird';  
type Mammals = 'Dog' | 'Cat';  
  
type JustMammals = Extract<Animals, Mammals>;  
// 类型 JustMammals 等于 'Dog' | 'Cat'，因为它只提取了 'Animals' 中也是 'Mammals' 的类型
```

**示例 5：条件类型与映射类型结合使用**

```typescript
type ReadOnly<T> = {  
  readonly [P in keyof T]: T[P];  
};  
  
type Writable<T> = {  
  -readonly [P in keyof T]: T[P];  
};  
  
type ReadWrite<T, ReadOnly extends boolean> = ReadOnly extends true  
  ? ReadOnly<T>  
  : Writable<T>;  
  
type Todo = {  
  title: string;  
  description: string;  
};  
  
const todo1: ReadWrite<Todo, true> = {  
  title: "Learn TypeScript",  
  description: "Read the official documentation"  
};  
  
// todo1 的属性是只读的  
// todo1.title = "Update TypeScript knowledge"; // 错误  
  
const todo2: ReadWrite<Todo, false> = {  
  title: "Learn TypeScript",  
  description: "Read the official documentation"  
};  
  
// todo2 的属性是可写的  
todo2.title = "Update TypeScript knowledge"; // 正确
```

在这个例子中，`ReadWrite` 类型是一个条件类型，它根据 `ReadOnly` 参数的值来选择是返回只读类型还是可写类型。

条件类型是 TypeScript 类型系统中非常强大的工具，它们允许你根据编译时的条件来创建灵活的、可定制的类型。通过结合使用条件类型和其他高级类型，你可以创建出非常复杂和有用的类型定义。



## **数组**

### **数组解构**

在 TypeScript 中，数组解构是一种方便的方式来提取数组中的元素，并将其赋值给变量。解构赋值使得代码更加简洁，可读性更强。

下面是一些 TypeScript 数组解构的示例：

#### **基本数组解构**

```typescript
const numbers = [1, 2, 3];  
const [first, second, third] = numbers;  
  
console.log(first); // 输出 1  
console.log(second); // 输出 2  
console.log(third); // 输出 3
```

> 在这个例子中，我们创建了一个名为 `numbers` 的数组，然后使用解构赋值将数组的前三个元素分别赋值给 `first`、`second` 和 `third` 变量。

#### 剩余元素解构

如果数组有更多的元素，而你只需要提取部分元素，可以使用剩余语法（`...`）来捕获剩余的元素。

```typescript
const numbers = [1, 2, 3, 4, 5];  
const [first, ...rest] = numbers;  
  
console.log(first); // 输出 1  
console.log(rest);  // 输出 [2, 3, 4, 5]
```

> 在这个例子中，`first` 变量被赋值为数组的第一个元素，而 `rest` 变量则是一个包含剩余元素的新数组。

#### 忽略某些元素

如果你不想将某些元素赋值给变量，可以在解构中使用下划线（`_`）来忽略它们。

```typescript
const numbers = [1, 2, 3, 4, 5];  
const [, second, , fourth] = numbers;  
  
console.log(second); // 输出 2  
console.log(fourth); // 输出 4
```

> 在这个例子中，我们忽略了数组的第一个和第三个元素，只将第二个和第四个元素分别赋值给 `second` 和 `fourth` 变量。

#### 解构赋值的类型推断

TypeScript 会在解构赋值时进行类型推断，确保变量的类型与数组元素的类型一致。

```typescript
const numbers: number[] = [1, 2, 3];  
const [a, b, c]: [number, number, number] = numbers;  
  
console.log(a); // 输出 1，类型为 number  
console.log(b); // 输出 2，类型为 number  
console.log(c); // 输出 3，类型为 number
```

> 在这个例子中，虽然我们没有显式地为 `a`、`b` 和 `c` 指定类型，但 TypeScript 会根据 `numbers` 数组的类型推断出它们的类型都是 `number`。



### **数组展开运算符**

在 TypeScript（以及 JavaScript）中，数组展开运算符（Spread Operator）用于将一个数组的元素展开到另一个数组或者一个函数调用中。这可以让我们在不复制整个数组的情况下，轻松地组合或克隆数组。展开运算符使用三个点（`...`）来表示。

下面是几个 TypeScript 中数组展开运算符的用法示例：

#### **数组克隆**

使用展开运算符可以创建一个数组的浅拷贝。

```typescript
const originalArray = [1, 2, 3];  
const clonedArray = [...originalArray];  
  
console.log(clonedArray); // 输出 [1, 2, 3]
```

#### **数组合并**

可以将多个数组使用展开运算符合并成一个新数组。

```typescript
const array1 = [1, 2, 3];  
const array2 = [4, 5, 6];  
const combinedArray = [...array1, ...array2];  
  
console.log(combinedArray); // 输出 [1, 2, 3, 4, 5, 6]
```

#### **函数参数**

在函数调用中，可以使用展开运算符将数组的元素作为单独的参数传递。

```typescript
function sum(a: number, b: number, c: number) {  
  return a + b + c;  
}  
  
const numbers = [1, 2, 3];  
const result = sum(...numbers);  
  
console.log(result); // 输出 6
```

#### **与解构赋值结合使用**

展开运算符还可以与解构赋值结合使用，用于复制数组并替换其中的某些元素。

```typescript
const originalArray = [1, 2, 3];  
const [first, ...rest] = originalArray;  
const newArray = [...rest, 4];  
  
console.log(newArray); // 输出 [2, 3, 4]
```

> 在这个例子中，我们创建了一个新的数组 `newArray`，它包含了 `originalArray` 中除了第一个元素之外的所有元素，并在末尾添加了一个新的元素 `4`。

#### 注意事项

- 展开运算符执行的是**浅拷贝**，所以如果数组中的元素是对象或其他数组，拷贝后的新数组中的这些元素将仍然引用原始对象或数组。
- 展开运算符不会改变原始数组。

这些用法使得数组展开运算符在 TypeScript 中成为了一种非常有用且灵活的工具，用于处理数组数据。

### **数组遍历**

在 TypeScript 中，你可以使用多种方法来遍历数组。以下是一些常见的遍历数组的方法：

#### **for 循环**

传统的 for 循环可以用来遍历数组。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
for (let i = 0; i < numbers.length; i++) {  
  console.log(numbers[i]);  
}
```



#### **forEach 方法**

`Array.prototype.forEach` 方法用于对数组的每个元素执行一次提供的函数。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
numbers.forEach(number => {  
  console.log(number);  
});
```

> **特点：**
>
> 1. **遍历数组**：`forEach` 用于遍历数组的每个元素，并对每个元素执行一次提供的函数。
> 2. **回调函数**：`forEach` 接受一个回调函数作为参数，这个回调函数会被数组的每个元素调用一次。回调函数可以接收三个参数：当前元素值、当前元素的索引和数组本身。
> 3. **不改变原数组**：`forEach` 方法不会改变原数组的内容。它只是简单地遍历数组，并对每个元素执行回调函数。
> 4. **无返回值**：`forEach` 方法本身没有返回值（返回 `undefined`）。它主要用于执行操作，而不是用于生成新数组或收集处理结果。
> 5. **类型安全**：在 TypeScript 中，`forEach` 方法可以利用类型系统来提供类型安全。你可以为回调函数的参数指定类型，以确保类型匹配和代码健壮性。
> 6. **易于使用**：`forEach` 方法的使用相对简单和直观，对于需要遍历数组并对每个元素执行某种操作的场景非常有用。
> 7. **不支持提前退出**：与一些其他数组方法（如 `Array.prototype.some` 或 `Array.prototype.every`）不同，`forEach` 不支持提前退出循环。即使回调函数返回了某个值，`forEach` 也会继续遍历数组的剩余元素。
> 8. **遍历顺序**：`forEach` 方法按照数组元素在数组中出现的顺序进行遍历，即按照索引从低到高的顺序

#### **map 方法**

`Array.prototype.map` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后的返回值。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
const squared = numbers.map(number => number * number);  
console.log(squared); // 输出 [1, 4, 9, 16, 25]
```

> **特点：**
>
> 1. **生成新数组**：`map` 方法不会修改原始数组，而是返回一个新数组。这个新数组中的元素是原始数组元素经过回调函数处理后的结果。
> 2. **回调函数**：`map` 方法接受一个回调函数作为参数，这个回调函数会被数组的每个元素调用一次。回调函数可以接收三个参数：当前元素值、当前元素的索引和数组本身。回调函数应返回一个新值，这个新值将被用来构建新数组。
> 3. **链式调用**：由于 `map` 方法返回一个新数组，因此可以与其他数组方法结合使用，实现链式调用。
> 4. **类型安全**：在 TypeScript 中，`map` 方法可以利用类型系统来提供类型安全。你可以为回调函数的参数和返回值指定类型，以确保类型匹配和代码健壮性。
> 5. **遍历顺序**：`map` 方法按照数组元素在数组中出现的顺序进行遍历，即按照索引从低到高的顺序。

**forEach 和 map 的类型参数**

你可以为 `forEach` 和 `map` 提供类型参数，以确保类型安全。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
numbers.forEach<number>((number) => {  
  console.log(number);  
});  
 
const squared: number[] = numbers.map<number, number>(number => number * number);  
console.log(squared); // 输出 [1, 4, 9, 16, 25]
```



#### **for...of 循环**

TypeScript 提供了 `for...of` 循环，这是 ES6 引入的一种更简洁的遍历数组的方法。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
for (const number of numbers) {  
  console.log(number);  
}
```

> **特点：**
>
> 1. **自动迭代**：`for...of` 循环会自动迭代可迭代对象的每个元素，而不需要手动更新索引或进行条件检查。
> 2. **迭代值**：`for...of` 循环直接提供可迭代对象的当前元素值，而不需要通过索引来访问。
> 3. **不支持普通对象**：`for...of` 循环不能直接用于遍历普通对象（即没有实现 `[Symbol.iterator]` 接口的对象），因为它要求遍历的对象必须是可迭代的。如果需要遍历对象的属性，可以使用 `for...in` 循环或 `Object.keys()` 方法。
> 4. **可以与 `break`、`continue` 和 `return` 配合使用**：`for...of` 循环可以配合 `break` 语句来提前退出循环，`continue` 语句来跳过当前迭代进入下一次迭代，以及 `return` 语句来退出整个函数。

**for...of 与解构赋值**

你也可以在 `for...of` 循环中使用解构赋值。

```typescript
const numbers: [number, number, number, number, number] = [1, 2, 3, 4, 5];  
for (const [index, value] of numbers.entries()) {  
  console.log(`Index: ${index}, Value: ${value}`);  
}
```





#### **for...in 循环**

虽然 `for...in` 循环在 JavaScript 中**常用来遍历对象的属性**，但它也可以用来遍历数组索引。但需要注意的是，**`for...in` 循环不仅遍历数组元素，还会遍历可枚举的属性，包括原型链上的**。因此，通常不建议使用 `for...in` 来遍历数组。

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];  
for (let index in numbers) {  
  console.log(numbers[index]);  
}
```

> 特点：
>
> 1. **遍历对象属性**：`for...in` 循环主要用于遍历对象的属性，包括对象自身以及从其原型链上继承的属性。
> 2. **枚举顺序**：`for...in` 循环遍历对象属性的顺序并不是按照属性在对象中定义的顺序，而是按照对象属性在内部存储中的顺序，这通常是根据属性被添加到对象中的时间顺序。在某些情况下，遍历顺序可能与预期不同。
> 3. **包括原型链属性**：`for...in` 循环不仅遍历对象自身的属性，还会遍历对象原型链上的属性。这意味着它会包括从原型对象继承的属性。
> 4. **返回属性名**：与 `for...of` 循环不同，`for...in` 循环返回的是对象的属性名（键名），而不是属性值。要获取属性值，需要使用对象本身和属性名来访问。
> 5. **非严格模式下包括不可枚举属性**：在非严格模式下（`use strict` 未被声明），`for...in` 循环还会遍历对象的不可枚举属性。在严格模式下，它只遍历可枚举属性。
> 6. **不适用于遍历数组**：虽然 `for...in` 循环可以用于遍历数组，但由于它会遍历数组的所有可枚举属性（包括原型链上的属性），并且不保证按照索引顺序遍历，因此通常不推荐使用它来遍历数组。对于数组，更推荐使用 `for...of` 循环或常规的 `for` 循环。



## **函数**

### **TypeScript 函数与 JavaScript 函数的区别**

| TypeScript     | JavaScript         |
| -------------- | ------------------ |
| 含有类型       | 无类型             |
| 箭头函数       | 箭头函数（ES2015） |
| 函数类型       | 无函数类型         |
| 必填和可选参数 | 所有参数都是可选的 |
| 默认参数       | 默认参数           |
| 剩余参数       | 剩余参数           |
| 函数重载       | 无函数重载         |

### **函数类型**

以下是几种常见的函数分类以及它们的特点：

|     分类     |                             特点                             |                             示例                             |
| :----------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| **普通函数** |            最基本的函数形式，没有特殊修饰或特性。            | function greet(name: string): string {<br> return `Hello, ${name}!`;<br>} |
| **箭头函数** | 使用 `=>` 语法定义，更简洁的语法，没有自己的 `this`、`arguments`、`super` 或 `new.target`。 | `const greet = (name: string): string => `Hello, ${name}!`;` |
| **构造函数** |   使用 `new` 关键字调用的函数，通常用于创建和初始化对象。    | class Person {<br> constructor(public name: string) {}<br>}<br>const person = new Person("Alice"); |
| **工厂函数** |         返回一个对象的函数，而不是直接创建一个对象。         | function createPerson(name: string): Person {<br> return new Person(name);<br>}<br>const person = createPerson("Alice"); |
|   **方法**   |      定义在对象或类上的函数，通过对象或类的实例来调用。      | class Person {<br> greet(): string {<br> return `Hello, ${this.name}!`;<br> }<br>}<br>const person = new Person("Alice");<br>person.greet(); |
|  **访问器**  |             允许你读取、设置或修改类的私有属性。             | class Person {<br> private _name: string;<br> get name(): string {<br> return this._name;<br> }<br> set name(value: string) {<br> this._name = value;<br> }<br>}<br>const person = new Person();<br>person.name = "Alice";<br>console.log(person.name); |
| **重载函数** |         同一个函数名，但参数列表不同的多个函数定义。         | function greet(name: string): string;<br>function greet(age: number): string;<br>function greet(input: string) |
| **抽象方法** |        在类中声明但没有实现的方法，必须在子类中实现。        | abstract class Animal {<br> abstract makeSound(): void;<br>}<br>class Dog extends Animal {<br> makeSound(): void {<br> console.log("Woof!");<br> }<br>} |

### **函数参数**

TypeScript 的函数参数具有以下特点：

|      特点      |                             说明                             |                             示例                             |
| :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|  **类型注解**  |   参数可以有明确的类型注解，这有助于增强代码的类型安全性。   | function greet(name: string): void {<br> console.log(`Hello, ${name}!`);<br>} |
| **参数默认值** | 参数可以指定默认值，当调用函数时未提供该参数时，将使用默认值。 | function greet(name: string = "Anonymous"): void {<br> console.log(`Hello, ${name}!`);<br>} |
|  **可选参数**  |  使用 `?` 标记的参数是可选的，调用函数时可以省略这些参数。   | function greet(name: string, greeting?: string): void {<br> const msg = greeting<br/>} |
|  **剩余参数**  | 使用 `...` 标记的参数可以接收任意数量的参数，这些参数被收集到一个数组中。 | function sum(...numbers: number[]): number {<br> return numbers.reduce((a, b) => a + b, 0);<br>} |
|  **参数解构**  |        可以使用解构赋值来直接提取对象或数组的参数值。        | function introduce({ name, age }: { name: string, age: number }): void {<br> console.log(`My name is ${name} and I'm ${age} years old.`);<br>} |
|  **参数验证**  | TypeScript 会在编译时检查参数的类型和数量，确保调用者提供了正确类型和数量的参数。 |                              -                               |
|  **函数重载**  | 函数可以有多个重载定义，允许**同一个函数名接受不同类型的参数**。 | function reverse(s: string): string;<br>function reverse(a: number[]): number[];<br>function reverse(input: any): any {<br> return Array.isArray(input) ? input.reverse() : input.split('').reverse().join('');<br>} |

### **箭头函数**

在 TypeScript 中，箭头函数 (`arrow function`) 提供了一种更简洁、更优雅的函数表达式语法。箭头函数使用 `=>` 符号来定义，并且它们有自己的特性，与常规函数（也被称为“函数声明”或“函数表达式”）有所不同。

**特点**：

1. **简洁的语法**：箭头函数语法更简洁，尤其是对于没有自己 `this`、`arguments`、`super` 或 `new.target` 的函数。
2. **不绑定自己的 `this`**：箭头函数不会创建自己的 `this` 上下文，它们只是从包含它们的代码中继承 `this`。也就是在定义箭头函数时候绑定`this` 上下文。 这使得它们非常适合于回调函数和作为对象的方法，因为它们不会意外地改变 `this` 的绑定。
3. **不绑定 `arguments` 对象**：箭头函数也没有 `arguments` 对象。如果你需要在函数内部访问所有参数，可以使用剩余参数语法（`...args`）。
4. **不能用作构造函数**：箭头函数不能用作构造函数，也就是说，它们不能配合 `new` 关键字使用来创建对象。
5. **没有 `prototype` 属性**：箭头函数没有 `prototype` 属性，因此它们不能用作类构造函数。
6. **更短的函数体**：如果函数体只有一个表达式，可以省略大括号，并且该表达式的结果将自动作为函数的返回值。

**示例**：

```typescript
// 简单的箭头函数  
const greet = (name: string) => `Hello, ${name}!`;  
  
// 作为回调函数使用  
const numbers = [1, 2, 3, 4, 5];  
const squares = numbers.map(x => x * x); // [1, 4, 9, 16, 25]  
  
// 在类中使用箭头函数作为方法  
class MyClass {  
  value: number;  
  
  constructor(value: number) {  
    this.value = value;  
  }  
  
  // 使用箭头函数来确保 `this` 指向 MyClass 实例  
  increment = () => {  
    this.value++;  
  }  
  
  // 常规函数，`this` 绑定到调用上下文  
  regularFunction() {  
    this.value++;  
  }  
}  
  
const obj = new MyClass(5);  
obj.increment(); // 使用箭头函数，`this` 指向 obj  
obj.regularFunction(); // 调用错误，因为 `this` 可能是 undefined 或 null  
  
// 使用箭头函数作为对象字面量中的方法  
const obj2 = {  
  value: 10,  
  increment: () => {  
    this.value++; // 注意：这里的 `this` 不是 obj2，因为箭头函数不绑定自己的 `this`
    console.log(this) // 执行时输出 windows 对象
  }  
};  
  
obj2.increment(); // `this` 在这里不会指向 obj2，所以不会报错，但也不会按预期工作，此时 this 指向 windows

const obj3 = {  
  value: 20,  
  increment: function() {  
    this.value++; // 注意：这里的 `this` 绑定当前对象
    console.log(this) // 输出 obj3
  }  
};  
  
obj3.increment(); // 会按预期工作
```

> 在上面的示例中，可以看到箭头函数 `increment` 在 `MyClass` 类中被用来确保 `this` 指向的是类的实例。相比之下，`regularFunction` 方法在调用时可能会遇到 `this` 绑定错误的问题，因为常规函数有自己的 `this` 上下文。
>
> 在最后一个示例中，箭头函数 `increment` 作为对象 `obj2` 的方法被定义，但由于箭头函数不绑定自己的 `this`，所以 `this` 在函数内部不会指向 `obj2`。这展示了箭头函数在处理 `this` 时的特殊行为。



### **函数重载**

**TypeScript 函数重载（Function Overloading）**是指在同一个作用域内用同一个函数名声明多次，但每次声明的函数参数类型或数量不同，从而实现对同一函数名的多种实现方式。这种方式允许我们根据不同的参数类型或数量调用不同的函数实现。

**特点**：

1. **同一函数名**：使用相同的函数名声明多个函数。
2. **不同参数**：每个重载版本的函数参数类型或数量必须不同。
3. **返回类型可相同也可不同**：虽然参数类型不同，但返回类型可以相同也可以不同。
4. **编译时检查**：TypeScript 的函数重载在编译时进行类型检查，确保调用时参数类型与某个重载版本匹配。

**为什么要用函数重载**：

1. **提高代码可读性**：通过为同一函数提供多种实现方式，可以使得代码更具可读性，因为每种实现方式可能对应一种特定的使用场景。
2. **类型安全**：函数重载可以提供更好的类型安全性，因为它确保了在编译时就已经确定了函数的参数类型和数量。
3. **灵活性**：允许开发者在不改变函数名的情况下，为函数提供多种不同的实现方式，这在实际开发中是非常有用的。

**示例**：

```typescript
function combine(a: number, b: number): number;  
function combine(a: string, b: string): string;  
  
function combine(a: any, b: any) {  
    if (typeof a === "number" && typeof b === "number") {  
        return a + b;  
    }  
    if (typeof a === "string" && typeof b === "string") {  
        return a.concat(b);  
    }  
    throw new Error("Invalid arguments");  
}  
  
let result1 = combine(1, 2); // 返回数字 3  
let result2 = combine("hello", " world"); // 返回字符串 "hello world"
```

> 在上面的示例中，`combine` 函数被重载了两次，一次用于处理数字类型的参数，另一次用于处理字符串类型的参数。在函数体内部，我们通过检查参数的类型来确定应该执行哪种实现。



## **对象**

在 TypeScript 中，对象是一种复合数据类型，它允许您存储多个值作为一个单一的实体。这些值可以是不同的数据类型，并且可以通过键（通常是字符串）来访问。TypeScript 的对象类型是对 JavaScript 对象类型的超集，提供了更强的类型安全性。



### **对象定义**

在 TypeScript 中，对象的类型可以通过两种主要方式定义：

1. **使用类型注解**：您可以为对象字面量或变量指定一个对象类型，该类型定义了对象可以具有的属性和方法。
2. **使用接口**：接口允许您定义一个对象的结构，包括它可以有哪些属性和方法，以及这些属性和方法的类型。

#### **使用类型注解定义对象**

```typescript
const person: { name: string; age: number } = {  
  name: "Alice",  
  age: 30  
};  
  
// 访问对象的属性  
console.log(person.name); // 输出 "Alice"  
console.log(person.age);  // 输出 30  
  
// 尝试给对象添加一个不符合定义的属性会报错  
// person.location = "New York"; // TypeScript 错误  
  
// 尝试修改属性的类型也会报错  
// person.age = "thirty"; // TypeScript 错误
```

>  在这个例子中，我们定义了一个 `person` 对象，并使用了类型注解来指定它必须有一个 `name` 属性（类型为 `string`）和一个 `age` 属性（类型为 `number`）。

#### **使用接口定义对象**

```typescript
interface Person {  
  name: string;  
  age: number;  
  greet(): void;  
}  
  
const alice: Person = {  
  name: "Alice",  
  age: 30,  
  greet() {  
    console.log(`Hello, my name is ${this.name}`);  
  }  
};  
  
alice.greet(); // 输出 "Hello, my name is Alice"  
  
// 尝试给对象添加一个不符合接口定义的属性会报错  
// alice.location = "New York"; // TypeScript 错误  
  
// 尝试修改属性的类型也会报错  
// alice.age = "thirty"; // TypeScript 错误  
  
// 尝试不实现接口中的方法也会报错  
// const bob: Person = { name: "Bob", age: 25 }; // TypeScript 错误
```

>  在这个例子中，我们首先定义了一个 `Person` 接口，它指定了对象必须有的属性和方法。然后，我们创建了一个 `alice` 对象，它实现了 `Person` 接口，并提供了所有必要的属性和方法。

使用接口定义对象的好处是，您可以在**多个地方重复使用相同的接口**，以确保所有实现该接口的对象都遵循相同的结构。此外，接口还可以定义可选属性、只读属性和索引签名等高级功能。



## **类**

在 TypeScript 中，类（Class）是一种面向对象编程的构造，它提供了一种定义对象结构和行为的模板。

**类定义了对象的属性（成员变量）和方法（成员函数），并且可以通过实例化来创建对象**。



### **使用**

定义类的关键字为 `class`，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：

- **字段** ： 字段是类里面声明的变量。字段表示对象的有关数据。
- **构造函数**： 类实例化时调用，可以为类的对象分配内存。
- **方法**： 方法为对象要执行的操作。

以下是一个简单的 TypeScript 类的例子：

```typescript
class Greeter {  
  greeting: string;  
  
  constructor(message: string) {  
    this.greeting = message;  
  }  
  
  greet() {  
    return "Hello, " + this.greeting;  
  }  
}  
  
// 创建 Greeter 类的实例  
let greeter = new Greeter("world");  
  
// 调用实例的方法  
console.log(greeter.greet());  // 输出 "Hello, world"
```

> 在这个例子中，`Greeter` 是一个类，它有一个名为 `greeting` 的属性，以及一个构造函数和一个 `greet` 方法。
>
> - `greeting` 属性存储了一个字符串，表示问候语。
> - 构造函数 `constructor` 是一个特殊的方法，当创建类的新实例时会自动调用。在这个构造函数中，我们为 `greeting` 属性赋了一个值。
> - `greet` 方法返回一个字符串，该字符串由 "Hello, " 和 `greeting` 属性的值组成。
> - 要创建 `Greeter` 类的一个实例，我们使用 `new` 关键字，并传递一个字符串参数给构造函数。一旦实例被创建，我们就可以通过实例来调用其方法，例如 `greeter.greet()`。

### **类的特性**

以下是一些 TypeScript 类的特性：

|      特性      |                             描述                             |
| :------------: | :----------------------------------------------------------: |
|   **类声明**   | 使用 `class` 关键字声明一个类。类可以包含属性、方法和构造函数。 |
|    **属性**    | 类中的属性是类的成员变量，用于存储类的状态。属性可以是公有（public）、私有（private）或受保护的（protected）。 |
|    **方法**    | 类中的方法是类的成员函数，用于执行特定的操作。方法可以是公有、私有或受保护的。 |
|  **构造函数**  | 构造函数是一个特殊的方法，用于初始化类的新实例。构造函数在创建类的实例时自动调用。 |
|  **静态成员**  | 类可以包含静态属性和静态方法。静态成员属于类本身，而不是类的实例。它们可以通过类名直接访问，而不需要创建类的实例。 |
|    **继承**    | TypeScript 支持类的继承，允许一个类继承另一个类的属性和方法。通过继承，可以创建层次结构的类，实现代码的重用和扩展。 |
| **访问修饰符** | TypeScript 类支持三种访问修饰符：`public`、`private` 和 `protected`。这些修饰符控制类的成员（属性和方法）的可见性和可访问性。 |
|   **访问器**   | 访问器（getter 和 setter）允许您控制对类属性的访问和修改。getter 是一种特殊的方法，用于读取属性的值，而 setter 是一种特殊的方法，用于设置属性的值。 |
|    **接口**    | 接口定义了一个类的形状，它指定了一个类应该具有哪些属性和方法。类可以实现一个或多个接口，以确保它们符合特定的契约。 |
|    **泛型**    | TypeScript 支持泛型类，即类可以具有类型参数。这使得类可以更加灵活和可重用，因为可以将其与不同的数据类型一起使用。 |
|   **抽象类**   | 抽象类是一种不能被实例化的类，它包含抽象方法（没有实现的方法）。抽象类通常用作其他类的基类，以确保子类实现特定的方法。 |

### **类构造函数**

在 TypeScript 中，构造函数是一种特殊的方法，用于初始化新创建的对象实例。构造函数**在创建类的实例时自动调用**，并且它的名称与类的名称相同。

构造函数可以接收参数，并且可以使用这些参数来初始化类的属性或执行其他设置任务。它也可以调用父类的构造函数，以实现继承时的初始化。

下面是一个简单的 TypeScript 类的构造函数示例：

```typescript
class Person {  
  // 构造函数  
  constructor(public firstName: string, public lastName: string) {  
    // 在这里可以执行一些初始化操作  
    console.log(`Person created with first name ${this.firstName} and last name ${this.lastName}`);  
  }  
  
  // 其他方法  
  greet() {  
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}`);  
  }  
}  
  
// 创建 Person 类的实例  
const john = new Person("John", "Doe");  
john.greet(); // 输出 "Hello, my name is John Doe"
```

> 在这个例子中，`Person` 类有一个构造函数，它接收两个参数：`firstName` 和 `lastName`。这些参数被标记为 `public`，这意味着它们不仅是构造函数的参数，还是类的公有属性，可以在类的其他方法和实例中直接访问。

构造函数内部可以执行任何必要的初始化代码，例如打印日志、设置默认值、进行验证等。

####  **`super()` 父类构造函数**

如果类是从另一个类继承的，构造函数还可以调用 `super()` 来访问父类的构造函数。这在需要初始化从父类继承的属性或执行父类构造函数中的逻辑时非常有用。

```typescript
class Animal {  
  name: string;  
  
  constructor(name: string) {  
    this.name = name;  
    console.log(`Animal created with name ${this.name}`);  
  }  
}  
  
class Dog extends Animal {  
  breed: string;  
  
  constructor(name: string, breed: string) {  
    super(name); // 调用父类 Animal 的构造函数  
    this.breed = breed;  
    console.log(`Dog created with breed ${this.breed}`);  
  }  
  
  bark() {  
    console.log("Woof!");  
  }  
}  
  
const myDog = new Dog("Buddy", "Labrador");  
myDog.bark(); // 输出 "Woof!"
```

> 在这个例子中，`Dog` 类继承自 `Animal` 类，并在其构造函数中通过 `super(name)` 调用了父类的构造函数。这确保了 `Dog` 实例也正确初始化了从 `Animal` 类继承的 `name` 属性。



### **类访问修饰符**

在 TypeScript 中，类成员（包括属性、方法和访问器）可以通过访问修饰符来指定其可见性。

访问修饰符有三种：`public`、`private` 和 `protected`。这些修饰符决定了成员在类内部、子类以及类实例上的可见性和可访问性。

| 访问修饰符  |                             特点                             |
| :---------: | :----------------------------------------------------------: |
|  `public`   | 成员是公开的，可以在任何地方被访问。如果**不明确指定访问修饰符，则成员默认是 `public` 的**。 |
|  `private`  | 成员是私有的，**只能在声明它的类的内部访问。在类的外部，包括子类，都不能直接访问私有成员**。 |
| `protected` | 成员是受保护的，可以在**声明它的类以及任何子类中访问**。在类的外部，包括其他非子类类型，都不能直接访问受保护的成员。 |

#### `public`

`public` 修饰符表示成员是公开的，可以在任何地方被访问。如果不明确指定访问修饰符，则成员默认是 `public` 的。

```typescript
class MyClass {  
  public myPublicProperty: string;  
  
  public myPublicMethod(): void {  
    // ...  
  }  
}
```

#### `private`

`private` 修饰符表示成员是私有的，只能在声明它的类的内部访问。

```typescript
class MyClass {  
  private myPrivateProperty: string;  
  
  private myPrivateMethod(): void {  
    // ...  
  }  
}  
  
const instance = new MyClass();  
// instance.myPrivateProperty // 错误：'myPrivateProperty' 是私有的。  
// instance.myPrivateMethod()  // 错误：'myPrivateMethod' 是私有的。
```



##### ECMAScript 私有字段

ECMAScript 私有字段（Private Fields）是 ECMAScript 2020（也称为 ES11）中引入的一个新特性，允许在类中定义私有字段。

**语法：**

**ECMAScript 私有字段 使用 `#` 前缀来标记私有字段**。

```js
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}

let semlinker = new Person("Semlinker");

semlinker.#name;
// Property '#name' is not accessible outside class 'Person'
// because it has a private identifier.

```

与常规属性（甚至使用 `private` 修饰符声明的属性）不同，私有字段要牢记以下规则：

- 私有字段以 `#` 字符开头，有时我们称之为私有名称；
- 每个私有字段名称都唯一地限定于其包含的类；
- 不能在私有字段上使用 TypeScript 可访问性修饰符（如 public 或 private）；
- 私有字段不能在包含的类之外访问，甚至不能被检测到。

##### **ECMAScript 私有字段和 TypeScript 的 `private` 修饰符区别**

|                |                ECMAScript私有字段                |             TypeScript的`private`修饰符              |
| :------------: | :----------------------------------------------: | :--------------------------------------------------: |
|  **定义方式**  |                   使用`#`前缀                    |                 使用`private`关键字                  |
|  **语言标准**  |            ECMAScript 2020及更高版本             |                  TypeScript语言特性                  |
|   **兼容性**   |    需要较新的ECMAScript环境，可能需要转译工具    | 适用于TypeScript环境，可以通过转译支持旧版ECMAScript |
|   **封装性**   | 提供了严格的封装，只能通过特定的语法在类内部访问 |            提供了封装性，只能在类内部访问            |
|    **继承**    |          子类无法直接访问父类的私有字段          |            子类无法直接访问父类的私有成员            |
|  **访问控制**  |           只能通过类内部的特定语法访问           |           只能通过类内部的`this`关键字访问           |
|  **类型安全**  |  提供了封装性，但类型检查可能不如TypeScript严格  |       提供了类型安全，可以在编译时进行类型检查       |
|   **可读性**   |         使用`#`前缀使私有字段更易于识别          |       使用`private`关键字使私有成员更易于识别        |
| **语法简洁性** |                  简洁的`#`前缀                   |              需要额外的`private`关键字               |



#### `protected`

`protected` 修饰符表示成员是受保护的，可以在声明它的类以及任何子类中访问，但不能在类的实例上直接访问。

```typescript
class MyClass {  
  protected myProtectedProperty: string;  
  
  protected myProtectedMethod(): void {  
    // ...  
  }  
}  
  
class MySubClass extends MyClass {  
  accessProtected() {  
    this.myProtectedProperty = "accessible";  
    this.myProtectedMethod();  
  }  
}  
  
const instance = new MyClass();  
// instance.myProtectedProperty // 错误：'myProtectedProperty' 是受保护的。  
// instance.myProtectedMethod()  // 错误：'myProtectedMethod' 是受保护的。  
  
const subClassInstance = new MySubClasses();  
subClassInstance.accessProtected(); // 正确，因为是在子类中访问受保护的成员
```

#### 访问修饰符的用途

访问修饰符主要用于封装和隐藏类的实现细节，只允许通过特定的接口或方法进行访问。这有助于保持代码的整洁和可维护性，同时确保类的不变性（immutability）和安全性。

使用 `private` 和 `protected` 修饰符还可以防止外部代码直接访问或修改类的内部状态，这对于实现封装和抽象是非常重要的。

#### 访问修饰符和继承

在继承中，**子类可以访问父类中所有标记为 `public` 和 `protected` 的成员**。但是，子类不能访问父类中标记为 `private` 的成员。这确保了父类的私有实现细节在子类中仍然是私有的。

```typescript
class Parent {  
  private parentPrivate() { /* ... */ }  
  protected parentProtected() { /* ... */ }  
  public parentPublic() { /* ... */ }  
}  
  
class Child extends Parent {  
  // 可以访问 parentPublic()  
  // 可以访问 parentProtected()  
  // 不能访问 parentPrivate()  
}
```



### **类继承**

在 TypeScript 中，类的继承允许你创建一个新的类，该类继承自一个或多个已存在的类（父类或超类）。

通过继承，**子类可以获取父类的所有公有和保护成员（属性和方法）**，**并且可以添加新的成员或重写父类的成员**。

类的继承使用 `extends` 的关键字实现。

下面是一个简单的 TypeScript 类的继承示例：

```typescript
// 父类  
class Animal {  
  name: string;  
  
  constructor(name: string) {  
    this.name = name;  
  }  
  
  // 父类的方法  
  move(): void {  
    console.log(`${this.name} is moving.`);  
  }  
}  
  
// 子类  
class Dog extends Animal {  
  breed: string;  
  
  constructor(name: string, breed: string) {  
    super(name); // 调用父类的构造函数  
    this.breed = breed;  
  }  
  
  // 重写父类的方法  
  move(): void {  
    console.log(`${this.name} of breed ${this.breed} is walking.`);  
  }  
  
  // 子类特有的方法  
  bark(): void {  
    console.log(`${this.name} says, 'Woof!'`);  
  }  
}  
  
// 创建 Dog 类的实例  
const myDog = new Dog("Buddy", "Labrador");  
  
// 调用继承自父类的方法  
myDog.move(); // 输出 "Buddy of breed Labrador is walking."  
  
// 调用子类特有的方法  
myDog.bark(); // 输出 "Buddy says, 'Woof!'"
```

> 在这个例子中，`Dog` 类继承自 `Animal` 类。`Dog` 类有一个新的属性 `breed`，并且它重写了 `move` 方法以提供特定的行为。同时，`Dog` 类还添加了一个新的方法 `bark`。
>
> 使用 `super` 关键字可以在子类的构造函数中调用父类的构造函数。这是必要的，除非父类的构造函数没有参数，因为子类需要正确地初始化从父类继承的属性。

#### **特点**

TypeScript 的继承特点主要体现在以下几个方面：

1. **基于类的继承**：与 JavaScript 的基于原型的继承不同，TypeScript 支持基于类的继承，这是从 ES6 版本开始引入的。通过 **`extends` 关键字**，TypeScript 允许类继承自其他类。
2. **属性和方法的继承**：子类可以继承父类的属性和方法。这意味着在子类中，你可以访问和使用从父类继承来的成员。
3. **重写和修改**：子类不仅可以继承父类的属性和方法，还可以重写或修改它们。这允许子类根据需要定制或扩展父类的行为。
4. **继承的层次结构**：TypeScript 支持多重继承，即**一个类可以继承自多个父类**。然而，需要注意的是，多重继承可能会导致一些复杂性和潜在的冲突，因此需要谨慎使用。
5. **访问修饰符**：在 TypeScript 中，你可以使用 `public`、`private` 和 `protected` 访问修饰符来控制类成员的可见性。这有助于封装类的实现细节，确保只有适当的代码可以访问或修改这些成员。
6. **构造函数的继承**：值得注意的是，**父类的构造函数不能被继承，只能被子类调用**。**如果子类中没有定义构造函数，那么会默认调用父类的构造函数。**

#### **多重继承**

TypeScript 支持多重继承，即一个类可以继承自多个父类。

多重继承允许一个类从多个父类中获取属性和方法，从而实现代码的重用和组合。然而，多重继承也可能引入一些复杂性和潜在的冲突，因此需要谨慎使用。

在 TypeScript 中实现多重继承的语法如下：

```typescript
class BaseClass1 {  
  // 父类1的属性和方法  
}  
  
class BaseClass2 {  
  // 父类2的属性和方法  
}  
  
class DerivedClass extends BaseClass1, BaseClass2 {  
  // 子类可以访问父类1和父类2的属性和方法  
}
```

>  在这个例子中，`DerivedClass` 继承自 `BaseClass1` 和 `BaseClass2`，因此它可以访问这两个父类的所有公共和保护成员。

**多重继承问题**

然而，需要注意的是，多重继承可能会引发一些问题，如钻石问题（Diamond Problem）。钻石问题发生在两个父类都继承自一个共同的基类，并且子类同时继承自这两个父类时。在这种情况下，子类可能会出现两个相同名称但实现不同的方法，这会导致歧义和冲突。

为了解决这个问题，TypeScript 提供了一种称为“线性化”的机制，它会将多重继承转换为一个线性继承链。这个机制确保了子类只会继承每个方法的一个版本，并且这个版本的顺序是确定的。但是，在某些情况下，你可能需要手动解决潜在的冲突，例如通过重写冲突的方法或使用接口来定义共同的行为。

此外，当使用多重继承时，你需要格外注意构造函数的调用。在子类的构造函数中，你需要显式地调用每个父类的构造函数，以确保它们被正确初始化。这可以通过使用 `super` 关键字来实现。



### **类静态成员**

在 TypeScript 中，**类的静态成员是属于类本身而不是类的实例的属性或方法**。静态成员可以在没有创建类的实例的情况下直接通过类来访问。

静态成员包括静态属性（static properties）和静态方法（static methods）。

#### **静态属性**

静态属性使用 `static` 关键字进行定义，它们**只能被类本身访问，而不能被类的实例访问**。

```typescript
class MyClass {  
  static myStaticProperty: string = "Hello, World!";  
  
  instanceProperty: string = "Hello from instance";  
  
  static getStaticProperty() {  
    return MyClass.myStaticProperty;  
  }  
  
  getInstanceProperty() {  
    return this.instanceProperty;  
  }  
}  
  
// 访问静态属性  
console.log(MyClass.myStaticProperty); // 输出: "Hello, World!"  
  
// 尝试通过实例访问静态属性（这是不允许的）  
const instance = new MyClass();  
console.log(instance.myStaticProperty); // 错误: 'myStaticProperty' 是静态的，不能通过实例访问  
  
// 调用静态方法  
console.log(MyClass.getStaticProperty()); // 输出: "Hello, World!"
```

#### **静态方法**

静态方法也是使用 `static` 关键字定义的，它们**只能被类本身调用，而不能被类的实例调用**。

```typescript
class MyClass {  
  static myStaticMethod() {  
    console.log("This is a static method.");  
  }  
  
  instanceMethod() {  
    console.log("This is an instance method.");  
  }  
}  
  
// 调用静态方法  
MyClass.myStaticMethod(); // 输出: "This is a static method."  
  
// 尝试通过实例调用静态方法（这是不允许的）  
const instance = new MyClass();  
instance.myStaticMethod(); // 错误: 'myStaticMethod' 是静态的，不能通过实例调用  
  
// 调用实例方法  
instance.instanceMethod(); // 输出: "This is an instance method."
```

#### **静态成员的应用场景**

1. **工厂方法**：静态方法可以用作工厂函数来创建类的实例，比如常见的单例模式或工具类中的工厂方法。
2. **工具类**：当类仅包含静态方法，且不需要创建实例时，通常将其用作工具类。例如，`Math` 类在 JavaScript 中就是一个工具类，它包含了许多静态方法（如 `Math.max()`, `Math.min()` 等）。
3. **配置和常量**：静态属性常用于存储类的配置信息或常量值，这些值对所有的类实例都是相同的。

#### **注意事项**

- 静态成员**不能通过类的实例来访问**，它们只能通过类本身来访问。
- 静态成员**不能访问类的实例成员**，因为静态成员与类的实例没有关联。
- **静态成员之间可以相互访问**，包括静态属性和静态方法。
- 静态成员**不能访问类的 `this` 关键字**，因为 `this` 关键字在静态上下文中没有定义。



### **访问器**

在 TypeScript 中，访问器（Accessors）是一种特殊的成员，**用于封装和控制对对象属性的访问**。它们包括 getter 和 setter 方法，分别用于读取和设置属性的值。访问器提供了一种在读取或修改属性值时执行自定义逻辑的机制。

访问器允许你执行以下操作：

- 在读取或设置属性值之前和之后执行自定义逻辑。
- 控制对属性值的访问权限，例如实现私有属性，但提供公共的读取和设置方法。
- 在读取或设置属性值时执行计算或验证。

下面是一个简单的 TypeScript 访问器示例：

```typescript
class Person {  
  private _name: string;  
  
  // Getter 方法  
  get name(): string {  
    return this._name;  
  }  
  
  // Setter 方法  
  set name(value: string) {  
    if (typeof value === 'string' && value.length > 0) {  
      this._name = value;  
    } else {  
      console.error('Invalid name');  
    }  
  }  
}  
  
const person = new Person();  
  
// 使用访问器设置属性值  
person.name = 'Alice';  
  
// 使用访问器获取属性值  
console.log(person.name); // 输出: Alice  
  
// 尝试设置无效的属性值  
person.name = ''; // 控制台输出: Invalid name  
console.log(person.name); // 输出: 之前的值，因为设置无效
```

> 在这个例子中，`Person` 类有一个私有属性 `_name`，它通过一个名为 `name` 的访问器进行封装。`name` 属性的 getter 方法返回 `_name` 的值，而 setter 方法在赋值之前检查值是否是一个非空字符串。如果值有效，它将更新 `_name`；如果值无效，则打印一个错误消息并且不更新 `_name`。

需要注意的是，访问器并不总是必需的。在 TypeScript 中，你也可以直接使用公共或私有属性，而不需要封装它们。然而，访问器提供了一种更加灵活和强大的机制，用于在属性值读取和设置时执行额外的逻辑。

### **抽象类**

在 TypeScript 中，抽象类（Abstract Class）是一种不能被实例化的类，它通常用作其他类的基类，并为这些类提供一个公共的接口。

抽象类可以包含抽象方法（没有实现的方法）和非抽象方法（有具体实现的方法）。子类继承抽象类时，必须实现抽象类中的所有抽象方法。

抽象类的主要用途是定义一个公共的接口，这个接口由所有子类共享。通过抽象类，你可以确保所有子类都遵循相同的结构，并且具有特定的行为。此外，抽象类还可以包含一些通用的非抽象方法，这些方法可以在所有子类中共享。

下面是一个 TypeScript 抽象类的例子：

```typescript
// 定义一个抽象类  
abstract class Animal {  
  // 抽象方法，必须在子类中实现  
  abstract makeSound(): void;  
  
  // 非抽象方法，可以直接在抽象类中定义  
  move(): void {  
    console.log("The animal moves.");  
  }  
}  
  
// 定义一个类，继承自 Animal 抽象类  
class Dog extends Animal {  
  // 实现 Animal 抽象类中的 makeSound 方法  
  makeSound(): void {  
    console.log("The dog barks.");  
  }  
}  
  
// 定义一个类，继承自 Animal 抽象类  
class Cat extends Animal {  
  // 实现 Animal 抽象类中的 makeSound 方法  
  makeSound(): void {  
    console.log("The cat meows.");  
  }  
}  
  
// 创建 Dog 类的实例  
const dog = new Dog();  
dog.makeSound(); // 输出: The dog barks.  
dog.move(); // 输出: The animal moves.  
  
// 创建 Cat 类的实例  
const cat = new Cat();  
cat.makeSound(); // 输出: The cat meows.  
cat.move(); // 输出: The animal moves.
```

>  在这个例子中，`Animal` 是一个抽象类，它有一个抽象方法 `makeSound` 和一个非抽象方法 `move`。`Dog` 和 `Cat` 类都继承自 `Animal` 抽象类，并且实现了 `makeSound` 方法。因此，它们可以被实例化，并且可以调用 `makeSound` 和 `move` 方法。



## **接口**

在 TypeScript 中，接口（Interfaces）是一种定义对象结构的方式，它允许你为对象定义一组必须遵循的属性（properties）和方法（methods）。**接口可以用来描述对象应有的形状（shape），而不关注具体的实现**。这使得代码更加模块化，同时也提供了类型安全的保证。

接口在 TypeScript 中是非常灵活的，可以用来描述对象、函数和类的结构。

### **使用**

接口定义如下：

```ts
interface interface_name {
}
```

例如有一个函数，这个函数接受一个 `User` 对象，然后返回这个 `User` 对象的 `name` 属性:

```ts
const getUserName = (user) => user.name
```

可以看到，参数需要有一个`user`的`name`属性，可以通过接口描述`user`参数的结构

```ts
interface User {
    name: string
    age: number
}

const getUserName = (user: User) => user.name
```

这些属性并不一定全部实现，上述传入的对象必须拥有`name`和`age`属性，否则`typescript`在编译阶段会报错

### **分类**

#### **对象类型接口**

```typescript
interface Person {  
  firstName: string;  
  lastName: string;  
  age?: number; // 可选属性  
  greet(): void; // 必须存在的方法  
}  
  
const john: Person = {  
  firstName: "John",  
  lastName: "Doe",  
  greet: function() {  
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);  
  }  
};  
  
john.greet(); // 输出: Hello, my name is John Doe.
```

#### **函数类型接口**

函数类型接口允许你明确地定义函数的形状，包括它的参数类型、返回值类型以及可能的可选参数或剩余参数。

```typescript
interface SearchFunc {  
  (text: string, callback: (results: string[]) => void): void;  
}  
  
const search: SearchFunc = function(text, callback) {  
  // 模拟搜索操作  
  const results = ["Result 1", "Result 2", "Result 3"];  
  callback(results);  
};  
  
search("TypeScript", (results) => {  
  console.log(results); // 输出搜索结果  
});
```

也可以在接口中定义可选参数：

```typescript
// 定义一个函数接口，接受一个可选的字符串参数，并返回一个字符串  
interface OptionalGreetingFunction {  
  (name?: string): string;  
}  
  
// 实现该接口的函数，这次可以接受一个参数，也可以不接受  
const optionalGreet: OptionalGreetingFunction = function(name?: string) {  
  if (name) {  
    return `Hello, ${name}!`;  
  } else {  
    return "Hello!";  
  }  
};  
  
// 使用这个函数，不带参数  
const messageWithNoName = optionalGreet();  
console.log(messageWithNoName); // 输出: Hello!  
  
// 使用这个函数，带参数  
const messageWithName = optionalGreet("Alice");  
console.log(messageWithName); // 输出: Hello, Alice!
```

此外，你还可以定义剩余参数：

```typescript
// 定义一个函数接口，接受任意数量的字符串参数，并返回一个字符串  
interface GreetManyFunction {  
  (...names: string[]): string;  
}  
  
// 实现该接口的函数，可以接受任意数量的参数  
const greetMany: GreetManyFunction = function(...names: string[]) {  
  return names.map(name => `Hello, ${name}!`).join(", ");  
};  
  
// 使用这个函数  
const messageForMany = greetMany("Bob", "Alice", "Charlie");  
console.log(messageForMany); // 输出: Hello, Bob! Hello, Alice! Hello, Charlie!
```

#### **类类型接口**

```typescript
interface ClockInterface {  
  currentTime: Date;  
  setTime(d: Date): void;  
}  
  
class Clock implements ClockInterface {  
  currentTime: Date;  
  
  constructor(h: number, m: number) {  
    this.currentTime = new Date();  
    this.currentTime.setHours(h);  
    this.currentTime.setMinutes(m);  
  }  
  
  setTime(d: Date) {  
    this.currentTime = d;  
  }  
}  
  
const clock = new Clock(12, 0);  
console.log(clock.currentTime); // 输出当前时间  
clock.setTime(new Date()); // 设置新时间
```

#### **只读接口**

使用只读接口（Read-Only Interfaces）来定义那些属性只能被读取而不能被修改的对象。只读接口通过在属性的前面加上 `readonly` 关键字来实现。这有助于确保对象在被传递给其他函数或组件时，其属性不会被意外地修改。

只读属性用于限制只能**在对象刚刚创建的时候修改其值**。

```typescript
interface Point {  
  readonly x: number;  
  readonly y: number;  
}  
  
const p1: Point = { x: 10, y: 20 };  
// p1.x = 5; // 错误：x 是只读的
```

请注意，只读接口并不会阻止你在对象被创建之后重新分配整个对象。例如，虽然你不能修改 `person` 对象的属性，但你仍然可以将 `person` 变量指向一个新的对象：

```typescript
// 重新分配变量指向一个新的对象  
person = {  
  firstName: "Jane",  
  lastName: "Doe",  
  age: 31  
};  
  
// 现在可以访问新对象的属性  
console.log(person.firstName); // 输出: Jane
```

>  在这个例子中，我们创建了一个新的对象并将其赋值给 `person` 变量。虽然原始的 `person` 对象保持不变，但 `person` 变量现在引用了一个新的对象，这个新对象可以被自由地修改。

#### **索引接口**

索引接口（Index Signature）允许你定义对象的形状，其中对象的属性名是字符串或数字，并且这些属性的值具有相同的类型。索引接口在定义对象结构时特别有用，特别是当你需要处理那些具有动态属性名的对象时。

```typescript
interface StringArray {  
  [index: number]: string;  
}  
  
let myArray: StringArray;  
myArray = ["Bob", "Fred"];
```

#### **泛型接口**

在 TypeScript 中，泛型接口（Generic Interfaces）允许你定义可重用的接口，这些接口可以适用于多种不同的类型。

泛型接口通过类型参数（type parameters）来实现这一功能，类型参数是在定义接口时声明的，并在实现或使用该接口时提供具体的类型。

```typescript
// 定义一个泛型接口，接受一个类型参数 T  
interface GenericIdentityFn<T> {  
  (arg: T): T;  
}  
  
// 实现该泛型接口，指定 T 为 number 类型  
const identityNumber: GenericIdentityFn<number> = (arg) => arg;  
  
// 使用该实现，传入和返回 number 类型  
const resultNumber = identityNumber(42); // 类型是 number  
console.log(resultNumber); // 输出: 42  
  
// 实现该泛型接口，指定 T 为 string 类型  
const identityString: GenericIdentityFn<string> = (arg) => arg;  
  
// 使用该实现，传入和返回 string 类型  
const resultString = identityString("hello"); // 类型是 string  
console.log(resultString); // 输出: hello
```

> 在这个例子中，`GenericIdentityFn` 是一个泛型接口，它接受一个类型参数 `T`。这意味着当你实现这个接口时，你可以为 `T` 提供任何你想要的类型（比如 `number`、`string`、`boolean` 等），并且接口中的 `arg` 参数和返回值都将是这个指定的类型。

泛型接口提供了一种创建可重用组件的方式，这些组件可以在多种不同的类型上下文中使用。通过使用泛型接口，你可以编写更加灵活和可维护的代码。

除了函数类型，你也可以为对象类型定义泛型接口：

```typescript
// 定义一个泛型接口，表示一个对象，其属性名是 string，属性值是类型 T  
interface GenericObject<T> {  
  [key: string]: T;  
}  
  
// 创建一个符合该泛型接口的对象，指定 T 为 number 类型  
const numbers: GenericObject<number> = {  
  a: 1,  
  b: 2,  
  c: 3  
};  
  
// 访问对象的属性，类型都是 number  
console.log(numbers.a); // 输出: 1  
console.log(numbers.b); // 输出: 2  
  
// 创建一个符合该泛型接口的对象，指定 T 为 string 类型  
const strings: GenericObject<string> = {  
  x: "hello",  
  y: "world"  
};  
  
// 访问对象的属性，类型都是 string  
console.log(strings.x); // 输出: hello  
console.log(strings.y); // 输出: world
```

在这个例子中，`GenericObject` 是一个泛型接口，它定义了一个对象的形状，该对象的所有属性值都是相同的类型 `T`。通过使用泛型接口，你可以创建适应不同数据类型的灵活对象结构。





## **泛型**

TypeScript 中的泛型（Generics）是一种编写灵活、可重用组件的方式，它允许你在定义函数、接口或类的时候，**不预先指定具体的类型，而在使用的时候再为其指定类型**。

泛型提供了一种创建可适应多种数据类型的组件的方法，同时保持类型安全。

泛型的主要概念是使用类型参数，这些类型参数在定义时像普通的变量一样声明，但在使用时会被实际的类型（如 `number`、`string`、自定义类等）所替代。一般使用大写字母 A-Z 定义的类型变量都属于泛型，把 T 换成 A，也是一样的。一些常见泛型变量代表的意思：

- T（Type）：表示一个 TypeScript 类型
- K（Key）：表示对象中的键类型
- V（Value）：表示对象中的值类型
- E（Element）：表示元素类型

### **使用**

假设我们用一个函数，它可接受一个 `number` 参数并返回一个`number` 参数，如下写法：

```ts
function returnItem (para: number): number {
    return para
}
```

如果我们打算接受一个 `string` 类型，然后再返回 `string`类型，则如下写法：

```ts
function returnItem (para: string): string {
    return para
}
```

上述两种编写方式，存在一个最明显的问题在于，代码重复度比较高

虽然可以使用 `any`类型去替代，但这也并不是很好的方案，因为我们的目的是接收什么类型的参数返回什么类型的参数，即在运行时传入参数我们才能确定类型

这种情况就可以使用泛型，如下所示：

```ts
function returnItem<T>(para: T): T {
    return para
}
```

可以看到，泛型给予开发者创造灵活、可重用代码的能力。

在编写 `typescript` 的时候，定义函数，接口或者类的时候，**不预先定义好具体的类型，而在使用的时候在指定类型的一种特性的时候，这种情况下就可以使用泛型**。

### **分类**

泛型通过`<>`的形式进行表述，可以声明：

- 函数
- 接口
- 类

下面是一些使用 TypeScript 泛型的例子：

#### **泛型函数**

```typescript
function identity<T>(arg: T): T {  
  return arg;  
}  
  
const numberIdentity = identity<number>(123); //将泛型T转为 number 类型  
console.log(numberIdentity); // 输出: 123  
  
const stringIdentity = identity<string>('hello'); // 将泛型T转为 string 类型  
console.log(stringIdentity); // 输出: hello
```

#### **泛型接口**

```typescript
interface GenericIdentityFn<T> {  
  (arg: T): T;  
}  
  
const myIdentity: GenericIdentityFn<number> = (arg) => arg;  
console.log(myIdentity(123)); // 输出: 123
```

#### **泛型类**

```typescript
class GenericNumber<T> {  
  zeroValue: T;  
  add: (x: T, y: T) => T;  
}  
  
const myGenericNumber = new GenericNumber<number>();  
myGenericNumber.zeroValue = 0;  
myGenericNumber.add = (x, y) => x + y;  
  
console.log(myGenericNumber.add(myGenericNumber.zeroValue, 1)); // 输出: 1
```

#### **泛型约束**

你还可以使用泛型约束来限制泛型类型必须满足某些条件（比如继承自某个类或实现某个接口）：

```typescript
interface Lengthwise {  
  length: number;  
}  
  
function loggingIdentity<T extends Lengthwise>(arg: T): T {  
  console.log(arg.length); // 这里可以安全地访问 "length" 属性，因为 T 被约束为 Lengthwise  
  return arg;  
}
```

### **泛型工具类型**

在 TypeScript 中，泛型工具类型（Utility Types）是一种内置的类型工具，它们用于在泛型编程中执行常见的类型操作，如提取类型、映射类型、条件类型等。这些工具类型在编写泛型函数、接口和类时非常有用，可以帮助你创建更加灵活和可重用的代码。

以下是一些常用的 TypeScript 泛型工具类型：

1. **`Partial<T>`**
   将对象类型 `T` 的所有属性变为可选。

   ```typescript
   type PartialType = Partial<{ a: number; b: string }>;  
   // 等价于  
   // type PartialType = { a?: number; b?: string };
   ```

2. **`Required<T>`**
   将对象类型 `T` 的所有属性变为必需。

   ```typescript
   type RequiredType = Required<{ a?: number; b?: string }>;  
   // 等价于  
   // type RequiredType = { a: number; b: string };
   ```

3. **`Readonly<T>`**
   将对象类型 `T` 的所有属性设置为只读。

   ```typescript
   type ReadonlyType = Readonly<{ a: number; b: string }>;  
   // 等价于  
   // type ReadonlyType = { readonly a: number; readonly b: string };
   ```

4. **`Record<K extends keyof any, T>`**
   构造一个类型，其属性是键为 `K` 类型，值为 `T` 类型的对象。

   ```typescript
   type RecordType = Record<'a' | 'b', number>;  
   // 等价于  
   // type RecordType = { a: number; b: number };
   ```

5. **`Pick<T, K extends keyof T>`**
   从类型 `T` 中挑选出属性键为 `K` 的属性。

   ```typescript
   type PickType = Pick<{ a: number; b: string; c: boolean }, 'a' | 'c'>;  
   // 等价于  
   // type PickType = { a: number; c: boolean };
   ```

6. **`Omit<T, K extends keyof T>`**
   构造一个类型，该类型是从类型 `T` 中去除了属性键为 `K` 的属性后的剩余属性组成的。

   ```typescript
   type OmitType = Omit<{ a: number; b: string; c: boolean }, 'b' | 'c'>;  
   // 等价于  
   // type OmitType = { a: number };
   ```

7. **`Exclude<T, U>`**
   从类型 `T` 中排除掉可以赋值给类型 `U` 的所有属性。

   ```typescript
   type ExcludeType = Exclude<'a' | 'b' | 'c', 'b' | 'd'>;  
   // 等价于  
   // type ExcludeType = 'a' | 'c';
   ```

8. **`Extract<T, U>`**
   提取类型 `T` 中可以赋值给类型 `U` 的所有属性。

   ```typescript
   type ExtractType = Extract<'a' | 'b' | 'c', 'b' | 'd'>;  
   // 等价于  
   // type ExtractType = 'b' | 'd';
   ```

9. **`NonNullable<T>`**
   排除 `null` 和 `undefined` 从类型 `T` 中。

   ```typescript
   type NonNullableType = NonNullable<string | null | undefined>;  
   // 等价于  
   // type NonNullableType = string;
   ```

10. **`ReturnType<T extends (...args: any) => any>`**
    获取函数类型 `T` 的返回类型。

    ```typescript
    type ReturnTypeExample = ReturnType<() => string>;  
    // 等价于  
    // type ReturnTypeExample = string;
    ```

11. **`InstanceType<T extends new (...args: any) => any>`**
    获取构造函数类型 `T` 的实例类型。

    ```typescript
    class MyClass {  
      x: number;  
    }  
     
    type InstanceTypeExample = InstanceType<typeof MyClass>;  
    // 等价于  
    // type InstanceTypeExample = MyClass;
    ```

这些泛型工具类型可以组合使用，以创建更复杂的类型。使用这些工具类型可以帮助你更加灵活地操作类型，提高代码的可重用性和类型安全性。



## **装饰器**

TypeScript 装饰器（Decorators）是一种特殊类型的声明，它可以被附加到类声明、方法、属性或参数上。

是一种在不改变原类和使用继承的情况下，动态地扩展对象功能。

装饰器使用 `@expression` 这样的形式，其中 **`expression` 必须计算为一个函数**，**该函数将在运行时被调用**。

装饰器为我们在类的生命周期的各个阶段提供了钩子，允许我们在不修改类代码的情况下增强类的行为。

在 TypeScript 中，装饰器是一种实验性的特性，但在 Angular 等框架中得到了广泛的应用。

下面是一个简单的装饰器示例，它记录了一个类实例被创建的时间：

```typescript
function logCreation(target: Function) {  
  console.log(`${target.name} was created.`);  
}  
  
@logCreation  
class MyClass {  
  constructor() {  
    // 类的构造函数  
  }  
}  
  
new MyClass(); // 输出: "MyClass was created."
```

> 在上面的例子中，`logCreation` 是一个装饰器函数，它接受一个参数 `target`，这个参数是类构造函数。当 `MyClass` 被装饰时，`logCreation` 函数会在类被实例化之前被调用，并打印出一条消息。

装饰器可以有多个参数，这些参数基于它们出现的顺序，分别代表类、属性、方法或参数的构造函数、属性描述符、方法描述符或参数描述符。

装饰器也可以用于属性和方法，以修改或增强它们的行为：

```typescript
function sealed(target: Object, propertyName: string, descriptor: PropertyDescriptor) {  
  Object.seal(target);  
  Object.seal(descriptor.value);  
}  
  
class Greeter {  
  greeting: string;  
  
  @sealed  
  greet() {  
    return "Hello, world!";  
  }  
}  
  
const greeter = new Greeter();  
  
// 下面的代码将会失败，因为类已经被 seal 了  
// Object.defineProperty(greeter, 'greeting', {  
//   value: 'Hi there!'  
// });  
  
// 下面的代码也会失败，因为方法已经被 seal 了  
// greeter.greet = function() {  
//   return 'Hi there!';  
// };
```

> 在上面的例子中，`sealed` 装饰器将目标对象和方法的描述符都进行了密封（seal），这意味着它们的属性或方法都不能再被修改。

请注意，虽然装饰器在 TypeScript 中得到了很好的支持，但它们并不是 TypeScript 核心语言的一部分，而是作为一个提案存在于 ECMAScript 标准中。在 TypeScript 中使用装饰器时，需要在 `tsconfig.json` 文件中设置 `"experimentalDecorators": true` 选项来启用装饰器支持。



### **本质**

TypeScript装饰器在本质上就是一个普通的函数，而`@expression`这种装饰器的语法只是提供了一种更简洁、更直观的方式来应用这些函数，类似于JavaScript中的`Object.defineProperty`方法，但实际上是TypeScript编译器在编译时将这些装饰器函数应用到目标对象上的一种机制。

### **作用**

装饰器主要用途是在不修改原始函数或类的情况下，增加额外的功能或行为。这样做的好处有很多，以下是一些主要的原因：

1. **代码复用**：装饰器允许我们复用代码，避免了在每个需要添加额外行为的函数或类中都重复相同的代码。
2. **代码可读性**：通过使用装饰器，我们可以将复杂的功能逻辑从主函数或类中分离出来，使得代码更加简洁和易于理解。
3. **动态性**：装饰器可以在运行时动态地改变函数或类的行为，这使得我们可以更加灵活地处理不同的场景和需求。
4. **封装性**：装饰器提供了一种封装函数或类的方式，使得我们可以在不修改原始代码的情况下，对它们进行扩展或修改。
5. **符合开闭原则**：在面向对象编程中，开闭原则是一种重要的设计原则，它要求软件实体（类、模块、函数等）应当是可扩展的，而不可修改的。装饰器正是符合这一原则的一种实现方式，它可以在不修改原始函数或类的情况下，通过添加新的装饰器来增加新的功能。

### **配置**

由于`typescript`是一个实验性特性，若要使用，需要在`tsconfig.json`文件启动，如下：

```ts
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```

### **分类**

|  装饰器类型  |                           特点                            |                           举例说明                           |
| :----------: | :-------------------------------------------------------: | :----------------------------------------------------------: |
|   类装饰器   |             应用于类声明上，用于修改类的行为              |    可以在类实例化之前或之后执行代码，也可以修改类的原型链    |
|  方法装饰器  |           应用于类的方法上，用于修改方法的行为            |   可以在方法执行之前或之后执行代码，也可以修改方法的返回值   |
|  属性装饰器  |           应用于类的属性上，用于修改属性的行为            |  可以在属性读取或写入之前或之后执行代码，也可以修改属性的值  |
|  参数装饰器  |          应用于方法的参数上，用于修改参数的行为           |      可以在参数传入方法之前执行代码，也可以修改参数的值      |
| 访问器装饰器 | 应用于类的访问器（getter/setter）上，用于修改访问器的行为 | 可以在访问器读取或写入属性之前或之后执行代码，也可以修改访问器的返回值或参数 |

#### 类装饰器

例如声明一个函数 `addAge` 去给 Class 的属性 `age` 添加年龄.

```ts
function addAge(constructor: Function) {
  constructor.prototype.age = 18;
}

@addAge
class Person{
  name: string;
  age!: number;
  constructor() {
    this.name = 'huihui';
  }
}

let person = new Person();

console.log(person.age); // 18
```

上述代码，实际等同于以下形式：

```ts
Person = addAge(function Person() { ... });
```

上述可以看到，当装饰器作为修饰类的时候，会把构造器传递进去。 `constructor.prototype.age` 就是在每一个实例化对象上面添加一个 `age` 属性。

#### 方法装饰器

装饰器可以用于修饰类的方法，这时候装饰器函数接收的参数变成了：

- target：对象的原型
- propertyKey：方法的名称
- descriptor：方法的属性描述符

这三个属性实际就是`Object.defineProperty`的三个参数，如果是类的属性，则没有传递第三个参数。

```typescript
function logMethodCall(target: any, propertyName: string, descriptor: PropertyDescriptor) {  
  const originalMethod = descriptor.value;  
  descriptor.value = function(...args: any[]) {  
    console.log(`Calling ${propertyName} with args: ${args}`);  
    return originalMethod.apply(this, args);  
  };  
  return descriptor;  
}  
  
class MyClass {  
  @logMethodCall  
  myMethod() {  
    // ...  
  }  
}  
  
const instance = new MyClass();  
instance.myMethod(); // 输出: "Calling myMethod with args: []"
```

#### 属性装饰器

```typescript
function readonly(target: any, propertyName: string) {  
  Object.defineProperty(target, propertyName, {  
    writable: false,  
    enumerable: true,  
    configurable: true,  
    value: target[propertyName]  
  });  
}  
  
class MyClass {  
  @readonly  
  myProperty = "This is a read-only property";  
}  
  
const instance = new MyClass();  
instance.myProperty = "Attempt to modify"; // 不会成功，因为属性是只读的
```

#### 参数装饰器

接收3个参数，分别是：

- target ：当前对象的原型
- propertyKey ：参数的名称
- index：参数数组中的位置

```typescript
function validateParam(target: any, propertyName: string, index: number) {  
  const params = Reflect.getMetadata('parameters', target, propertyName);  
  if (!params[index]) {  
    params[index] = {};  
  }  
  params[index].validator = (value: any) => {  
    if (typeof value !== 'string') {  
      throw new Error('Expected a string');  
    }  
  };  
}  
  
class MyClass {  
  myMethod(@validateParam arg: string) {  
    // ...  
  }  
}  
  
const instance = new MyClass();  
instance.myMethod(123); // 抛出错误: "Expected a string"
```

#### 访问器装饰器

使用起来方式与方法装饰一致。

```typescript
function logAccess(target: any, propertyName: string) {  
  const originalGetter = target.__lookupGetter__(propertyName);  
  target.__defineGetter__(propertyName, function() {  
    console.log(`Reading ${propertyName}`);  
    return originalGetter.call(this);  
  });  
}  
  
class MyClass {  
  private _secretValue: string;  
  
  @logAccess  
  get secretValue() {  
    return this._secretValue;  
  }  
  
  set secretValue(value: string) {  
    this._secretValue = value;  
  }  
}  
  
const instance = new MyClass();  
console.log(instance.secretValue); // 输出: "Reading secretValue" 和实际的 secretValue 值
```

#### **装饰器工厂**

如果想要传递参数，使装饰器变成类似工厂函数，只需要在装饰器函数内部再函数一个函数即可，如下：

```ts
function addAge(age: number) {
  // 装饰器函数内部返回一个函数
  return function(constructor: Function) {
    constructor.prototype.age = age
  }
}

@addAge(10)
class Person{
  name: string;
  age!: number;
  constructor() {
    this.name = 'huihui';
  }
}

let person = new Person();
```



#### 执行顺序

当多个装饰器应用于一个声明上，将由上至下依次对装饰器表达式求值，求值的结果会被当作函数，由下至上依次调用，例如如下：

```ts
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// 按照顺序从上到下调用装饰器，对装饰器表达式求值，然后结果被当作函数，由下至上依次调用
// f(): evaluated 
// g(): evaluated
// g(): called
// f(): called
```





## **命名空间**

在 TypeScript 中，命名空间（Namespaces）是一种将相关的代码组合到一起的方式，这样可以避免命名冲突并提供更好的代码组织。命名空间类似于其他编程语言中的包（Packages）或模块（Modules）。

在 TypeScript 中，你可以使用 `namespace` 关键字来定义一个命名空间。命名空间可以包含类、接口、函数、变量等。

以下是一个简单的 TypeScript 命名空间的例子：

```typescript
// 定义一个名为 'MyNamespace' 的命名空间  
namespace MyNamespace {  
    // 在命名空间中定义一个类  
    class MyClass {  
        greeting: string;  
  
        constructor(message: string) {  
            this.greeting = message;  
        }  
  
        sayHello() {  
            return "Hello, " + this.greeting;  
        }  
    }  
  
    // 在命名空间中定义一个函数  
    function myFunction(x: number, y: number): number {  
        return x + y;  
    }  
  
    // 在命名空间中定义一个变量  
    const myConstant = 10;  
}  
  
// 使用命名空间中的类  
const myInstance = new MyNamespace.MyClass("World");  
console.log(myInstance.sayHello()); // 输出: "Hello, World"  
  
// 使用命名空间中的函数  
const sum = MyNamespace.myFunction(5, 3);  
console.log(sum); // 输出: 8  
  
// 访问命名空间中的变量  
console.log(MyNamespace.myConstant); // 输出: 10
```

> 在上面的例子中，我们创建了一个名为 `MyNamespace` 的命名空间，并在其中定义了一个类 `MyClass`、一个函数 `myFunction` 和一个常量 `myConstant`。然后，我们可以通过 `MyNamespace.` 前缀来访问这些成员。

命名空间的一个主要优势是它们可以帮助我们组织代码，特别是在大型项目中，可能会有许多不同的代码片段需要管理。通过将相关的代码放入命名空间，我们可以避免命名冲突，并使代码更易于维护和理解。

另外，TypeScript 的模块系统（使用 `import` 和 `export`）与命名空间是互补的。在实际开发中，通常推荐使用模块来组织代码，因为模块提供了更好的封装和代码重用机制。然而，在某些场景下，如库或框架的开发中，命名空间可能仍然是一个有用的工具。



## **模块**

在 TypeScript 中，模块（Modules）是一种将代码分割成独立部分的方式，这些部分可以单独编写、测试和维护，并且可以被其他代码重复使用。模块允许开发者封装代码，隐藏实现细节，并提供清晰的接口供外部使用。TypeScript 的模块系统基于 ECMAScript 模块（ESM），与 CommonJS、AMD 和其他模块系统兼容。

### 基本用法

在 TypeScript 中，可以使用 `import` 和 `export` 关键字来定义和使用模块。

**定义模块**

首先，你可以创建一个 `.ts` 文件来定义你的模块。例如，创建一个名为 `mathFunctions.ts` 的文件：

```typescript
// mathFunctions.ts  
  
export function add(a: number, b: number): number {  
    return a + b;  
}  
  
export function subtract(a: number, b: number): number {  
    return a - b;  
}
```

在这个文件中，我们定义了两个函数 `add` 和 `subtract`，并使用 `export` 关键字将它们导出，这样其他模块就可以导入并使用它们了。

**使用模块**

然后，在另一个 `.ts` 文件中，你可以使用 `import` 关键字来导入并使用这些函数：

```typescript
// main.ts  
  
import { add, subtract } from './mathFunctions';  
  
const result = add(5, 3);  
console.log(result); // 输出: 8  
  
const difference = subtract(5, 3);  
console.log(difference); // 输出: 2
```

在这个例子中，`main.ts` 文件导入了 `mathFunctions.ts` 中导出的 `add` 和 `subtract` 函数，并使用它们进行计算。

### 模块类型

TypeScript 支持多种模块类型，包括：

- **CommonJS**：这是 Node.js 使用的模块系统。使用 `module.exports` 或 `exports` 导出模块成员，使用 `require` 导入模块。
- **AMD**：Asynchronous Module Definition，用于浏览器端的异步模块加载。
- **UMD**：Universal Module Definition，是一种兼容 CommonJS 和 AMD 的模块定义方式。
- **ES6/ESM (ECMAScript Modules)**：这是最新的模块标准，使用 `export` 和 `import` 关键字。

### 编译模块

当你使用 TypeScript 编写模块时，需要确保 TypeScript 编译器（tsc）正确配置以处理模块。你可以在 `tsconfig.json` 文件中设置 `"module"` 选项来指定使用哪种模块系统。例如，对于使用 ES6 模块的项目，你可以这样配置：

```json
{  
    "compilerOptions": {  
        "module": "es6",  
        "target": "es5",  
        // 其他编译选项...  
    },  
    // 其他配置...  
}
```

这样配置后，当你运行 TypeScript 编译器时，它会将你的模块代码转换为相应模块系统的代码。

### 模块和命名空间

在 TypeScript 中，模块和命名空间是两个不同的概念。模块是一种代码组织和封装的机制，而命名空间则是一种避免命名冲突的方式。不过，你可以在一个模块中定义一个命名空间，这样可以在模块内部使用命名空间来组织代码，同时保持模块外部的清晰接口。

|    对比项    |                       TypeScript 模块                        |                     TypeScript 命名空间                      |
| :----------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   **定义**   | 模块是 TypeScript 中的一个代码单元，可以包含类、接口、函数等。 |  命名空间是一种将相关的代码组织在一起的方式，避免命名冲突。  |
|   **语法**   |  使用 `import` 和 `export` 关键字来导入和导出模块中的成员。  |           使用 `namespace` 关键字来定义命名空间。            |
|   **范围**   |        模块的范围是全局的，可以在任何地方导入和使用。        |        命名空间的作用范围限定在其定义的文件或项目中。        |
|  **作用域**  |     模块成员在导入时具有局部作用域，不会污染全局作用域。     | 命名空间中的成员具有全局作用域，但可以通过命名空间名称来访问。 |
| **代码重用** | 模块可以轻松地重用和共享代码，特别适合大型项目中的代码拆分和组织。 | 命名空间适合在单个文件或项目中组织相关的代码，但不适合跨文件或项目共享。 |
| **类型冲突** |         模块可以导出类型，并通过导入来避免类型冲突。         | 命名空间可以避免命名冲突，但类型冲突仍然可能发生，尤其是在跨文件或项目使用时。 |
|  **兼容性**  | 模块与 ECMAScript 模块规范兼容，可以与其他 JavaScript 或 TypeScript 项目无缝集成。 | 命名空间是 TypeScript 特有的功能，可能与其他 JavaScript 项目不完全兼容。 |
| **推荐用法** |   对于大型项目或需要跨文件或项目共享的代码，推荐使用模块。   |    对于单个文件或项目中的相关代码组织，推荐使用命名空间。    |

总结：TypeScript 模块和命名空间各有其优缺点，选择使用哪种方式取决于具体的需求和场景。在大型项目中，**模块通常更适合用于代码拆分和组织，而命名空间则更适合在单个文件或项目中组织相关的代码**。
