import { Component, OnDestroy } from '@angular/core';
import { IStatusPanelParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridSelectionService } from 'app/shared/services/grid-selection.service';

@Component({
    selector: 'app-custom-stats',
    templateUrl: './custom-stats-toolpanel.component.html',
    styleUrls: ['./custom-stats-toolpanel.component.scss']
})
export class CustomStatsToolPanelComponent implements OnDestroy {
    private destroy: Subject<boolean> = new Subject<boolean>();
    private params;
    public selectedCount: number;
    public totalRecordCount: number;

    constructor(private readonly selectionService: GridSelectionService) {}

    public agInit(params: IStatusPanelParams) {
        this.params = params;
        this.selectedCount = 0;
        this.totalRecordCount = 0;

        this.params.api.addEventListener(
            'modelUpdated',
            this.updateTotals.bind(this)
        );

        this.selectionService.totalSelected
            .pipe(takeUntil(this.destroy))
            .subscribe(count => (this.selectedCount = count));
    }

    public ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

    public selectionModeChange(values) {
        this.selectionService.SelectionMode = values.currentTarget.checked;
    }

    private updateTotals() {
        this.totalRecordCount = this.params.api.getModel().rowsToDisplay.length;
    }
}
