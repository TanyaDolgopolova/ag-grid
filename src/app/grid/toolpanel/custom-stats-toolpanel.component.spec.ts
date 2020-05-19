import { TestBed, async } from "@angular/core/testing";
import { CustomStatsToolPanelComponent } from "./custom-stats-toolpanel.component";
import { GridSelectionService } from "app/shared/services/grid-selection.service";
import { Type } from "@angular/core";

describe("CustomStatsToolPanelComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GridSelectionService],
      declarations: [CustomStatsToolPanelComponent]
    }).compileComponents();
  }));

  describe("#init", () => {
    function setup() {
      const fixture = TestBed.createComponent(CustomStatsToolPanelComponent);
      const app = fixture.debugElement.componentInstance;
      const gridSelectionService = fixture.debugElement.injector.get<
        GridSelectionService
      >(GridSelectionService as Type<GridSelectionService>);

      return { fixture, app, gridSelectionService };
    }

    it("should create the CustomStatsToolPanel component", () => {
      const { app } = setup();
      expect(app).toBeTruthy();
    });
  });
});
