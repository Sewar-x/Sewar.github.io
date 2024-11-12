---
star: true
order: 4
category:
  - 组件
tag:
  - JSON配置化组件
---
# JSON配置化组件

JSON 配置化组件是对 [element-plus](https://element-plus.org/zh-CN/) 组件的二次封装，通过二次封装 elementPlus 组件后，可以通过 JSON 配置生成 elements 组件

## **设计思路**

![JSON组件](../images/JSON组件.png)

一个业务组件，是对基础组件的二次封装，可以将业务组件拆分为以下几个部分：

* 视图组件 JSON 对象：描述视图有哪些组件组成的 JSON 对象；
* 业务逻辑 JSON 对象：描述组件的逻辑，包括组件事件描述，组件对象描述；
* 服务端数据 JSON 对象： 渲染组件数据内容，通过数据动态渲染组件内容；

业务逻辑组件通过对以上 JSON 对象处理，生成 业务组件 JSON，然后通过业务 JSON 对象传递给 elements 组件，elements 组件中底层使用 elements 组件和 component 标签 组件解析 JSON 对象，生成最终的业务组件 。

## 组件介绍



### BasicComponent

- 组件——`components/BasicComponent/src/BasicForm.vue`

- 组件类型文件——`types/global.d.ts-CompType`

- 特性

  1. 通用性强，可设置`comp`对象属性`component`的值为原生HTML元素或Element-plus的字符串形式和自定义组件来渲染
  2. 采用了递归的方法，可以依据渲染数据对象进行循环渲染

- 参数`json`格式

  ```json
  <elementOption> = {
    comp: "", // 渲染组件名（字符串形式）或组件
    data: "", // 绑定的响应式数据
    key: "", // 绑定的响应式数据对象的属性名
    attr: {}, // 渲染组件的属性
    event: {}, // 渲染组件的事件
    ref: ref(), // 渲染组件的实例对象
    content: {  // 渲染组件的文本内容
      text: "",
      key: ""
      attr: {},
      event: {},
      ref: ref(),
    }, 
    children: [
      {
        comp: "",
        data: "",
        attr: "",
        event: "",
        ref: ref()
        content: "",
        children: "",
      }
    ], // 渲染组件的子组件
    type: "component", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  
  // 注：content属性和children属性只会渲染其中一个，优先children
  ```

- 参数说明

  1. `CompType`

     |  属性名  |                             说明                             |         类型          | 默认值 |
     | :------: | :----------------------------------------------------------: | :-------------------: | :----: |
     |   comp   |                          渲染的组件                          |  String \| Component  |   -    |
     |   data   | 绑定的响应式数据，当响应数据为对象时，必须以`reactive`创建响应式对象，且必须搭配`key`作为响应的对象属性名 |          any          |   -    |
     |   key    |                 绑定的响应式数据对象的属性名                 |        String         |        |
     |   attr   |                        渲染组件的属性                        | `Record<String, any>` |   -    |
     |  event   |                        渲染组件的事件                        | `Record<String, any>` |   -    |
     | content  |                      渲染组件的文本内容                      |    CompContentType    |   -    |
     | children |                       渲染组件的子组件                       |   `Array<CompType>`   |   -    |
     |   ref    |                      渲染组件的实例对象                      |       `Ref<T>`        |   -    |
  
  2. `CompContentType`
  
     | 属性名 |             说明             |         类型          | 默认值 |
     | :----: | :--------------------------: | :-------------------: | :----: |
     |  text  |        渲染组件的文本        |          any          |   -    |
     |  key   | 绑定的响应式数据对象的属性名 |        string         |   -    |
     |  attr  |      渲染组件文本的属性      | `Record<String, any>` |   -    |
     | event  |      渲染组件文本的事件      | `Record<String, any>` |   -    |
     |  ref   |    渲染组件文本的实例对象    |       `Ref<T>`        |   -    |



代码实现:

```vue
<template>
  <component
    :is="compName"
    v-model="value"
    v-bind="elementOption.attr"
    v-on="elementOption.event || {}"
    :ref="elementOption.ref"
    :class="elementOption.className"
  >
    <div v-if="elementOption.children && elementOption.children.length !== 0">
      <BasicComponent
        v-for="(element, index) of elementOption.children"
        :key="index"
        :elementOption="element"
      />
    </div>
    <template v-if="elementOption.content">
      {{ content }}
    </template>
  </component>
</template>

<script setup lang="ts">
import { toRef } from "vue";

const props = defineProps<{
  elementOption: CompType;
}>();

const compName =
  typeof props.elementOption.comp === "string"
    ? `${props.elementOption.comp}`
    : props.elementOption.comp;

/**
 * 依据 elementOption 中 data 属性和 key 属性确定渲染组件的响应数据
 * 1.存在key：响应数据是响应数据对象中的某个属性，需传响应对象 data 和属性名 key
 * 2.不存在key：响应数据类型是除对象类型外的所有类型，但该数据必须是由 ref 或 reactive 包裹形成的响应数据
 */
const value =
  props.elementOption.data && props.elementOption.hasOwnProperty("key")
    ? toRef(props.elementOption.data, props.elementOption.key as string)
    : props.elementOption.data;

/**
 * 依据 elementOption 中 content 属性的 text 属性和 key 属性确定渲染组件的渲染文本内容
 * 1.存在key：渲染文本内容是响应数据对象中的某个属性，需传响应对象 data 和属性名 key
 * 2.不存在key：渲染文本内容类型是除对象类型外的所有类型，但该数据必须是由 ref 或 reactive 包裹形成的响应数据
 */
const content =
  props.elementOption.content && props.elementOption.content?.hasOwnProperty("key")
    ? toRef(props.elementOption.content.text, props.elementOption.content.key as string)
    : props.elementOption.content?.text;
</script>

<style scoped lang="less"></style>

```





### Form

- 组件——`components/Form/src/BasicForm.vue`

- 组件类型文件——`components/Form/types.ts`

- 特性：

  1. 传递指定格式的 `json` 对象给组件`BasicForm`，组件会以此渲染对应的表单
  2. 组件`BasicForm`接收的表单项数据是二维数组，第一层数组的值是表单每一行的表单项数组，第二层数组的值是每一个具体的表单项，这样规定可以做到动态地增加或删除一行中的表单项，只需在改动行对应的表单项数组增删数据
  3. `Form`中存在两个公共函数：提交——`submit` 和 重置——`reset`，它们的作用是：`submit`是在执行自定义提交方法前进行表单验证、`reset`是在执行自定义重置方法后对表单进行重置，可以通过在`Form-item`所渲染的子组件的`event`属性设置`submit`或`reset`方法来调用，也可以通过设置子组件的属性`publicEvent`的值为submit或reset单独调用表单验证和重置表单，若是想在提交后进行重置可设置`event`的`submit`方法和`publicEvent`的值为reset，注：这两个公共函数主要是通过点击来执行
  4. `BasicForm`组件可以动态计算每一行中所有表单项在父元素内占据的宽度，主要是通过 `el-col` 的 `span` 来划分，可以在表单项创建数据对象中指定`span`的值，值只能为 1~24 的整数，如果`span`的值或一行的表单项未指定`span`且个数为单数，则`span`的值为小数，此时因`element-plus`的原因，表单项所占据的宽度将由内容宽度决定，可能会出现内容宽度超出父元素宽度或父元素宽度剩余的现象，针对父元素宽度剩余，`BasicForm`通过`justify-content: space-between;` 来自调节剩余的父元素宽度，超出父元素宽度则只能依据情况自设定
  5. 依据Vue原则——单向数据流，组件`BasicForm`接收普通数据对象，将其进行深拷贝后，用`ref`做响应式处理，则父组件内的源数据对象与组件`BasicForm`内的响应数据对象互不干涉，而父组件可以通过`content`中每一个`formItem`的`component.event.submit`拿到修改后的数据对象

- 参数 `json`格式

  ```json
  <formOption> = {
  	mode: {},  // Form绑定的数据对象
      attr: { },  // 参考 element-plus el-form 的属性以及HTML元素属性
      ref: ref(),
  	itemArr: [
      	[
      		{
                  span: 24,	// formItem所占据的宽度 ，只能为1-24
      			colAttr: {} // 包含Form-item的el-col的属性对象
                  attr: {}  // 参考 element-plus el-form-item 的属性以及HTML元素属性
                  component: {  // 渲染组件参数
                      // 所渲染的组件，可渲染原生HTML元素、element-plus组件、自定义组件，所填值皆为元素名
                      // 原生HTML元素、element-plus组件元素名为String，自定义组件为 组件
                      comp: '',
                      attr: {}, // 组件自身属性以及HTML元素属性
                      event: {} // 组件自身事件
                      publicEvent: 'submit' | 'reset',  // 组件调用的公共方法
                      content: '' // 文本内容
                      children: [
                          {
                              comp: '',
                              attr: {},
  							event: {}，
                              content: '' // 文本内容
  							children: []
                          }
                      ]
                  }
              }
      	]
      ]，
  	type: "Form", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  ```

- 参数说明

  1. `FormType`

     | 属性名 | 说明 | 类型 | 默认值 |
     | :-: | :-: | :-: | :-: |
     | mode | 表单数据对象 | `Record<String, any>` | - |
     | attr | `el-form`的属性对象，值为`element-plus`中 `el-form` 的属性以及 HTML 元素属性 | `Record<String, any>` | - |
     | ref | `el-form`组件的实例对象 | `Ref<T>` | - |
     | itemArr | 表单项数组，二维数组 | `Array<Array<FormItemType>>` | - |
  
  2. `FormItemType`
  
     | 属性名 | 说明 | 类型 | 默认值 |
     | :-: | :-: | :-: | :-: |
     | span | 栅格占据的列数 | Number | 24 |
     | attr | `el-form-item`的属性对象，值为`element-plus`中 `el-form-item` 的属性以及 HTML 元素属性 | `Record<String, any>` | - |
     | colAttr | 包含`el-form-item`的`el-col`的属性对象，值为`element-plus`中 `el-col` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
     | comp | 表单项所渲染的子元素组件的属性对象 | ComponentType | - |
  
  3. `ComponentType extends CompType` 
  
     | 属性名 | 说明 | 类型 | 默认值 |
     | :-: | :-: | :-: | :-: |
     | comp | 渲染组件 | String \| Component | - |
     | attr | 组件的属性对象，值为组件自身的属性以及 HTML 元素属性以及事件 | `Record<String, any>` | - |
     | event | 组件事件对象，值为组件自身的事件 | `Record<String, any>` | - |
     | publicEvent | 组件绑定的公共事件 | 'submit' \| 'reset' | - |
     | children | 组件内的子元素组件或插槽内容，如`el-check-group`的`el-check` | `Array<ChildrenType>` | - |
     | content | 组件包含文本内容 | any | - |
  
- 方法——通过 Ref 调用的方法

  | 方法名 | 说明 | 类型 |
  | :-: | :-: | :-: |
  | `validate` | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise`。 | `(callback?: (isValid: Boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
  | `validateField` | 验证具体的某个字段。 | `(props?: Arrayable<FormItemProp>, callback?: (isValid: Boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
  | `resetFields` | 重置该表单项，将其值重置为初始值，并移除校验结果 | `(props?: Arrayable<FormItemProp>) => void` |
  | `scrollToField` | 滚动到指定的字段 | `(prop: FormItemProp) => void` |
  | `clearValidate` | 清理某个字段的表单验证信息。 | `(props?: Arrayable<FormItemProp>) => void` |



代码实现：

```vue
<template>
  <el-form :model="data" v-bind="formOption.attr" :ref="setRef()">
    <el-row
      v-for="(item, index) of formOption.itemArr"
      :key="index"
      justify="space-between"
      class="default-form"
    >
      <el-col
        v-for="(formItem, findex) of item"
        :key="setKey(findex, formItem.attr?.prop)"
        :span="setSpan(item, formItem.span)"
        v-bind="formItem.colAttr"
      >
        <el-form-item v-bind="formItem.attr">
          <BasicComponent
            :elementOption="formItem.component"
            v-model="data[formItem.attr?.prop]"
            @click="
              triggerEvent(
                formItem.component.publicEvent,
                formItem.component.event?.submit,
                formItem.component.event?.reset
              )
            "
            @change="($evnet:any)=>changeHandler($evnet,formItem.attr?.prop as string)"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, unref } from "vue";
import type { FormType, FormItemType } from "../type";
const emit = defineEmits(["changeAfter"]);
const props = defineProps<{
  // 表单数据
  formOption: FormType;
}>();

const data = props.formOption.mode;

// 表单Ref
const formRef = ref();

const setRef = function () {
  return typeof props.formOption.ref === "undefined" ? formRef : props.formOption.ref;
};

/**
 * 子组件触发的公共事件
 * @param val { string } 公共事件字符串
 * @return function 公共事件
 * @author
 */
const triggerEvent = (val: string | undefined, submit: Function, reset: Function) => {
  if (val === "submit" || submit) {
    (function () {
      setRef().value.validate((valid: boolean) => {
        if (!valid) return;
        submit && submit(unref(data));
        if (val === "reset") {
          setRef().value.resetFields();
        }
      });
    })();
  } else if (val === "reset" || reset) {
    (function () {
      reset && reset();
      setRef().value.resetFields();
    })();
  }
};

/**
 * 计算表单项的span
 * @param formItem { Array<FormItemType> } 表单一行的表单项数组
 * @param val { string | number } 表单项指定的 span 值
 * @return number span的值
 * @author 吴泽鑫 2022-11-12
 */
const setSpan = (formItem: Array<FormItemType>, val: string | number | undefined) => {
  let spanValue = 24;
  let spanIndex = 0;
  formItem.forEach((item) => {
    if (item.hasOwnProperty("span")) {
      let value =
        typeof item.span === "string" ? parseInt(item.span) : (item.span as number);
      spanValue = spanValue - value;
      spanIndex++;
    }
  });
  if (val !== undefined) {
    return val;
  } else {
    return spanValue / (formItem.length - spanIndex);
  }
};

/**
 * 设置表单项或表单项子组件的 key 值
 * @param index { number } 表单项或表单项子组件的在数组的位置
 * @param prop { string } 表单项的 prop 值或 子组件的 label 值
 * @return string 对应表单项或表单项子组件的 key 值
 * @author 吴泽鑫 2022-11-12
 */
const setKey = (index: number, prop: string | undefined) => {
  if (typeof prop === "undefined") {
    return index;
  } else {
    return index + prop;
  }
};

/**
 * change 事件后置处理器
 * @param parmas
 */
const changeHandler = function (parmas: any, prop: string) {
  
  emit("changeAfter", {
    prop: prop,
    value: parmas,
  });
};
</script>

<style scoped lang="less">
.default-form {
  width: 100%;
  white-space: nowrap;
}
</style>

```



### Table

- 组件——`components/Table/src/BasicTable.vue`

- 组件类型文件——`components/Table/types.ts`

- 特性：

  1. 传递指定格式的 `json` 对象给组件`BasicTable`，组件会以此渲染对应的表格
  2. 通过设置每一列的渲染属性对象中的`headerSlotName`、`defaultSlotName`，可以指定每一列各自的表头插槽和内容插槽，再由父组件传递指定插槽内容就可以单独为每一列实现表头、内容，且每一个内容插槽都会返回给父组件当前行数据对象`CurrentRowData`，也可以通过渲染属性对象中的`headerSlotConfig`、`defaultSlotConfig`将插槽配置化
  3. 当表格列的内容为一系列输入框时，会依据当前列的属性对象`attr`中的`prop`绑定当前行响应式数据对象`scope.row`中对应的属性值
  4. 当为一列单元格的内容设置`defalutSlotConfig`配置时，`defaultSlotConfig`的事件对象是在`BaiscTable`进行绑定，而不是在`BasicComponent`，且为`defaultSlotConfig`的事件对象中的所有事件传递了当前单元格所在行和列的数据对象作为事件的第一个参数，则在配置对象中便可使用单元格所在行和列的数据对象`currentCellData`，若事件为组件事件，则组件事件的回调参数将会排在`currentCellData`后面，所以当无需使用`currentCellData`但要使用组件事件的回调参数时，都必须在事件的参数列表的第一个参数写上一个变量来接收`currentCellData`
  5. 当一列的内容单元格为多个元素时，可以将`defaultSlotConfig`定义成一个shu'zu

- 参数`json`格式

  ```json
  <tableOption> = {
    data: [],   // 表格显示的数据
    attr: {},   // 参考 element-plus el-table 的属性以及HTML元素属性
    event: {},  // 参考 element-plus el-table 的事件以及HTML事件属性
    ref: ref(), // el-table组件的实例对象
    columnArr: [	// 所要渲染的表格列的数组
      {
        headerSlotName: '',   // 当前表格列的表头插槽名
        headerSlotConfig: {}, // 表格列的表头插槽配置对象
        defaultSlotName: '',  // 当前表格列的内容插槽名
        defaultSlotConfig: {} | [], // 表格列的内容插槽配置对象
        attr: {	// 参考 element-plus el-table-column 的属性以及HTML元素属性
  
        }
      }，
    ]，
    appendSlotConfig: {}, // 表格最后一行插槽的配置对象
    emptySlotConfig: {}, // 表格数据为空时插槽的配置对象
    type: "Table", // 只为Dialog组件服务，用来辨别Dialog内容区所渲染的组件
  }
  ```

- 参数说明

  1. `TableType`

     | 属性名 | 说明 | 类型 | 默认值 |
     | :-: | :-: | :-: | :-: |
     | data | 表格显示的数据 | Array | - |
     | attr | `el-table`的属性对象，值为`element-plus`中 `el-table` 的属性以及 HTML 元素属性 | `Record<String, any>` | - |
     | event | `el-table`的事件对象，值为`element-plus`中 `el-table` 的事件以及 HTML 事件属性 | `Record<String, any>` | - |
     | ref | `el-table`组件的实例对象 | `Ref<T>` | - |
     | columnArr | 渲染的表格列的数组 | `Array<TableColumnType>` | - |
     | appendSlotConfig | 表格最后一行插槽的配置对象 | CompType | - |
     | emptySlotConfig | 表格数据为空时插槽的配置对象 | CompType | - |

  2. `TableColumnType`

     | 属性名 | 说明 | 类型 | 默认值 |
     | :-: | :-: | :-: | :-: |
     | headerSlotName | 表格列的表头插槽名 | String | - |
     | headerSlotConfig | 表格列的表头插槽配置化渲染 | CompType | - |
     | defaultSlotName | 表格列的内容插槽名 | String | - |
     | defaultSlotConfig | 表格列的内容插槽配置化渲染 | CompType \| `Array<CompType>` | - |
     | attr | 参考 element-plus el-table-column 的属性以及 HTML 元素属性 | `Record<String, any>` | - |

- 方法

  | 方法名 | 说明 | 参数 |
  | :-: | :-: | :-: |
  | clearSelection | 用于多选表格，清空用户的选择 | — |
  | getSelectionRows | 返回当前选中的行 |  |
  | toggleRowSelection | 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否 | row, selected |
  | toggleAllSelection | 用于多选表格，切换全选和全不选 | — |
  | toggleRowExpansion | 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。 | row, expanded |
  | setCurrentRow | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。 | row |
  | clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | — |
  | clearFilter | 传入由`columnKey` 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器 | columnKeys |
  | doLayout | 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局 | — |
  | sort | 手动排序表格。 参数 `prop` 属性指定排序列，`order` 指定排序顺序。 | prop: String, order: String |
  | scrollTo | 滚动到一组特定坐标 | (options: ScrollToOptions \| Number, yCoord?: Number) |
  | setScrollTop | 设置垂直滚动位置 | top |
  | setScrollLeft | 设置水平滚动位置 | left |

- 插槽

  - `Table`

    | 插槽名 | 说明 |
    | :-- | :-- |
    | tableAppend | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
    | tableEmpty | 当数据为空时自定义的内容 |

  - `table-column`

    | 插槽名              | 说明                                                  |
    | :------------------ | :---------------------------------------------------- |
    | `<headerSlotName>`  | 自定义表头的内容， 作用域参数为 `{ column, $index }`  |
    | `<defaultSlotName>` | 自定义列的内容 作用域参数为 `{ row, column, $index }` |

- 方法

  |   方法名    |     说明     | 参数 |
  | :---------: | :----------: | :--: |
  | handleOpen  | 打开下拉菜单 |  —   |
  | handleClose | 关闭下拉菜单 |  —   |



代码实现：

```vue
<template>
  <Search
    class="advance-container"
    v-if="options.seachOptions"
    :options="options.seachOptions"
    :columns="options.columnArr"
    @search="advanceSearch"
  >
    <template #headerButtons>
      <slot name="headerButtons" />
    </template>
  </Search>
  <div class="table-container">
    <slot name="tablePrefix" />
    <el-table
      v-loading="loading"
      :data="data"
      :ref="options.ref"
      v-bind="options.attr"
      v-on="options.event || {}"
      style="width: 100%; overflow-x: auto"
    >
      <template v-for="(tableColumn, index) of options.columnArr">
        <el-table-column
          v-if="
            tableColumn.isShow == null || tableColumn.isShow == undefined
              ? true
              : tableColumn.isShow
          "
          :key="setKey(index, tableColumn.attr?.label)"
          :ref="tableColumn.id"
          v-bind="tableColumn.attr"
          v-on="tableColumn.event || {}"
        >
          <template
            #header
            v-if="tableColumn.headerSlotName || tableColumn.headerSlotConfig"
          >
            <BasicComponent
              v-if="tableColumn.headerSlotConfig"
              :elementOption="tableColumn.headerSlotConfig"
            />
            <slot
              v-if="tableColumn.headerSlotName"
              :name="tableColumn.headerSlotName"
            ></slot>
          </template>

          <template
            #default="scope"
            v-if="tableColumn.defaultSlotName || tableColumn.defaultSlotConfig"
          >
            <BasicComponent
              v-if="
                tableColumn.defaultSlotConfig &&
                typeof tableColumn.defaultSlotConfig === 'object'
              "
              :elementOption="defaultSlotConfigHandle(tableColumn.defaultSlotConfig as CompType)"
              v-model="scope.row[tableColumn.attr?.prop]"
              v-on="eventHandle(scope, tableColumn.defaultSlotConfig as CompType) || {}"
            />
            <BasicComponent
              v-if="
                tableColumn.defaultSlotConfig &&
                Array.isArray(tableColumn.defaultSlotConfig)
              "
              v-for="config of tableColumn.defaultSlotConfig"
              :elementOption="defaultSlotConfigHandle(config as CompType)"
              v-on="eventHandle(scope, config as CompType) || {}"
            />
            <slot
              v-if="tableColumn.defaultSlotName"
              :name="tableColumn.defaultSlotName"
              :currentCellData="scope"
            ></slot>
          </template>
        </el-table-column>
      </template>

      <template #append>
        <BasicComponent
          v-if="options.appendSlotConfig"
          :elementOption="options.appendSlotConfig"
        />
        <slot v-else name="tableAppend"></slot>
      </template>
      <template #empty>
        <BasicComponent
          v-if="options.emptySlotConfig"
          :elementOption="options.emptySlotConfig"
        />
        <slot v-else name="tableEmpty"></slot>
      </template>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-if="options.pagination"
        v-model:page-size="options.pagination.attr.per_page"
        v-model:current-page="options.pagination.attr.current_page"
        layout="sizes, prev, pager, next, jumper"
        :total="options?.pagination?.attr?.total"
        :background="true"
        v-bind="options?.pagination?.attr"
        v-on="options?.pagination?.event || {}"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableType } from "../type";
import { Search } from "@/components/Search";
import { ref, watch, onBeforeMount } from "vue";

const props = defineProps<{
  options: TableType;
}>();
const data = ref(props.options.data);
const loading = ref(false);

onBeforeMount(() => {
  if (props.options.loading) {
    loading.value = props.options.loading;
  }
});
watch(
  () => props.options.loading,
  () => {
    loading.value = props.options.loading;
    data.value = props.options.data;
  },
  { deep: true }
);
/**
 * 设置表格列的 key 值
 * @param index { number } 表单项或表单项子组件的在数组的位置
 * @param label { string } 表单项的 prop 值或 子组件的 label 值
 * @return string 对应表格列的 key 值
 * @author
 */
const setKey = (index: number, label: string | undefined) => {
  if (typeof label === "undefined") {
    return index;
  } else {
    return index + label;
  }
};
/**
 * 处理defaultSlotConfig的事件对象
 * @param currentCellData { Object } 当前行数据对象
 * @param events { Object } 当前列的事件对象
 * @return Object 事件对象
 * @author
 */
const eventHandle = function (currentCellData: any, config: any) {
  if (!config.event) return;
  const eventObj = {};
  Object.keys(config.event).forEach((event) => {
    eventObj[event] = function () {
      config.event[event](currentCellData, ...arguments);
    };
  });
  return eventObj;
};

/**
 * 处理defaultSlotConfig
 * @param config { Object } 当前列的配置对象
 * @return Object 除去事件对象的当前列配置对象
 * @author
 */
const defaultSlotConfigHandle = function (config: CompType) {
  const { comp, data, key, attr, content, children, ref } = config;
  return {
    comp,
    data,
    key,
    attr,
    content,
    children,
    ref,
  };
};

/**
 * 高级搜索内容
 * @param params
 */
const advanceSearch = function (params: any) {
  const initTable = props.options?.tableEvent?.initTable;
  initTable && initTable(params);
};
</script>

<style scoped lang="less">
.pagination-container {
  margin: 10px auto 0 auto;
  display: flex;
  justify-content: center;
}

.table-container {
  background-color: white;
  padding: 20px 5px;
}
:deep(.el-table .cell.el-tooltip){
  white-space:pre;
  min-width:50px
}
</style>

```



### Menu

- 组件——`components/Menu/src/BasicMenu.vue`、`MenuItem.vue`
- 组件类型——`components/Menu/types.ts`
- 特性：
  1. 采用了递归的方法，可以依据渲染数据对象进行循环渲染

- 参数`json`格式

  ```json
  <menuOption> = {
    attr: {}, // el-menu的属性对象
    event: {}, // el-menu的事件对象
    ref：ref(), // el-menu组件的实例对象
    itemArr: [  
      // el-menu-item
      {
        attr: {},	// el-menu-item的属性对象
        event: {}, // el-menu-item的事件对象
        icon: {
          isSvgIcon: true, // 图标是否为自引入Svg图标还是
          name: "", // 图标名
          size: "", // 图标大小
          color: "", // 图标颜色
        },
        text: '',	// 菜单项文本内容
      },
      // el-sub-menu
      { // *
        attr: {},	// el-sub-menu的属性对象
        event: {}, // el-sub-menu的事件对象
        icon: {}, // el-sub-menu的图标
        text: '', // el-sub-menu的文本内容
        itemArr: [ // 2
          // el-menu-item
          {
            attr: {},
            event: {},
            icon: {},
        	  text: '',
          },
          // el-sub-menu
          {
            attr: {},
            event: {},
            icon: {},
        	  text: '',
            itemArr: [ // 3
  			      // el-menu-item
              {
                attr: {},
                event: {},
                icon: {},
        		  text: '',
              },
            ] // 3
          }
        ]  // 2
      } // *
    ]
  }
  ```
  
- 参数说明

  1. `MenuType`

  | 属性名  |                             说明                             |         类型          | 默认值 |
  | :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
  |  attr   | `el-menu`的属性对象，值为`element-plus`中 `el-menu` 的属性以及 HTML 属性 | `Record<String, any>` |   -    |
  |  event  | `el-menu`的事件对象，值为`element-plus`中 `el-menu` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
  |   ref   |                   `el-menu`组件的实例对象                    |       `Ref<T>`        |   -    |
  | itemArr |                          菜单项数组                          | `Array<MenuItemType>` |   -    |

  2. `MenuItemType`

  | 属性名  |                             说明                             |         类型          | 默认值 |
  | :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
  |  attr   | `el-menu-item`的属性对象，值为`element-plus`中 `el-menu-item` 的属性以及 HTML属性 | `Record<String, any>` |   -    |
  |  event  | `el-menu-item`的事件对象，值为`element-plus`中 `el-menu-item` 的事件以及 HTML事件 | `Record<String, any>` |   -    |
  | itemArr |              `el-sub-menu`的`el-menu-item`数组               | `Array<MenuItemType>` |   -    |
  |  icon   |                       菜单项的前缀图标                       |       IconType        |   -    |
  |  text   |                       菜单项的文本内容                       |        String         |   -    |

- 方法

  | 方法名 |        说明         |                参数                 |
  | :----: | :-----------------: | :---------------------------------: |
  |  open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
  | close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |



代码实现：

* `<BasicMenu/>`

  ```vue
  <template>
    <el-menu v-bind="menuOption.attr" v-on="menuOption.event || {}" :ref="menuOption.ref">
      <MenuItem
        v-for="(menuItem, index) in menuOption.itemArr"
        :key="index + menuItem.attr?.index"
        :menuItemInfo="menuItem"
      />
    </el-menu>
  </template>
  
  <script setup lang="ts">
    import type { MenuType } from "../type";
    import { MenuItem } from "..";
  
    defineProps<{
      menuOption: MenuType;
    }>();
  </script>
  
  <style scoped lang="less"></style>
  
  ```

  

* `<MenuItem/>`

  ```vue
  <template>
    <!-- 没有子节点，使用 el-menu-item 渲染 -->
    <el-menu-item
      v-if="!menuItemInfo.itemArr || !menuItemInfo.itemArr.length"
      v-bind="menuItemInfo.attr"
      v-on="menuItemInfo.event || {}"
    >
      <Icon
        v-if="menuItemInfo.icon?.name"
        :isSvgIcon="menuItemInfo.icon?.isSvgIcon || false"
        :name="menuItemInfo.icon?.name"
        :color="menuItemInfo.icon?.color"
        :size="menuItemInfo.icon?.size"
        :style="menuItemInfo.icon?.style"
      />
      <template #title>{{ menuItemInfo.text }}</template>
    </el-menu-item>
  
    <!-- 有子节点，使用 el-sub-menu 渲染 -->
    <el-sub-menu v-else v-bind="menuItemInfo.attr" v-on="menuItemInfo.event || {}">
      <template #title>
        <Icon
          v-if="menuItemInfo.icon?.name"
          :isSvgIcon="menuItemInfo.icon?.isSvgIcon || false"
          :name="menuItemInfo.icon?.name"
          :color="menuItemInfo.icon?.color"
          :size="menuItemInfo.icon?.size"
          :style="menuItemInfo.icon?.style"
        />
        <span>{{ menuItemInfo.text }}</span>
      </template>
      <!-- 循环渲染 -->
      <MenuItem
        v-for="(subMenuItem, index) in menuItemInfo.itemArr"
        :key="index + subMenuItem.attr?.index"
        :menuItemInfo="subMenuItem"
      />
    </el-sub-menu>
  </template>
  
  <script setup lang="ts">
  import type { MenuItemType } from "../type";
  import { MenuItem } from "..";
  import { Icon } from "@/components/Icon";
  
  defineProps<{
    menuItemInfo: MenuItemType;
  }>();
  </script>
  
  <style scoped lang="less"></style>
  
  ```

  

### Dropdown

- 组件——`components/Dropdown/src/Dropdown.vue`

- 组件类型文件——`components/Dropdown/types.ts`

- 参数`json`格式

  ```json
  <dropdownOption> = {
    icon: {
      // 图标可为引入的Svg图标文件名或element-plus的图标名(首字母大写)
      prefixIcon: '',  // 前缀图标名
      suffixIcon: '',	// 后缀图标名
      type: '', // 图标的类型 值为 svg 或 el
      size: '', // 图标的大小
    }，
    titleConfig: {} // 下拉菜单名配置
    attr: {}, // 参考 element-plus el-dropdown 的属性以及HTML元素属性
    event: {}, // 参考 element-plus el-dropdown 的事件以及HTML事件属性
    ref: ref(), // ekl-dropdown组件的实例对象
    itemArr: [  // 渲染的下拉菜单项数组
      {
        attr：{}， // 参考 element-plus el-dropdown-item 的属性以及HTML元素属性
  	  icon: {},
        content: '' || {}, // 菜单项的文本内容
      }
    ]
  }
  ```

- 参数说明

  1. `DropdownType`

  |   属性名    |                             说明                             |           类型            | 默认值 |
  | :---------: | :----------------------------------------------------------: | :-----------------------: | :----: |
  |    icon     |                         菜单标题图标                         |         IconType          |   -    |
  | titleConfig |                        下拉菜单名配置                        |         CompType          |   -    |
  |    attr     | `el-dropdown`的属性对象，参考 element-plus el-dropdown 的属性以及HTML元素属性 |   `Record<String, any>`   |   -    |
  |    event    | `el-dropdown`的事件对象，参考 element-plus el-dropdown 的事件以及HTML事件属性 |   `Record<String, any>`   |   -    |
  |     ref     |                 `el-dropdown`组件的实例对象                  |         `Ref<T>`          |   -    |
  |   itemArr   |                     渲染的下拉菜单项数组                     | `Array<DropdownItemType>` |   -    |
  
  2. `DropdownItemType`
  
  | 属性名  |                             说明                             |         类型          | 默认值 |
  | :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
  |  attr   | `el-dropdown-item`的属性对象，参考 element-plus el-dropdown-item 的属性以及HTML元素属性 | `Record<String, any>` |   -    |
  |  icon   |                      菜单项图标配置对象                      |       IconType        |   -    |
  | content |            菜单项的文本内容或菜单项的渲染配置对象            |  String \| CompType   |   -    |
  
  3. `IconType`
  
  |   属性名   |        说明         |  类型   | 默认值 |
  | :--------: | :-----------------: | :-----: | :----: |
  | prefixIcon |     前缀图标名      | String  |   -    |
  | suffixIcon |     后缀图标名      | String  |   -    |
  | isSvgIcon  | 是否为自引入svg图标 | Boolean |   -    |
  |    size    |     图标的大小      | String  |   -    |



### Dialog

- 组件详情——`components/Dialog/src/Dialog.vue`

- 组件类型——`components/Dialog/types.ts`

- 特性：

  1. 对公共组件Dialog进行了函数化，即通过函数的方式进行创建，为创建Dialog的函数``传配置对象参数

- 参数`json`格式

  ```json
  // 函数createDialog的参数对象
  {
    id: "", // Dialog的唯一Id，用于定位同一个方法创建的Dialog
    dialogVisible: ref(Boolean), // 判断所创建的Dialog的打开关闭
    attr: {}, // el-dialog的属性对象
    event: {}, // el-dialog的事件对象
    content: [], // dialog的内容对象数组
    header: {}, // 对话框标题的内容插槽配置对象
    footer: {}, // Dialog 按钮操作区的内容插槽配置对象
  }
  ```

- 参数说明

  |    属性名     |                     说明                     |                             类型                             | 默认值 |
  | :-----------: | :------------------------------------------: | :----------------------------------------------------------: | :----: |
  |      id       | alog的唯一Id，用于定位同一个方法创建的Dialog |                            String                            |   -    |
  | dialogVisible |         判断所创建的Dialog的打开关闭         |                        `Ref<Boolean>`                        |   -    |
  |     attr      |             el-dialog的属性对象              |                    `Record<String, any>`                     |   -    |
  |     event     |             el-dialog的事件对象              |                    `Record<String, any>`                     |   -    |
  |    content    |             dialog的内容对象数组             | `Array<ContentFormType \| ContentTableType \| ContentCompType>` |   -    |
  |    header     |         Dialog标题的内容插槽配置对象         |                           CompType                           |   -    |
  |    footer     |        Dialog 按钮操作区插槽配置对象         |                           CompType                           |   -    |

  `ContentFormType | ContentTableType | ContentComponentType`
  
  |   属性名   |                       说明                        |  类型  |              默认值              |
  | :--------: | :-----------------------------------------------: | :----: | :------------------------------: |
  |    type    |           指定Dialog内容区所渲染的组件            | String | "Form" \| "Table" \| "Component" |
  | <其余属性> | 依照对应的FormType\| TableType\| CompType自行定义 |        |                                  |
  

代码实现：

```vue
<template>
  <el-dialog v-model="dialogVisible.value" v-bind="attr" v-on="event || {}">
    <template v-if="header" #header>
      <BasicComponent :elementOption="header" />
    </template>
    <template v-for="(dialogItem, index) in content" :key="index">
      <BasicForm v-if="dialogItem.type === 'Form'" :formOption="<ContentFormType>dialogItem" />
      <BasicTable
        v-else-if="dialogItem.type === 'Table'"
        :options="<ContentTableType>dialogItem"
      />
      <BasicComponent v-else :elementOption="dialogItem" />
    </template>
    <template v-if="footer" #footer>
      <BasicComponent :elementOption="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import type { Ref } from "vue";
  import { BasicForm } from "@/components/Form";
  import { BasicTable } from "@/components/Table";
  import type { ContentType, ContentFormType, ContentTableType } from "../type";

  defineProps<{
    dialogVisible: Ref<boolean>;
    attr?: { type: Object; default: {} };
    event?: { type: Object; default: {} };
    header?: CompType;
    content?: Array<ContentType>;
    footer?: CompType;
  }>();
</script>

<style lang="less"></style>

```



### Descriptions

- 组件详情——`components/Descriptions/src/BasicDescriptions.vue`

- 组件类型——`components/Descriptions/types.ts`

- 参数`json`格式

  ```json
  <descriptionsOption> {
    attr: {}, // el-descriptions的属性对象
    event: {}, // el-descriptions的事件对象
    ref: ref(), // el-descriptions组件实例对象
    titleSlotConfig: {}, // el-descriptions标题插槽的自定义配置对象
    titleSlotName: "", // el-descriptions标题插槽的外部插槽名
    extraSlotConfig: {}, // el-descriptions自定义操作区插槽的自定义配置对象
    extraSlotName: "", // el-descriptions自定义操作区插槽的外部插槽名
    itemArr: [ //  el-descriptions-item配置对象数组
      {
        attr: {}, // el-descriptions-item的属性对象
        event: {}, // el-descriptions-item的事件对象
        labelSlotName: "", // el-descriptions-item自定义标签插槽的外部插槽名
        labelSlotConfig: {}, // el-descriptions-item自定义标签插槽的自定义配置对象
        defaultSlotName: "",	// el-descriptions-item默认内容插槽的外部插槽名
        defaultSlotConfig: {}, // el-descriptions-item默认内容插槽的自定义配置对象
  	}
    ], 
  }
  ```

- 参数说明

  `DescriptionsType`

  |     属性名      |                             说明                             |             类型              | 默认值 |
  | :-------------: | :----------------------------------------------------------: | :---------------------------: | :----: |
  |      attr       | `el-descriptions`的属性对象，参考 element-plus  el-descriptions的属性以及HTML元素属性 |     `Record<String, any>`     |   -    |
  |      event      | `el-descriptions`的事件对象，参考 element-plus  el-descriptions的事件以及HTML元素事件 |     `Record<String, any>`     |   -    |
  |       ref       |               `el-descriptions`组件的实例对象                |           `Ref<T>`            |   -    |
  | titleSlotConfig |          `el-descriptions`标题插槽的自定义配置对象           |           CompType            |   -    |
  |  titleSlotName  |             el-descriptions标题插槽的外部插槽名              |            String             |   -    |
  | extraSlotConfig |       el-descriptions自定义操作区插槽的自定义配置对象        |           CompType            |   -    |
  |  extraSlotName  |         el-descriptions自定义操作区插槽的外部插槽名          |            String             |   -    |
  |     itemArr     |              `el-descriptions-item`配置对象数组              | `Array<DescriptionsItemType>` |   -    |

  `DescriptionsItemType`

  |      属性名       |                             说明                             |         类型          | 默认值 |
  | :---------------: | :----------------------------------------------------------: | :-------------------: | :----: |
  |       attr        | `el-descriptions-item`的属性对象，参考 element-plus  el-descriptions-item的属性以及HTML元素属性 | `Record<String, any>` |   -    |
  |       event       | `el-descriptions-item`的事件对象，参考 element-plus  el-descriptions-item的事件以及HTML元素事件 | `Record<String, any>` |   -    |
  | defaultSlotConfig |      el-descriptions-item自定义标签插槽的自定义配置对象      |       CompType        |   -    |
  |  defaultSlotName  |        el-descriptions-item自定义标签插槽的外部插槽名        |        String         |   -    |
  |  labelSlotConfig  |       el-descriptions-item默认内容插槽的自定义配置对象       |       CompType        |   -    |
  |   labelSlotName   |        el-descriptions-item自定义标签插槽的外部插槽名        |        String         |   -    |

- 插槽

  `Descriptions`

  |      插槽名       |       说明       |
  | :---------------: | :--------------: |
  | `<titleSlotName>` |     标题插槽     |
  | `<extraSlotName>` | 自定义操作区插槽 |

  `DescriptionsItem`

  |       插槽名        |      说明      |
  | :-----------------: | :------------: |
  | `<defaultSlotName>` |  默认内容插槽  |
  |  `<labelSlotName>`  | 自定义标签插槽 |
  
- 获取描述列表数据——接口格式

  1. 接参格式

     ```json
     data: {
       basicInfo: {
           
       },
       data: [
           {
               table_name: "",
               table_id: "",
               isEdit: "",
               data: [
                   {
                       field_id: 1,
             		  field_name: "",
             	 	  value: "",
                       require: 1,
                       type: 1,
                       desc: "",
                       isEdi
                   }
               ]
           }
       ]
     }
     ```

  2. 传参格式: 

     ```json
     type: '', // 请求数据路由 
     (...arguments),
     ```

  3. 路由名称：`/common/geDescirption`




代码实现：

```vue
<template>
  <el-descriptions
    v-bind="descriptionsOption.attr"
    v-on="descriptionsOption.event || {}"
    :ref="descriptionsOption.ref"
  >
    <template #title v-if="descriptionsOption.titleSlotName || descriptionsOption.titleSlotConfig">
      <slot v-if="descriptionsOption.titleSlotConfig">
        <BasicComponent :elementOption="descriptionsOption.titleSlotConfig" />
      </slot>
      <slot v-if="descriptionsOption.titleSlotName" :name="descriptionsOption.titleSlotName"></slot>
    </template>
    <template #extra v-if="descriptionsOption.extraSlotName || descriptionsOption.extraSlotConfig">
      <slot v-if="descriptionsOption.extraSlotConfig">
        <BasicComponent :elementOption="descriptionsOption.extraSlotConfig" />
      </slot>
      <slot v-if="descriptionsOption.extraSlotName" :name="descriptionsOption.extraSlotName"></slot>
    </template>
    <el-descriptions-item
      v-for="(descriptionsItem, index) of descriptionsOption.itemArr"
      :key="index + `${descriptionsItem.attr?.label}`"
      v-bind="descriptionsItem.attr"
      v-on="descriptionsItem.event || {}"
    >
      <template #label v-if="descriptionsItem.labelSlotName || descriptionsItem.labelSlotConfig">
        <slot v-if="descriptionsItem.labelSlotConfig">
          <BasicComponent :elementOption="descriptionsItem.labelSlotConfig" />
        </slot>
        <slot v-if="descriptionsItem.labelSlotName" :name="descriptionsItem.labelSlotName"></slot>
      </template>
      <template #default>
        <BasicComponent
          v-if="descriptionsItem.defaultSlotConfig"
          :elementOption="descriptionsItem.defaultSlotConfig"
        />
        <slot
          v-if="descriptionsItem.defaultSlotName"
          :name="descriptionsItem.defaultSlotName"
        ></slot>
      </template>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script setup lang="ts">
  import type { DescriptionsType } from "../type";

  defineProps<{
    descriptionsOption: DescriptionsType;
  }>();
</script>

<style scoped lang="less">
.el-input__wrapper{
  flex-grow: 0;
}
</style>

```




### Button

- 组件详情——`components/Button/src/BasicButton.vue`

- 类型文件——`components/Button/types.ts`

- 参数 `json` 格式

```json
<btnOption>: {
  attr: {}, // el-button的属性对象
  event: {}, // el-button的事件对象
  colAttr： {}， // 包裹el-button的el-col的属性对象
  content: {}, // 按钮内容的配置对象
  icon: { // 自定义图标组件的配置对象
    isSvgIcon: false,
    name: "",
    size: "",
    color: "",
  },
  loading: {}, 
}
```

- 参数说明

  `ButtonType`

  | 属性名  |                             说明                             |         类型          | 默认值 |
  | :-----: | :----------------------------------------------------------: | :-------------------: | :----: |
  |  attr   | `el-button`的属性对象，值为`element-plus`中 `el-button` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
  |  event  | `el-button`的事件对象，值为`element-plus`中 `el-button` 的事件以及 HTML 元素事件 | `Record<String, any>` |   -    |
  | colAttr | 包裹el-button的el-col的属性对象，值为`element-plus`中 `el-col` 的属性以及 HTML 元素属性 | `Record<String, any>` |   -    |
  | content |                      按钮的内容配置对象                      |       CompType        |   -    |
  |  icon   |                   自定义图标组件的配置对象                   |       IconType        |   -    |
  | loading |                  自定义加载中组件的配置对象                  |       CompType        |   -    |

- 插槽

  |   插槽名   |       说明       |
  | :--------: | :--------------: |
  |  btnIcon   |  自定义图标组件  |
  | btnDefault |  自定义按钮内容  |
  | btnLoading | 自定义加载中组件 |



代码实现：

```vue
<template>
  <el-col v-bind="btnOption.colAttr">
    <el-button v-bind="btnOption.attr" v-on="btnOption.event || {}">
      <template #icon v-if="btnOption.icon">
        <Icon
          v-if="btnOption.icon"
          :isSvgIcon="btnOption.icon?.isSvgIcon || false"
          :name="btnOption.icon?.name"
          :size="btnOption.icon?.size"
          :color="btnOption.icon?.color"
          :style="btnOption.icon?.style"
        />
        <slot name="btnIcon"></slot>
      </template>
      <template #default>
        <BasicComponent v-if="btnOption.content" :elementOption="btnOption.content" />
        <slot name="btnDefault"></slot>
      </template>
      <template #loading>
        <BasicComponent v-if="btnOption.loading" :elementOption="btnOption.loading" />
        <slot name="btnLoading"></slot>
      </template>
    </el-button>
  </el-col>
</template>

<script setup lang="ts">
import type { ButtonType } from "../type";
import { Icon } from "@/components/Icon";

defineProps<{ btnOption: ButtonType }>();
</script>

```



### Icon、SvgIcon

- `Icon`组件详情——`components/Icon/src/Icon.vue`，渲染 `element-plus`自带的图标

- 参数通过`prop`传递

- 参数说明

  |  属性名   |                             说明                             |       类型       | 默认值 |
  | :-------: | :----------------------------------------------------------: | :--------------: | :----: |
  | isVisible |                        控制图标的显示                        |  `Ref<Boolean>`  |  true  |
  | isSvgIcon |                     是否为自引入svg图标                      |     Boolean      |   -    |
  |   name    | 图标名，自引入图标值为图标文件名，element-plus自带图标首字母大写 |      String      |   -    |
  |   size    |                           图标大小                           | Number \| String |   -    |
  |   color   |                           图标颜色                           |      String      |   -    |
  |   style   |                        图标的样式对象                        |      Object      |   -    |

- `SvgIcon`组件详情——`components/Icon/src/SvgIcon.vue`  渲染 `svg`图标

- 参数通过`prop`传递

- 参数说明

  | 属性名 |   说明   |      类型       | 默认值 |
  | :----: | :------: | :-------------: | :----: |
  | prefix | 图标前缀 |     String      |  icon  |
  |  name  |  图标名  |     String      |   -    |
  |  size  | 图标大小 | Number \|String |   14   |



代码实现：

* `<icon/>`

  ```vue
  <template>
    <div
      v-if="typeof isVisible !== 'undefined' ? isVisible.value : true"
      class="icon-style"
    >
      <SvgIcon
        v-if="isSvgIcon"
        :name="name"
        :size="typeof size !== 'undefined' ? size : 14"
        :style="style"
      />
      <el-icon
        v-else
        :color="color"
        :size="typeof size !== 'undefined' ? size : 14"
        :style="style"
      >
        <component :is="name" />
      </el-icon>
    </div>
  </template>
  
  <script setup lang="ts">
  import { SvgIcon } from "@/components/Icon";
  import type { Ref } from "vue";
  
  defineProps<{
    isVisible?: Ref<Boolean>;
    isSvgIcon: boolean;
    name: string;
    size?: number | string;
    color?: string;
    style?: object;
  }>();
  </script>
  
  <style scoped lang="less">
  .icon-style {
    display: flex;
    align-items: center;
  }
  </style>
  
  ```

* `<SvgIcon/>`

  ```vue
  <template>
    <svg :style="getStyle" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
  </template>
  
  <script setup lang="ts">
    import type { CSSProperties } from "vue";
    import { computed } from "vue";
  
    const props = defineProps({
      prefix: { type: String, default: "icon" },
      name: { type: String, required: true },
      size: { type: [Number, String], default: 14 },
      style: { type: Object, default: {} },
    });
  
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
  
    const getStyle = computed((): CSSProperties => {
      const { size } = props;
      let s = `${size}`;
      s = `${s.replace("px", "")}px`;
      return {
        width: s,
        height: s,
        ...props.style,
      };
    });
  </script>
  
  <style scoped lang="less"></style>
  
  ```

  



## 功能组件

### SelectList

- 组件详情——`components/SelectList/src/SelectList.vue`
- 特性：`SelectList`组件是对`el-select`的特殊化封装，在`SelectList`组件中封装了下拉列表选项的请求接口，当打开下拉框时，即会去请求下拉框的选项
- 注：该组件目前有待完善



### CheckBox

- 组件详情——`components/CheckBox/src/CheckBox.vue`
- 特性：`SelectList`组件是对`el-check-box`的特殊化封装，在`CheckBox`组件中封装了多选选项的请求接口，当该组件被挂载时，就会去请求多选选项
- 注：该组件目前有待完善



### AttentionButton

- 组件详情——`components/CustomComp/attention_button.vue`
- 特性：





## Hooks

### DescriptionEdit

- 实现思路：
  1. 获取规定格式的数据
  2. 使用`handleData`方法处理数据，为每一个描述列表项的数据对象添加`table_name`、`table_id`
  3. 定义好`hooks`所需的判断变量对象、函数集合对象、标题对象
     1. 判断变量对象：判断每个描述列表是否启用编辑功能的变量的对象集合（命名格式：`<table_name>`；数据类型：`Ref<Boolean>`）
     2. 函数集合对象：控制每个描述列表启用编辑功能的函数的对象集合，函数通常是将对应的判断变量进行取反，函数对应的属性名为`<table_name>`
     3. 标题对象：每个描述列表标题内容的对象集合，暂定只允许为文本，标题文本对应的属性名为`<table_name>`
     4. 将描述列表的数据内容、标题对象、判断变量对象、函数集合对象按顺序传递给指定的`hooks`
  
- 实现步骤：
  1. 先封装返回单独一个描述列表渲染配置对象的`hook`，接收的参数是对应的数据内容对象、标题、判断变量、函数集合
  2. 在上面封装的`hook`上再进行一次封装，作为处理多个描述列表的`hook`，接收的参数是描述列表的数据内容、标题对象、判断变量对象、函数集合对象，在该`hook`内会对数据内容、标题对象、判断变量对象、函数集合对象进行处理，处理成单独每一个描述列表的数据内容对象、标题、判断变量、函数
  
- `DescriptionEdit_Hook`详情——`hooks/DescriptionEdit/index.ts`
  
- `DescriptionEdit_Hook`介绍

  - 创建一个描述列表的渲染配置对象

    1. 调用`renderDescriptionEdit`，传入描述列表的数据内容对象——`description`、描述列表的标题——`title`、判断是否对描述列表进行编辑的变量——`judge`、启用描述列表进行编辑的函数——`judgeFun`；`renderDescriptionEdit`函数会将`description.isEdit`、`judgeFun`传递给`renderExtra`函数来创建启用描述列表编辑的按钮；同时也会利用`handleData`函数处理`description`并将其中的`data`数组(`descriptionItems`)以及`judge`传给`renderDescriptionItem`来生成描述列表项的数组
    2. `renderDescriptionItem`会对`descriptionItems`采用`map`函数进行遍历生成描述列表项的渲染配置对象数组，会将每一个描述列表项的数据对象`descriptionItem`和`judge`传递给`renderDescriptionItemDefault`来生成描述列表项的默认内容`defaultSlotConfig`
    3. `renderDescriptionItemDefault`函数会对描述列表项的数据对象`descriptionItem`进行`reactive`响应式绑定；并依据`descriptionItem.type`来判断该描述列表项的内容是否为图片以及编辑组件是否为文件上传组件，是则返回对应的渲染配置对象，不是则调用`renderDescriptionItemDefaultEditComp`并传`descriptionItem`、响应式对象`descriptionItemObj`、`judge`等参数
    4. `renderDescriptionItemDefaultEditComp`会依据`descriptionItem.isEdit`来判断是否生成描述列表项的编辑按钮，是则返回以`BasicPopover`组件创建的编辑按钮渲染配置对象，且`BasicPopover`的默认内容是一个表单，则会以`BasicForm`组件来创建，并调用`renderEditCompFormItem`来生成`FormItem`渲染配置对象数组，传`descriptionItem`
    5. `renderEditCompFormItem`会调用`renderEditCompFormItemComp`来生成`FormItem`编辑组件的渲染配置对象，其可能为输入框、下拉框、单选按钮、多选按钮

  - 创建多个描述列表的渲染配置对象

    调用`renderDescriptionEditArr`函数，传入描述列表的数据对象数组——`descriptions`、标题对象——`titles`、判断变量对象——`judges`、函数集合对象——`judgeFuns`，`renderDescriptionEditArr`函数会描述列表的数据对象数组——`descriptions`采用map进行遍历将每一个描述列表数据对象`description`，且以`description`的`table_name`属性在标题对象——`titles`、判断变量对象——`judges`、函数集合对象——`judgeFuns`获取对应的描述列表的标题——`title`、判断是否对描述列表进行编辑的变量——`judge`、启用描述列表进行编辑的函数——`judgeFun`，并将它们传给`renderDescriptionEdit`来生成描述列表渲染配置对象，其中如果`description`的`data`属性不存在就返回空对象，并最终用`filter`函数去除所有空对象，生成只有`itemArr`的描述列表的渲染配置对象数组

- 注意事项：

  1. `DescriptionEdit_Hook`接收的描述列表数据对象格式必须以下面的格式为规范：

     ```json
     {
       isEdit: 1 / 0, // 是否可以编辑该描述列表
       table_name: "", // 该描述列表的数据对应的数据库表
       table_id: "", // 该描述列表的数据对应的数据库表中某一条数据的ID
       data: [	// 该描述列表的项的数据对象的数组
           {
               field_id: <Number>, // 该描述列表项在数据库对应的field表的label-ID
               field_name: "", // 该描述列表项的label，
               value: "", // 该描述列表项的值
               require: 0 / 1 / 2, // 该描述项是否必填 0选填 1必填 2唯一标识
               type: "", // 该描述列表项的编辑组件类型
               desc: "", // 该描述列表项值的备注说明
               isEdit: "" // 该描述列表是否允许被编辑
           }
       ]
     }
     ```

  2. 若要创建多个描述列表的渲染配置对象，则必须在上面的数据格式外包一层数组，且标题对象——`titles`、判断变量对象——`judges`、函数集合对象——`judgeFuns`的属性名必须为描述列表数据对象对应的`table_name`的值

  3. 针对描述列表项的修改必须统一为同一个接口，不论这个描述列表被应用在哪处

  4. 下拉框、多选的选项获取接口必须统一成同一个接口
