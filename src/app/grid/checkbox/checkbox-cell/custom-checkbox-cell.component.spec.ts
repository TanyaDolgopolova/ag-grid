import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { GridSelectionService } from "app/shared/services/grid-selection.service";
import { CustomCheckboxCellComponent } from "./custom-checkbox-cell.component";

describe("CustomCheckboxCellComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GridSelectionService],
      declarations: [CustomCheckboxCellComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  describe("#init", () => {
    function setup() {
      const fixture = TestBed.createComponent(CustomCheckboxCellComponent);
      const app = fixture.debugElement.componentInstance;
      const customCheckboxCellComponent = fixture.debugElement.injector.get(
        GridSelectionService
      );

      return { fixture, app, customCheckboxCellComponent };
    }

    it("should create the CustomCheckboxCellComponent component", () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });
  });
});
