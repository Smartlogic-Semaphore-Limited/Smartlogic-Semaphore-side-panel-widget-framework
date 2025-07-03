**[Semaphore: WorkbenchWidgetApi](README.md)**

> Globals

# Semaphore: WorkbenchWidgetApi

## Index

### Widget Api Classes

* [WorkbenchWidgetApi](classes/workbenchwidgetapi.md)

### KMM Messaging Type aliases

* [EventListener](README.md#eventlistener)
* [KmmEvent](README.md#kmmevent)
* [KmmEventType](README.md#kmmeventtype)

### KMM action parameters Type aliases

* [LabelEditFormData](README.md#labeleditformdata)
* [LabelFormConfig](README.md#labelformconfig)
* [LabelFormValue](README.md#labelformvalue)
* [OpenWidgetConfig](README.md#openwidgetconfig)

### JSON helpers Variables

* [Root](README.md#root)

### JSON helpers Functions

* [retrocycle](README.md#retrocycle)

### Other Functions

* [decycle](README.md#decycle)
* [isObject](README.md#isobject)

## KMM Messaging Type aliases

### EventListener

Ƭ  **EventListener**: (data: [KmmEvent](README.md#kmmevent)) => void

*Defined in [src/workbench-widget-api.ts:61](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L61)*

General type of an event listener.

**`see`** [WorkbenchWidgetApi.addEventListener](classes/workbenchwidgetapi.md#addeventlistener)

___

### KmmEvent

Ƭ  **KmmEvent**: { type: \"CONCEPT\_UPDATED\"  } \| { type: \"CONCEPT\_SCHEME\_UPDATED\"  } \| { type: \"COLLECTION\_UPDATED\"  }

*Defined in [src/workbench-widget-api.ts:39](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L39)*

Type of event that KMM application can broadcast to widgets.

Widgets can register to listen to specific event using

___

### KmmEventType

Ƭ  **KmmEventType**: KmmEvent[\"type\"]

*Defined in [src/workbench-widget-api.ts:54](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L54)*

All event types users can listen for.

___

## KMM action parameters Type aliases

### LabelEditFormData

Ƭ  **LabelEditFormData**: { config: [LabelFormConfig](README.md#labelformconfig) ; data: [LabelFormValue](README.md#labelformvalue)  }

*Defined in [src/workbench-widget-api.ts:105](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L105)*

Data transfer type for sending information about editing single label (alt or pref).
Used in [showFormAddMultipleTranslation](classes/workbenchwidgetapi.md#showformaddmultipletranslation)

#### Type declaration:

Name | Type |
------ | ------ |
`config` | [LabelFormConfig](README.md#labelformconfig) |
`data` | [LabelFormValue](README.md#labelformvalue) |

___

### LabelFormConfig

Ƭ  **LabelFormConfig**: { editableLanguage: boolean ; editableType: boolean  }

*Defined in [src/workbench-widget-api.ts:92](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L92)*

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`editableLanguage` | boolean | `true` value makes the language code editable |
`editableType` | boolean | `true` value makes the type of the label editable. Type is editable by default for all alternative labels and it is always disabled for pref labels. |

___

### LabelFormValue

Ƭ  **LabelFormValue**: { labelLanguage: string ; labelValue: string ; typeUri: string  }

*Defined in [src/workbench-widget-api.ts:80](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L80)*

#### Type declaration:

Name | Type | Description |
------ | ------ | ------ |
`labelLanguage` | string | The language tag of the label |
`labelValue` | string | The value of the label |
`typeUri` | string | The uri of type of the label |

___

### OpenWidgetConfig

Ƭ  **OpenWidgetConfig**: { modal?: boolean \| { animation?: undefined \| false \| true ; backdrop?: boolean \| \"static\" ; keyboard?: undefined \| false \| true ; size?: \"sm\" \| \"lg\" \| \"xl\" \| "" ; windowClass?: \"right\" \| \"left\" \| ""  }  }

*Defined in [src/workbench-widget-api.ts:116](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/workbench-widget-api.ts#L116)*

Data transfer type for configure the way widget is opened.
Used in [openWidget](classes/workbenchwidgetapi.md#openwidget)

#### Type declaration:

Name | Type |
------ | ------ |
`modal?` | boolean \| { animation?: undefined \| false \| true ; backdrop?: boolean \| \"static\" ; keyboard?: undefined \| false \| true ; size?: \"sm\" \| \"lg\" \| \"xl\" \| "" ; windowClass?: \"right\" \| \"left\" \| ""  } |

## JSON helpers Variables

### Root

• `Const` **Root**: unique symbol = Symbol()

*Defined in [src/cycle.ts:24](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/cycle.ts#L24)*

Make a deep copy of an object or array, assuring that there is at most
one instance of each object or array in the resulting structure. The
duplicate references (which might be forming cycles) are replaced with
an object of the form
```
{$ref: PATH}
```
where the `PATH` is a Array<string> that locates the first occurrence.
So,
```javascript
     let a = [];
     a[0] = a;
     return JSON.stringify(decycle(a));
```
produces the string `'[{"$ref":[]}]'`.

Path is used to locate the unique object. [] indicates the top level of
the object or array. `[STRING]` indicates a child member or
property.

## JSON helpers Functions

### retrocycle

▸ **retrocycle**(`object`: any): any

*Defined in [src/cycle.ts:67](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/cycle.ts#L67)*

Restore an object that was reduced by decycle. Members whose values are
objects of the form `{$ref: PATH}` are replaced with references to the
value found by the PATH. This will restore cycles. The object will be mutated.

So,
```javascript
     let s = '[{"$ref":[]}]';
     return retrocycle(JSON.parse(s));
```
produces an array containing a single element which is the array itself.

#### Parameters:

Name | Type |
------ | ------ |
`object` | any |

**Returns:** any

___

## Other Functions

### decycle

▸ **decycle**(`object`: any): any

*Defined in [src/cycle.ts:29](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/cycle.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`object` | any |

**Returns:** any

___

### isObject

▸ **isObject**(`value`: any): boolean

*Defined in [src/cycle.ts:25](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/7d72210/src/cycle.ts#L25)*

#### Parameters:

Name | Type |
------ | ------ |
`value` | any |

**Returns:** boolean
