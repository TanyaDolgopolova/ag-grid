import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridSelectionService } from 'app/shared/services/grid-selection.service';
import { minSelectionCount, row } from 'app/shared/constants';

@Component({
    selector: 'app-checkbox-cell',
    templateUrl: '../checkbox.component.html',
    styleUrls: ['../checkbox.component.scss']
})
export class CustomCheckboxCellComponent
    implements ICellRendererAngularComp, OnDestroy {
    private destroy: Subject<boolean> = new Subject<boolean>();
    private maxSelection: number;
    public checked: boolean;

    constructor(private readonly selectionService: GridSelectionService) {}

    public agInit(params) {
        this.maxSelection = params.maxSelection
            ? params.maxSelection
            : minSelectionCount;

        this.selectionService.totalSelected
            .pipe(takeUntil(this.destroy))
            .subscribe(count => {
                if (count === this.maxSelection) {
                    this.checked = true;
                } else if (count === minSelectionCount) {
                    this.checked = false;
                }
            });
    }

    public ngOnDestroy() {
        this.selectionService.TotalSelected = minSelectionCount;
        this.destroy.next();
        this.destroy.complete();
    }

    public refresh(): boolean {
        return true;
    }

    public afterGuiAttached?(params?: IAfterGuiAttachedParams) {}

    public handleCheckboxChange(value) {
        this.checked = value.currentTarget.checked;
        this.selectionService.TotalSelected = this.checked
            ? this.selectionService.TotalSelected + row
            : this.selectionService.TotalSelected - row;
    }
}
