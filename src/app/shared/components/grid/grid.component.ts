import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, takeUntil } from 'rxjs/operators';
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { Module } from '@ag-grid-enterprise/all-modules';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { CustomStatsToolPanelComponent } from './toolpanel/custom-stats-toolpanel.component';
import { CustomCheckboxHeaderComponent } from './checkbox/checkbox-header/custom-checkbox-header.component';
import { CustomCheckboxCellComponent } from './checkbox/checkbox-cell/custom-checkbox-cell.component';
import { Subject } from 'rxjs';
import { YoutubeService } from 'app/core/services/youtube.service';
import { GridSelectionService } from 'app/shared/services/grid-selection.service';
import IYoutubeStatisticModel from 'app/core/models/response/youtube/youtubeStatistic.model';
import {
    checkboxWidth,
    imageWidth,
    imageHeight,
    descriptionWidth
} from 'app/shared/constants';
import YoutubeRowDataModel from 'app/shared/models/grid/youtubeRowData.model';
import MenuItemModel from 'app/shared/models/grid/menuItemDef.model';
import ColumnDefaultModel from 'app/shared/models/grid/columnDef.model';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
    private gridApi;
    private gridColumnApi;
    private destroy: Subject<boolean> = new Subject<boolean>();
    public rowData: YoutubeRowDataModel[];
    public modules: Module[];
    public statusBar: { [key: string]: any };
    public frameworkComponents: { [key: string]: any };

    constructor(
        private readonly youtubeService: YoutubeService,
        private readonly selectionService: GridSelectionService
    ) {}

    public ngOnInit() {
        this.rowData = [];
        this.modules = [ClipboardModule];
        this.frameworkComponents = {
            customStatsToolPanel: CustomStatsToolPanelComponent,
            customCheckboxHeaderComponent: CustomCheckboxHeaderComponent,
            customCheckboxCellComponent: CustomCheckboxCellComponent
        };

        this.statusBar = {
            statusPanels: [
                {
                    statusPanel: 'customStatsToolPanel'
                }
            ]
        };

        this.selectionService.selectionMode
            .pipe(takeUntil(this.destroy))
            .subscribe((isChecked: boolean) => {
                if (this.gridApi && this.gridColumnApi) {
                    this.gridColumnApi.setColumnVisible('checkbox', isChecked);
                    this.gridApi.sizeColumnsToFit();
                }
            });
    }

    public onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.youtubeService
            .getYoutubeVideoData()
            .pipe(
                map((data: IYoutubeStatisticModel) => data.items),
                map(data =>
                    data.map(
                        video =>
                            new YoutubeRowDataModel(
                                video.snippet.thumbnails.default.url,
                                video.snippet.publishedAt,
                                `https://www.youtube.com/watch?v=${video.id.videoId}`,
                                video.snippet.description
                            )
                    )
                ),
                takeUntil(this.destroy)
            )
            .subscribe(items => {
                this.rowData = items;
                this.initializeColumns();
                this.gridApi.sizeColumnsToFit();
            });
    }

    public ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

    public getContextMenuItems(params) {
        const result = [];
        if (params.column.colDef.field === 'title') {
            const item = new MenuItemModel();
            item.name = 'Open in new Tab';
            item.action = () => window.open(params.value, '_blank');
            result.push(item);
            result.push('separator');
        }
        result.push('copy');
        return result;
    }

    private initializeColumns() {
        const newColDef = [];
        const checkboxColumn = new ColumnDefaultModel({
            headerName: '',
            field: 'checkbox',
            width: checkboxWidth,
            hide: true,
            headerComponent: 'customCheckboxHeaderComponent',
            headerComponentParams: {
                maxSelection: this.rowData.length
            },
            cellRenderer: 'customCheckboxCellComponent',
            cellRendererParams: {
                maxSelection: this.rowData.length
            }
        });

        const thumbnailsColumn = new ColumnDefaultModel({
            headerName: '',
            field: 'thumbnails',
            width: imageWidth,
            autoHeight: true,
            cellRenderer: this.generateImage,
            cellRendererParams: {
                width: imageWidth,
                height: imageHeight
            },
            cellStyle: { padding: '0' }
        });

        const publishedAtColumn = new ColumnDefaultModel({
            headerName: 'Published on',
            field: 'publishedAt'
        });

        const titleColumn = new ColumnDefaultModel({
            headerName: 'Video Title',
            field: 'title',
            cellRenderer: this.generateLink
        });

        const descriptionColumn = new ColumnDefaultModel({
            headerName: 'Description',
            field: 'description',
            width: descriptionWidth,
            cellStyle: { 'white-space': 'normal' }
        });

        newColDef.push(
            checkboxColumn,
            thumbnailsColumn,
            publishedAtColumn,
            titleColumn,
            descriptionColumn
        );
        this.gridApi.setColumnDefs(newColDef);
    }

    private generateLink(params) {
        return !params.node.group
            ? `<a href="${params.value}">${params.value}</a>`
            : null;
    }

    private generateImage(params) {
        return !params.node.group
            ? `<img border="0" width="${params.width}" height="${params.height}" src="${params.value}"/>`
            : null;
    }
}
