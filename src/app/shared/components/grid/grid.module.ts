import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { YoutubeService } from 'app/core/services/youtube.service';
import { CustomStatsToolPanelComponent } from './toolpanel/custom-stats-toolpanel.component';
import { CustomCheckboxCellComponent } from './checkbox/checkbox-cell/custom-checkbox-cell.component';
import { CustomCheckboxHeaderComponent } from './checkbox/checkbox-header/custom-checkbox-header.component';
import { GridComponent } from './grid.component';
import { GridSelectionService } from 'app/shared/services/grid-selection.service';

const sharedComponents = [GridComponent];
const gridComponents = [
    CustomStatsToolPanelComponent,
    CustomCheckboxCellComponent,
    CustomCheckboxHeaderComponent
];

const services = [YoutubeService, GridSelectionService];

@NgModule({
    declarations: [...sharedComponents, ...gridComponents],
    providers: [...services],
    imports: [AgGridModule.withComponents([...gridComponents])],
    exports: [...sharedComponents]
})
export class GridModule {}
