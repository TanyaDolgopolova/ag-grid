import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GridSelectionService {
    private currentSelectionMode: BehaviorSubject<
        boolean
    > = new BehaviorSubject<boolean>(false);
    private currentTotalSelected: BehaviorSubject<number> = new BehaviorSubject<
        number
    >(0);
    public selectionMode: Observable<boolean>;
    public totalSelected: Observable<number>;

    constructor() {
        this.totalSelected = this.currentTotalSelected.asObservable();
        this.selectionMode = this.currentSelectionMode.asObservable();
    }

    public set SelectionMode(selected: boolean) {
        this.currentSelectionMode.next(selected);
    }
    public get SelectionMode() {
        return this.currentSelectionMode.getValue();
    }

    public set TotalSelected(count: number) {
        this.currentTotalSelected.next(count);
    }
    public get TotalSelected() {
        return this.currentTotalSelected.getValue();
    }
}
