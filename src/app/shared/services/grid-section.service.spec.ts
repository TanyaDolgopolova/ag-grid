import { TestBed } from '@angular/core/testing';
import { GridSelectionService } from './grid-selection.service';

describe('GridSectionService:', () => {
    let service: GridSelectionService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GridSelectionService]
        });
        service = TestBed.inject(GridSelectionService);
    });

    describe('#getSelectionModeValue', () => {
        it('should return selected value from observable', (done: DoneFn) => {
            const mockValue = true;
            service.SelectionMode = mockValue;
            service.selectionMode.subscribe(value => {
                expect(value).toBe(mockValue);
                done();
            });
        });
    });

    describe('#getTotalSelectedValue', () => {
        it('should return selected value from observable', (done: DoneFn) => {
            const mockValue = 14;
            service.TotalSelected = mockValue;
            service.totalSelected.subscribe(value => {
                expect(value).toBe(mockValue);
                done();
            });
        });
    });
});
