import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { GridSelectionService } from "app/shared/services/grid-selection.service";
import { CustomCheckboxHeaderComponent } from "./custom-checkbox-header.component";

describe("CustomCheckboxHeaderComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GridSelectionService],
      declarations: [CustomCheckboxHeaderComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  describe("#init", () => {
    function setup() {
      const fixture = TestBed.createComponent(CustomCheckboxHeaderComponent);
      const app = fixture.debugElement.componentInstance;
      const customCheckboxHeaderComponent = fixture.debugElement.injector.get(
        GridSelectionService
      );

      return { fixture, app, customCheckboxHeaderComponent };
    }

    it("should create the CustomCheckboxHeaderComponent component", () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });
  });
});
