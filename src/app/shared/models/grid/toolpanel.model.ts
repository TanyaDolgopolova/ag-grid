export default class ToolPanelModel {
    constructor(
        id: string,
        labelDefault: string,
        labelKey: string,
        iconKey?: string,
        toolPanel?: string,
        toolPanelParams?: object
    ) {
        this.id = id;
        this.labelDefault = labelDefault;
        this.labelKey = labelKey;
        this.iconKey = iconKey;
        this.toolPanel = toolPanel;
        toolPanelParams = toolPanelParams;
    }

    id: string;
    labelDefault: string;
    labelKey: string;
    iconKey?: string;
    toolPanel?: string;
    toolPanelParams?: object;
}
