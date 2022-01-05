import { decycle, retrocycle } from "./cycle";

/** @internal */
function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop);
}

/** @internal */
type WaitForResponse = {
  promise: Promise<any>;
  resolve: (data: any) => void;
  reject: (data: any) => void;
  timeoutID: number;
};

/** @internal */
interface SimpleObject<V = any> {
  [key: string]: V;
}
/** @internal */
interface MessageProps extends SimpleObject {
  widgetId: string;
  tag: string;
}

/** @internal */
type Message = {
  type: "action";
  key: string;
  data: MessageProps;
};

/**
 * Type of event that KMM application can broadcast to widgets.
 *
 * Widgets can register to listen to specific event using
 * @category KMM Messaging
 */
type KmmEvent =
  | {
      type: "CONCEPT_UPDATED";
    }
  | {
      type: "CONCEPT_SCHEME_UPDATED";
    };

/**
 * All event types users can listen for.
 * @category KMM Messaging
 */
type KmmEventType = "CONCEPT_UPDATED" | "CONCEPT_SCHEME_UPDATED"; // Pick<KmmEvent, "type">["type"];

/**
 * General type of an event listener.
 * @see {@link WorkbenchWidgetApi.addEventListener}
 * @category KMM Messaging
 */
type EventListener = (data: KmmEvent) => void;

/** @internal */
type MaybeResponseMessage = {
  type: "response";
  tag?: unknown;
  results?: any;
  reason?: any;
};

/** @internal */
type MaybeEventMessage = {
  type: "event";
  data?: KmmEvent;
};

/**
 * @category KMM action parameters
 */
type LabelFormValue = {
  /** The uri of type of the label */
  typeUri: string;
  /** The value of the label */
  labelValue: string;
  /**The language tag of the label */
  labelLanguage: string;
};

/**
 * @category KMM action parameters
 */
type LabelFormConfig = {
  /** `true` value makes the language code editable */
  editableLanguage: boolean;
  /** `true` value makes the type of the label editable. Type is editable by default for all alternative labels and it is always disabled for pref labels.*/
  editableType: boolean;
};

/**
 * Data transfer type for sending information about editing single label (alt or pref).
 * Used in {@link showFormAddMultipleTranslation}
 *
 * @category KMM action parameters
 */
type LabelEditFormData = {
  data: LabelFormValue;
  config: LabelFormConfig;
};

/**
 * Data transfer type for configure the way widget is opened.
 * Used in {@link openWidget}
 *
 * @category KMM action parameters
 */
type OpenWidgetConfig = {
  modal?:
    | boolean
    | {
        animation?: boolean;
        backdrop?: boolean | "static";
        keyboard?: boolean;
        size?: "sm" | "lg" | "xl" | "";
        windowClass?: "right" | "left" | "";
      };
};

/**
 * @category Widget Api
 */
