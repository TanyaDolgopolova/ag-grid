import { Component, OnDestroy } from "@angular/core";
import { IHeaderGroupAngularComp } from "ag-grid-angular";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { GridSelectionService } from "app/shared/services/grid-selection.service";
import { minSelectionCount } from "app/shared/constants";

@Component({
  selector: "app-checkbox-header",
  templateUrl: "./custom-checkbox-header.component.html",
  styleUrls: ["../checkbox.component.scss"]
})
export class CustomCheckboxHeaderComponent
  implements IHeaderGroupAngularComp, OnDestroy {
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
      .subscribe(count => (this.checked = count === this.maxSelection));
  }

  public ngOnDestroy() {
    this.selectionService.TotalSelected = minSelectionCount;
    this.destroy.next();
    this.destroy.complete();
  }

  public handleCheckboxChange(value) {
    this.checked = value.currentTarget.checked;
    this.selectionService.TotalSelected = this.checked
      ? this.maxSelection
      : minSelectionCount;
  }
}
