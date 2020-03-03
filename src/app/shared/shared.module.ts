import { NgModule } from '@angular/core';
import { GridModule } from './components/grid/grid.module';

const sharedModules = [GridModule];

@NgModule({
    imports: [...sharedModules],
    exports: [...sharedModules]
})
export class SharedModule {}
