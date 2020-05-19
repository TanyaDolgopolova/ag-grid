import { Component, OnDestroy } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GridSelectionService } from "app/shared/services/grid-selection.service";
import { minSelectionCount, row } from "app/shared/constants";

@Component({
  selector: "app-checkbox-cell",
  templateUrl: "./custom-checkbox-cell.component.html",
  styleUrls: ["../checkbox.component.scss"]
})
export class CustomCheckboxCellComponent
  implements ICellRendererAngularComp, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  private maxSelection: number;
  public params: any;

  constructor(private readonly selectionService: GridSelectionService) {}

  public agInit(params) {
    this.params = params;
    this.maxSelection = params.maxSelection
      ? params.maxSelection
      : minSelectionCount;

    this.selectionService.totalSelected
      .pipe(takeUntil(this.destroy))
      .subscribe(count => {
        if (count === this.maxSelection) {
          this.params.value = true;
        } else if (count === minSelectionCount) {
          this.params.value = false;
        }
      });
  }

  public ngOnDestroy() {
    if (this.selectionService.TotalSelected != 0) {
      this.selectionService.TotalSelected -= row;
    }
    this.destroy.next();
    this.destroy.complete();
  }

  public refresh(): boolean {
    return true;
  }

  public handleCheckboxChange(value) {
    this.params.value = value.currentTarget.checked;
    this.selectionService.TotalSelected = this.params.value
      ? this.selectionService.TotalSelected + row
      : this.selectionService.TotalSelected - row;
  }
}
