interface IColumnDefaultModel {
    field: string;
    headerName: string;
    width?: number;
    height?: number;
    autoWidth?: boolean;
    autoHeight?: boolean;
    hide?: boolean;
    cellRenderer?: string | object | ((params: any) => void);
    cellRendererParams?: object;
    cellStyle?: object;
    headerComponent?: string;
    headerComponentParams?: object;
}

export default class ColumnDefaultModel {
    constructor(model: IColumnDefaultModel) {
        this.headerName = model.headerName;
        this.field = model.field;
        this.width = model?.width;
        this.height = model?.height;
        this.autoWidth = model?.autoWidth;
        this.autoHeight = model?.autoHeight;
        this.hide = model?.hide;
        this.cellRenderer = model?.cellRenderer;
        this.cellRendererParams = model?.cellRendererParams;
        this.cellStyle = model?.cellStyle;
        this.headerComponent = model?.headerComponent;
        this.headerComponentParams = model?.headerComponentParams;
    }

    headerName: string;
    field: string;
    width: number;
    height: number;
    autoWidth: boolean;
    autoHeight: boolean;
    hide: boolean;
    cellRenderer: string | object | ((params: any) => void);
    cellRendererParams: object;
    cellStyle: object;
    headerComponent: string;
    headerComponentParams: object;
}
