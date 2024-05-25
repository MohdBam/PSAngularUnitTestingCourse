import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
describe('HeroComponent', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 50}
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    component = new HeroesComponent(mockHeroService);
  })

  it('should remove the indicated hero from the heroes list', () => {
    mockHeroService.deleteHero.and.returnValue(of(true))
    component.heroes = HEROES;
    const deletedHero = HEROES[1];

    component.delete(deletedHero);

    expect(component.heroes.length).toBe(2);
    expect(component.heroes === HEROES.filter(h => h === deletedHero));
  })

  it('should call deleteHero in HeroService', () => {
    mockHeroService.deleteHero.and.returnValue(of(true))
    component.heroes = HEROES;
    const deletedHero = HEROES[1];

    component.delete(deletedHero);

    expect(mockHeroService.deleteHero).toHaveBeenCalledWith(deletedHero);
  })
})
