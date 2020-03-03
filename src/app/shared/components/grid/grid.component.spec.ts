import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GridComponent } from './grid.component';
import { YoutubeService } from 'app/core/services/youtube.service';
import { GridSelectionService } from 'app/shared/services/grid-selection.service';

describe('GridComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [GridSelectionService, YoutubeService],
            declarations: [GridComponent],
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));

    describe('#init', () => {
        function setup() {
            const fixture = TestBed.createComponent(GridComponent);
            const app = fixture.debugElement.componentInstance;
            const gridComponent = fixture.debugElement.injector.get(
                GridSelectionService
            );

            return { fixture, app, gridComponent };
        }

        it('should create the GridComponent component', () => {
            const { app } = setup();
            expect(app).toBeTruthy();
        });
    });
});
