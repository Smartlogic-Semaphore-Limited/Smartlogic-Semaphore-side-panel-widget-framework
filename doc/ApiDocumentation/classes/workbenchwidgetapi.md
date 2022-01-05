**[Semaphore: WorkbenchWidgetApi](../README.md)**

> [Globals](../README.md) / WorkbenchWidgetApi

# Class: WorkbenchWidgetApi

## Hierarchy

* **WorkbenchWidgetApi**

## Index

### Constructors

* [constructor](workbenchwidgetapi.md#constructor)

### Methods

* [addEventListener](workbenchwidgetapi.md#addeventlistener)
* [closeWidget](workbenchwidgetapi.md#closewidget)
* [getAltLabelProperties](workbenchwidgetapi.md#getaltlabelproperties)
* [getAltLabelUnfilteredProperties](workbenchwidgetapi.md#getaltlabelunfilteredproperties)
* [getAssociativeTypes](workbenchwidgetapi.md#getassociativetypes)
* [getAssociativeUnfilteredTypes](workbenchwidgetapi.md#getassociativeunfilteredtypes)
* [getBroaderTypes](workbenchwidgetapi.md#getbroadertypes)
* [getBroaderUnfilteredTypes](workbenchwidgetapi.md#getbroaderunfilteredtypes)
* [getClasses](workbenchwidgetapi.md#getclasses)
* [getConceptAltLabels](workbenchwidgetapi.md#getconceptaltlabels)
* [getConceptBroader](workbenchwidgetapi.md#getconceptbroader)
* [getConceptDetails](workbenchwidgetapi.md#getconceptdetails)
* [getConceptGuid](workbenchwidgetapi.md#getconceptguid)
* [getConceptNarrower](workbenchwidgetapi.md#getconceptnarrower)
* [getConceptPrefLabels](workbenchwidgetapi.md#getconceptpreflabels)
* [getConceptRelated](workbenchwidgetapi.md#getconceptrelated)
* [getConceptSchemes](workbenchwidgetapi.md#getconceptschemes)
* [getContext](workbenchwidgetapi.md#getcontext)
* [getCurrentWidgetId](workbenchwidgetapi.md#getcurrentwidgetid)
* [getDetailsWithMetadata](workbenchwidgetapi.md#getdetailswithmetadata)
* [getKmmApiPath](workbenchwidgetapi.md#getkmmapipath)
* [getKmmUiPath](workbenchwidgetapi.md#getkmmuipath)
* [getKmmVersion](workbenchwidgetapi.md#getkmmversion)
* [getMetadataForDomain](workbenchwidgetapi.md#getmetadatafordomain)
* [getMetadataTypes](workbenchwidgetapi.md#getmetadatatypes)
* [getMetadataUnfilteredTypes](workbenchwidgetapi.md#getmetadataunfilteredtypes)
* [getModelLanguages](workbenchwidgetapi.md#getmodellanguages)
* [getNarrowerTypes](workbenchwidgetapi.md#getnarrowertypes)
* [getNarrowerUnfilteredTypes](workbenchwidgetapi.md#getnarrowerunfilteredtypes)
* [getSemaphoreSettings](workbenchwidgetapi.md#getsemaphoresettings)
* [getStateParams](workbenchwidgetapi.md#getstateparams)
* [getStudioGraphQLPath](workbenchwidgetapi.md#getstudiographqlpath)
* [getStudioPath](workbenchwidgetapi.md#getstudiopath)
* [getTopConcepts](workbenchwidgetapi.md#gettopconcepts)
* [navigateToItem](workbenchwidgetapi.md#navigatetoitem)
* [openWidget](workbenchwidgetapi.md#openwidget)

### Object literals

* [actions](workbenchwidgetapi.md#actions)

## Constructors

### constructor

\+ **new WorkbenchWidgetApi**(`debug?`: boolean): [WorkbenchWidgetApi](workbenchwidgetapi.md)

*Defined in [src/workbench-widget-api.ts:134](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L134)*

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`debug` | boolean | false | If set to true additional debug messages will be logged to console  |

**Returns:** [WorkbenchWidgetApi](workbenchwidgetapi.md)

## Methods

### addEventListener

▸ **addEventListener**(`type`: [KmmEventType](../README.md#kmmeventtype), `listener`: [EventListener](../README.md#eventlistener)): function

*Defined in [src/workbench-widget-api.ts:150](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L150)*

Registers a new listener for KMM events.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | [KmmEventType](../README.md#kmmeventtype) | Which event to listen for |
`listener` | [EventListener](../README.md#eventlistener) | Callback function that will be called with event data every time an event of type `type` will be received |

**Returns:** function

Deregistering function; when invoked removes this event listener.

___

### closeWidget

▸ **closeWidget**(`targetWidgetId?`: undefined \| string): Promise\<void>

*Defined in [src/workbench-widget-api.ts:243](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L243)*

Close right side panel in host application.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`targetWidgetId?` | undefined \| string | Id of the widget to be closed. If not passed it will close itself.  |

**Returns:** Promise\<void>

___

### getAltLabelProperties

▸ **getAltLabelProperties**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:334](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L334)*

Return Alternative Labels Types valid for item.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getAltLabelUnfilteredProperties

▸ **getAltLabelUnfilteredProperties**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:327](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L327)*

Return All Alternative Labels Types.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getAssociativeTypes

▸ **getAssociativeTypes**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:278](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L278)*

Return Associative Types valid for current item.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`taskGraphUri` | string |  |
`itemUri` | string |   |

**Returns:** Promise\<unknown>

___

### getAssociativeUnfilteredTypes

▸ **getAssociativeUnfilteredTypes**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:269](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L269)*

Return all Associative Types.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getBroaderTypes

▸ **getBroaderTypes**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:292](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L292)*

Return Broader Types valid for current item.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getBroaderUnfilteredTypes

▸ **getBroaderUnfilteredTypes**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:285](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L285)*

Return all Broader Types.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getClasses

▸ **getClasses**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:262](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L262)*

Return class data for current item.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getConceptAltLabels

▸ **getConceptAltLabels**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:397](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L397)*

 Return concept details with alternative labels.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getConceptBroader

▸ **getConceptBroader**(`taskGraphUri`: string, `itemUri`: string, `limit?`: number, `offset?`: number): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:418](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L418)*

 Return concept details with broader concepts grouped by relation type.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`taskGraphUri` | string | - |
`itemUri` | string | - |
`limit` | number | 10 |
`offset` | number | 0 |

**Returns:** Promise\<unknown>

___

### getConceptDetails

▸ **getConceptDetails**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:376](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L376)*

 Return concept details.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getConceptGuid

▸ **getConceptGuid**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:383](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L383)*

 Return concept guid data.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getConceptNarrower

▸ **getConceptNarrower**(`taskGraphUri`: string, `itemUri`: string, `limit?`: number, `offset?`: number): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:411](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L411)*

 Return concept details with narrower concepts grouped by relation type.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`taskGraphUri` | string | - |
`itemUri` | string | - |
`limit` | number | 10 |
`offset` | number | 0 |

**Returns:** Promise\<unknown>

___

### getConceptPrefLabels

▸ **getConceptPrefLabels**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:390](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L390)*

 Return concept details with preferred labels.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getConceptRelated

▸ **getConceptRelated**(`taskGraphUri`: string, `itemUri`: string, `limit?`: number, `offset?`: number): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:404](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L404)*

 Return concept details with associative concepts grouped by relation type.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`taskGraphUri` | string | - |
`itemUri` | string | - |
`limit` | number | 10 |
`offset` | number | 0 |

**Returns:** Promise\<unknown>

___

### getConceptSchemes

▸ **getConceptSchemes**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:369](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L369)*

 Return all concept schemes for given task.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getContext

▸ **getContext**(): Promise\<{ context: any  }>

*Defined in [src/workbench-widget-api.ts:221](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L221)*

Fetch the context data [WorkbenchWidgetApi.openWidget](workbenchwidgetapi.md#openwidget).

**Returns:** Promise\<{ context: any  }>

___

### getCurrentWidgetId

▸ **getCurrentWidgetId**(): string

*Defined in [src/workbench-widget-api.ts:202](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L202)*

Fetch current widget id

**Returns:** string

___

### getDetailsWithMetadata

▸ **getDetailsWithMetadata**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:355](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L355)*

Return Item with metadata properties.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getKmmApiPath

▸ **getKmmApiPath**(): Promise\<string>

*Defined in [src/workbench-widget-api.ts:169](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L169)*

Fetch path to main kmm api

**Returns:** Promise\<string>

path to main kmm instance

___

### getKmmUiPath

▸ **getKmmUiPath**(): Promise\<string>

*Defined in [src/workbench-widget-api.ts:177](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L177)*

Fetch path to main kmm ui

**Returns:** Promise\<string>

path to main kmm instance

___

### getKmmVersion

▸ **getKmmVersion**(): Promise\<string>

*Defined in [src/workbench-widget-api.ts:161](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L161)*

Fetch kmm version

**Returns:** Promise\<string>

version of the kmm instance

___

### getMetadataForDomain

▸ **getMetadataForDomain**(`taskGraphUri`: string, `domainUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:362](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L362)*

 Return both default metadata and metadata specific for given domain.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`domainUri` | string |

**Returns:** Promise\<unknown>

___

### getMetadataTypes

▸ **getMetadataTypes**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:348](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L348)*

Return Metadata types valid for item.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getMetadataUnfilteredTypes

▸ **getMetadataUnfilteredTypes**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:341](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L341)*

Return Metadata types.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getModelLanguages

▸ **getModelLanguages**(`modelGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:313](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L313)*

Return Languages valid for the model.

#### Parameters:

Name | Type |
------ | ------ |
`modelGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getNarrowerTypes

▸ **getNarrowerTypes**(`taskGraphUri`: string, `itemUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:306](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L306)*

Return Narrower Types valid for current item.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |
`itemUri` | string |

**Returns:** Promise\<unknown>

___

### getNarrowerUnfilteredTypes

▸ **getNarrowerUnfilteredTypes**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:299](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L299)*

Return all Narrower Types.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getSemaphoreSettings

▸ **getSemaphoreSettings**(`taskGraphUri`: string): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:320](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L320)*

Return Semaphore Settings.

#### Parameters:

Name | Type |
------ | ------ |
`taskGraphUri` | string |

**Returns:** Promise\<unknown>

___

### getStateParams

▸ **getStateParams**(): Promise\<{ itemUri?: undefined \| string ; modelGraphUri?: undefined \| string ; taskGraphUri?: undefined \| string  }>

*Defined in [src/workbench-widget-api.ts:209](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L209)*

Fetch current host state params (modelGraphUri, taskGraphUri, itemUri).

**Returns:** Promise\<{ itemUri?: undefined \| string ; modelGraphUri?: undefined \| string ; taskGraphUri?: undefined \| string  }>

___

### getStudioGraphQLPath

▸ **getStudioGraphQLPath**(): Promise\<string>

*Defined in [src/workbench-widget-api.ts:194](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L194)*

Fetch path to GraphQL endpoint of studio

**Returns:** Promise\<string>

string path to studio's GraphQL endpoint

___

### getStudioPath

▸ **getStudioPath**(): Promise\<string>

*Defined in [src/workbench-widget-api.ts:185](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L185)*

Fetch path to main studio instance

**Returns:** Promise\<string>

path to main studio instance

___

### getTopConcepts

▸ **getTopConcepts**(`taskGraphUri`: string, `itemUri`: string, `limit?`: number, `offset?`: number): Promise\<unknown>

*Defined in [src/workbench-widget-api.ts:425](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L425)*

 Return concept scheme details with top concepts.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`taskGraphUri` | string | - |
`itemUri` | string | - |
`limit` | number | 10 |
`offset` | number | 0 |

**Returns:** Promise\<unknown>

___

### navigateToItem

▸ **navigateToItem**(`item`: object): Promise\<void>

*Defined in [src/workbench-widget-api.ts:232](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L232)*

Navigate host application to item.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`item` | object | Item can be concept, concept scheme, relationship, class etc. existing in current task, formed as JsonLd object.   You can use [getConceptDetails](workbenchwidgetapi.md#getconceptdetails) to receive concept as JsonLd object.  |

**Returns:** Promise\<void>

___

### openWidget

▸ **openWidget**(`targetWidgetId`: string, `config?`: [OpenWidgetConfig](../README.md#openwidgetconfig), `context?`: any): Promise\<void>

*Defined in [src/workbench-widget-api.ts:254](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L254)*

Open different widget in the same model.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`targetWidgetId` | string | - | Id of the widget to be opened. |
`config` | [OpenWidgetConfig](../README.md#openwidgetconfig) | {} | Optional config for opening widget. |
`context` | any | null | Optional context data. It can be fetched later by getContext [WorkbenchWidgetApi.getContext](workbenchwidgetapi.md#getcontext).  |

**Returns:** Promise\<void>

## Object literals

### actions

▪  **actions**: object

*Defined in [src/workbench-widget-api.ts:432](https://github.com/Smartlogic-Semaphore-Limited/Smartlogic-Semaphore-side-panel-widget-framework/blob/77a3957/src/workbench-widget-api.ts#L432)*

Actions can be used to use Workbench functionality directly.

#### Properties:

Name | Type | Value | Description |
------ | ------ | ------ | ------ |
`call` | \_actionCall | this.\_actionCall.bind(this) | Calls action.  **`param`** name of the particular action.  **`param`** data needed for particular action.  |
`showFormAddAltLabel` | function | (name: string, langCode: string, typeUri: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Alternative Label.   |
`showFormAddBroader` | function | (typeUri: string, targetUri: string, targetName: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Broader relation to the target Concept.   |
`showFormAddMultipleAltLabel` | function | (names: string, langCode: string, typeUri: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Multiple Alternative Labels.   |
`showFormAddMultipleTranslation` | function | (rows: Array\<[LabelEditFormData](../README.md#labeleditformdata)>, initialSave: boolean) => Promise\<unknown> | Shows form for add new Multiple Translations Labels.   |
`showFormAddNarrower` | function | (typeUri: string, targetUri: string, targetName: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Narrower relation to the target Concept.   |
`showFormAddPrefLabel` | function | (name: string, langCode: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Preferred Label.   |
`showFormAddRelated` | function | (typeUri: string, targetUri: string, targetName: string, initialSave: boolean) => Promise\<unknown> | Shows form for add new Related relation to the target Concept.   |
