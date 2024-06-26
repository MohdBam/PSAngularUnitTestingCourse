import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroesComponent } from "./heroes.component"
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('HeroesComponent deep integration tests where children are tested', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 50}
    ];
    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  })

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES))

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponentsDEs.length).toBe(3);
    for (let i=0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's
    delete button is clicked`, () => {
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValue(of(HEROES))

      // run ngOnInit
      fixture.detectChanges();

      const heroComponentsDEs = fixture.debugElement.queryAll(By.directive(HeroComponent))

      heroComponentsDEs[0].query(By.css('button'))
        .triggerEventHandler('click', {stopPropagation: () => {}});

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    })
})