export class WorkbenchWidgetApi {
  private readonly WIDGET_ID = decodeURIComponent(
    window.location.hash.substr(1).replace(/^\//, "").replace(/\+/g, " "),
  );
  private _promises: Map<string, WaitForResponse> = new Map();

  private _eventListeners: Map<string, Set<EventListener>> = new Map();

  /**
   * @param debug If set to true additional debug messages will be logged to console
   */
  constructor(private readonly debug = false) {
    window.addEventListener("message", this._receiveMessage, false);
    this._postMessage(this._createMessage("ready"));
  }

  /**
   * Registers a new listener for KMM events.
   * @param type Which event to listen for
   * @param listener Callback function that will be called with event data every time an event of type `type` will be received
   * @returns Deregistering function; when invoked removes this event listener.
   */
  addEventListener(type: KmmEventType, listener: EventListener): () => void {
    if (!this._eventListeners.has(type)) {
      this._eventListeners.set(type, new Set<EventListener>());
    }
    this._eventListeners.get(type)!.add(listener);
    return () => this._eventListeners.get(type)!.delete(listener);
  }
  /**
   * Fetch kmm version
   * @returns version of the kmm instance
   */
  getKmmVersion() {
    const message = this._createMessage("getKmmVersion");
    return this._postMessage<string>(message, 1000);
  }
  /**
   * Fetch path to main kmm api
   * @returns path to main kmm instance
   */
  getKmmApiPath() {
    const message = this._createMessage("getKmmApiPath");
    return this._postMessage<string>(message, 1000);
  }
  /**
   * Fetch path to main kmm ui
   * @returns path to main kmm instance
   */
  getKmmUiPath() {
    const message = this._createMessage("getKmmUiPath");
    return this._postMessage<string>(message, 1000);
  }
  /**
   * Fetch path to main studio instance
   * @returns path to main studio instance
   */
  getStudioPath() {
    const message = this._createMessage("getStudioPath");
    return this._postMessage<string>(message, 1000);
  }

  /**
   * Fetch path to GraphQL endpoint of studio
   * @returns string path to studio's GraphQL endpoint
   */
  getStudioGraphQLPath() {
    const message = this._createMessage("getStudioGraphQLPath");
    return this._postMessage<string>(message, 1000);
  }

  /**
   * Fetch current widget id
   */
  getCurrentWidgetId() {
    return this.WIDGET_ID;
  }

  /**
   * Fetch current host state params (modelGraphUri, taskGraphUri, itemUri).
   */
  getStateParams() {
    var message = this._createMessage("getStateParams");
    return this._postMessage<{
      taskGraphUri?: string;
      modelGraphUri?: string;
      itemUri?: string;
    }>(message);
  }

  /**
   * Fetch the context data {@link WorkbenchWidgetApi.openWidget}.
   */
  getContext() {
    var message = this._createMessage("getContext");
    return this._postMessage<{
      context: any;
    }>(message, 1000);
  }
  /**
   * Navigate host application to item.
   * @param item Item can be concept, concept scheme, relationship, class etc. existing in current task, formed as JsonLd object.
   *   You can use {@link getConceptDetails} to receive concept as JsonLd object.
   */
  navigateToItem(item: object) {
    var message = this._createMessage("navigateToItem", {
      item,
    });
    return this._postMessage<void>(message);
  }

  /**
   * Close right side panel in host application.
   * @param targetWidgetId Id of the widget to be closed. If not passed it will close itself.
   */
  closeWidget(targetWidgetId?: string) {
    var message = this._createMessage("closeWidget", {}, targetWidgetId);
    return this._postMessage<void>(message);
  }

  /**
   * Open different widget in the same model.
   * @param targetWidgetId Id of the widget to be opened.
   * @param config Optional config for opening widget.
   * @param context Optional context data. It can be fetched later by getContext {@link WorkbenchWidgetApi.getContext}.
   */
  openWidget(targetWidgetId: string, config: OpenWidgetConfig = {}, context: any = null) {
    var message = this._createMessage("openWidget", { config, context }, targetWidgetId);
    return this._postMessage<void>(message);
  }

  /**
   * Return class data for current item.
   */
  getClasses(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getClasses", taskGraphUri);
  }

  /**
   * Return all Associative Types.
   */
  getAssociativeUnfilteredTypes(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getAssociativeUnfilteredTypes", taskGraphUri);
  }

  /**
   * Return Associative Types valid for current item.
   * @param taskGraphUri
   * @param itemUri
   */
  getAssociativeTypes(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getAssociativeTypes", taskGraphUri, itemUri);
  }

  /**
   * Return all Broader Types.
   */
  getBroaderUnfilteredTypes(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getBroaderUnfilteredTypes", taskGraphUri);
  }

  /**
   * Return Broader Types valid for current item.
   */
  getBroaderTypes(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getBroaderTypes", taskGraphUri, itemUri);
  }

  /**
   * Return all Narrower Types.
   */
  getNarrowerUnfilteredTypes(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getNarrowerUnfilteredTypes", taskGraphUri);
  }

  /**
   * Return Narrower Types valid for current item.
   */
  getNarrowerTypes(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getNarrowerTypes", taskGraphUri, itemUri);
  }

  /**
   * Return Languages valid for the model.
   */
  getModelLanguages(modelGraphUri: string) {
    return this._dataSourcesWithModelUri("getModelLanguages", modelGraphUri);
  }

  /**
   * Return Semaphore Settings.
   */
  getSemaphoreSettings(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getSemaphoreSettings", taskGraphUri);
  }

  /**
   * Return All Alternative Labels Types.
   */
  getAltLabelUnfilteredProperties(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getAltLabelUnfilteredProperties", taskGraphUri, itemUri);
  }

  /**
   * Return Alternative Labels Types valid for item.
   */
  getAltLabelProperties(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getAltLabelProperties", taskGraphUri, itemUri);
  }

  /**
   * Return Metadata types.
   */
  getMetadataUnfilteredTypes(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getMetadataUnfilteredTypes", taskGraphUri, itemUri);
  }

  /**
   * Return Metadata types valid for item.
   */
  getMetadataTypes(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getMetadataTypes", taskGraphUri, itemUri);
  }

  /**
   * Return Item with metadata properties.
   */
  getDetailsWithMetadata(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getDetailsWithMetadata", taskGraphUri, itemUri);
  }

  /**
   *  Return both default metadata and metadata specific for given domain.
   */
  getMetadataForDomain(taskGraphUri: string, domainUri: string) {
    return this._dataSourceWithItemAndDomainUri("getMetadataForDomain", taskGraphUri, domainUri);
  }

  /**
   *  Return all concept schemes for given task.
   */
  getConceptSchemes(taskGraphUri: string) {
    return this._dataSourcesWithTaskUri("getConceptSchemes", taskGraphUri);
  }

  /**
   *  Return concept details.
   */
  getConceptDetails(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getConceptDetails", taskGraphUri, itemUri);
  }

  /**
   *  Return concept guid data.
   */
  getConceptGuid(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getConceptGuid", taskGraphUri, itemUri);
  }

  /**
   *  Return concept details with preferred labels.
   */
  getConceptPrefLabels(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getConceptPrefLabels", taskGraphUri, itemUri);
  }

  /**
   *  Return concept details with alternative labels.
   */
  getConceptAltLabels(taskGraphUri: string, itemUri: string) {
    return this._dataSourcesWithTaskAndItemUri("getConceptAltLabels", taskGraphUri, itemUri);
  }

  /**
   *  Return concept details with associative concepts grouped by relation type.
   */
  getConceptRelated(taskGraphUri: string, itemUri: string, limit: number = 10, offset: number = 0) {
    return this._dataSourcesWithTaskAndItemUriAndPaging("getConceptRelated", taskGraphUri, itemUri, limit, offset);
  }

  /**
   *  Return concept details with narrower concepts grouped by relation type.
   */
  getConceptNarrower(taskGraphUri: string, itemUri: string, limit: number = 10, offset: number = 0) {
    return this._dataSourcesWithTaskAndItemUriAndPaging("getConceptNarrower", taskGraphUri, itemUri, limit, offset);
  }

  /**
   *  Return concept details with broader concepts grouped by relation type.
   */
  getConceptBroader(taskGraphUri: string, itemUri: string, limit: number = 10, offset: number = 0) {
    return this._dataSourcesWithTaskAndItemUriAndPaging("getConceptBroader", taskGraphUri, itemUri, limit, offset);
  }

  /**
   *  Return concept scheme details with top concepts.
   */
  getTopConcepts(taskGraphUri: string, itemUri: string, limit: number = 10, offset: number = 0) {
    return this._dataSourcesWithTaskAndItemUriAndPaging("getTopConcepts", taskGraphUri, itemUri, limit, offset);
  }

  /**
   * Actions can be used to use Workbench functionality directly.
   */
  actions = {
    /**
     * Calls action.
     * @param action name of the particular action.
     * @param data data needed for particular action.
     */
    call: this._actionCall.bind(this),
    /**
     * Shows form for add new Preferred Label.
     * @param name default value for the name field.
     * @param langCode - default language code to be selected - if not exist
     *        default code for the system is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddPrefLabel: (name: string, langCode: string, initialSave = false) =>
      this._actionCall("showFormAddPrefLabel", {
        name: name,
        langCode: langCode,
        initialSave: Boolean(initialSave),
      }),
    /**
     * Shows form for add new Alternative Label.
     * @param name - default value for the name field.
     * @param langCode - default language code to be selected - if not exist
     * @param typeUri - default type uri to be selected - if not exist
     * default type for the system is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddAltLabel: (name: string, langCode: string, typeUri: string, initialSave = false) =>
      this._actionCall("showFormAddAltLabel", {
        name: name,
        langCode: langCode,
        typeUri: typeUri,
        initialSave: Boolean(initialSave),
      }),
    /**
     * Shows form for add new Multiple Alternative Labels.
     * @param names {Array} - default value for the names field.
     * @param langCode - default language code to be selected - if not exist
     * @param typeUri - default type uri to be selected - if not exist
     * default type for the system is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddMultipleAltLabel: (names: string, langCode: string, typeUri: string, initialSave = false) =>
      this._actionCall("showFormAddMultipleAltLabel", {
        names: names,
        langCode: langCode,
        typeUri: typeUri,
        initialSave: Boolean(initialSave),
      }),
    /**
     * Shows form for add new Multiple Translations Labels.
     * @param rows - Translations that needs to be populated to the form.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddMultipleTranslation: (rows: Array<LabelEditFormData>, initialSave = false) =>
      this._actionCall("showFormAddMultipleTranslation", {
        rows,
        initialSave: Boolean(initialSave),
      }),
    /**
     * Shows form for add new Related relation to the target Concept.
     * @param typeUri - default type uri to be selected - if not exist
     * default type for the system is used.
     * @param targetUri - Target concept uri to be selected - if not exist
     * empty value is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddRelated: (typeUri: string, targetUri: string, targetName: string, initialSave = false) =>
      this._actionCall("showFormAddRelated", {
        typeUri: typeUri,
        targetUri: targetUri,
        targetName: targetName,
        initialSave: Boolean(initialSave),
      }),
    /**
     * Shows form for add new Broader relation to the target Concept.
     * @param typeUri - default type uri to be selected - if not exist
     * default type for the system is used.
     * @param targetUri - Target concept uri to be selected - if not exist
     * empty value is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddBroader: (typeUri: string, targetUri: string, targetName: string, initialSave = false) =>
      this._actionCall("showFormAddBroader", {
        typeUri: typeUri,
        targetUri: targetUri,
        targetName: targetName,
        initialSave: Boolean(initialSave),
      }),

    /**
     * Shows form for add new Narrower relation to the target Concept.
     * @param typeUri - default type uri to be selected - if not exist
     * default type for the system is used.
     * @param targetUri - Target concept uri to be selected - if not exist
     * empty value is used.
     * @param initialSave - If it is true the save action is called and inf it succeed the form will disappear.
     */
    showFormAddNarrower: (typeUri: string, targetUri: string, targetName: string, initialSave = false) =>
      this._actionCall("showFormAddNarrower", {
        typeUri: typeUri,
        targetUri: targetUri,
        targetName: targetName,
        initialSave: Boolean(initialSave),
      }),
  };

  private _actionCall(action: string, data: object) {
    const message = this._createMessage("callAction", {
      action,
      data,
    });
    return this._postMessage(message);
  }

  private _getBackendData<Result>(
    backendFunction: string,
    backendArguments: { [key: string]: string | number | undefined },
  ) {
    const message = this._createMessage("getBackendData", {
      backendFunction,
      backendArguments,
    });
    return this._postMessage<Result>(message);
  }

  private _dataSourcesWithTaskAndItemUri<Result = unknown>(
    backendFunction: string,
    taskGraphUri: string,
    itemUri: string,
  ) {
    return this._getBackendData<Result>(backendFunction, {
      taskGraphUri,
      itemUri,
    });
  }

  private _dataSourcesWithTaskAndItemUriAndPaging<Result = unknown>(
    backendFunction: string,
    taskGraphUri: string,
    itemUri: string,
    limit: number,
    offset: number,
  ) {
    return this._getBackendData<Result>(backendFunction, {
      taskGraphUri,
      itemUri,
      limit,
      offset,
    });
  }

  private _dataSourceWithItemAndDomainUri<Result = unknown>(
    backendFunction: string,
    taskGraphUri: string,
    domainUri: string,
  ) {
    return this._getBackendData<Result>(backendFunction, {
      taskGraphUri,
      domainUri,
    });
  }

  private _dataSourcesWithTaskUri<Result = unknown>(backendFunction: string, taskGraphUri: string) {
    return this._getBackendData<Result>(backendFunction, { taskGraphUri });
  }

  private _dataSourcesWithModelUri<Result = unknown>(backendFunction: string, modelGraphUri: string) {
    return this._getBackendData<Result>(backendFunction, { modelGraphUri });
  }

  private withOnlyDefinedValues = (obj: SimpleObject<any>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, value]) => value != null));

  private _postIndex = 0;
  private _generateTag() {
    this._postIndex++;
    return this.WIDGET_ID + "_" + this._postIndex;
  }
  private _createMessage(key: string, additionalData: SimpleObject = {}, widgetId = this.WIDGET_ID): Message {
    const tag = this._generateTag();
    return {
      type: "action",
      key,
      data: {
        ...this.withOnlyDefinedValues(additionalData),
        widgetId,
        tag,
      },
    };
  }

  private _postMessage = <Result>(message: Message, timeout: number = 60000): Promise<Result> => {
    const waitForResponse: Partial<WaitForResponse> = {};
    waitForResponse.promise = new Promise((resolve, reject) => {
      waitForResponse.resolve = resolve;
      waitForResponse.reject = reject;
      waitForResponse.timeoutID = setTimeout(() => {
        reject("Host response timeout");
      }, timeout) as unknown as number;
    });
    waitForResponse.promise.finally(() => {
      clearTimeout(waitForResponse.timeoutID);
      this._promises.delete(message.data.tag);
    })

    this._promises.set(message.data.tag, waitForResponse as WaitForResponse);
    window.parent.postMessage(decycle(message), "*");
    this._logMessage("postMessage", message, timeout);
    return waitForResponse.promise;
  };

  private _handleResponseMessage(eventMessage: MaybeResponseMessage) {
    const responseTag = eventMessage?.tag;
    if (responseTag && this._promises.has(responseTag as string)) {
      const waitForResponse = this._promises.get(responseTag as string)!;
      if (eventMessage.results !== undefined) {
        waitForResponse.resolve(retrocycle(eventMessage.results));
      } else if (eventMessage.reason !== undefined) {
        waitForResponse.reject(retrocycle(eventMessage.reason));
      } else {
        this._logError("Response message need results or reason in data.");
      }
      this._promises.delete(responseTag as string);
    }
  }

  private _handleEventMessage({ data }: MaybeEventMessage) {
    if (typeof data === "object" && hasOwnProperty(data, "type")) {
      const listeners = this._eventListeners.get(data.type) ?? new Set();
      listeners.forEach((listener) => listener(data));
    }
  }

  private _receiveMessage = (event: MessageEvent<MaybeResponseMessage | MaybeEventMessage | unknown>) => {
    this._logMessage("receiveMessage", event);
    if (typeof event.data === "object" && event.data != null) {
      const data = event.data;
      if (hasOwnProperty(data, "type") && typeof data.type === "string") {
        switch (data.type) {
          case "response": {
            this._handleResponseMessage(event.data as MaybeResponseMessage);
            break;
          }
          case "event": {
            this._handleEventMessage(event.data as MaybeEventMessage);
            break;
          }
        }
      }
    }
  };

  private _logMessage(...args: any[]) {
    if (this.debug) {
      console.log(...args);
    }
  }

  private _logError(...args: any[]) {
    if (this.debug) {
      console.error(...args);
    }
  }
}
