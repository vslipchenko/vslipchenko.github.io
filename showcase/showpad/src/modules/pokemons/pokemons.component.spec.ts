import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PokemonsComponent} from './pokemons.component';
import {PokemonService} from '~services/pokemon/pokemon.service';
import {MatDialog} from '@angular/material/dialog';
import {SnackbarService} from '~services/snackbar/snackbar.service';
import {Router} from '@angular/router';
import {StorageService} from '~services/storage/storage.service';
import {of} from 'rxjs';

const POKEMON_LIST_MOCK_DATA = {total: 1, data: [{name: 'ditto'}]};

const POKEMON_SERVICE_MOCK = {
  getPokemonList: () => of([{name: 'ditto'}]),
  getPokemonByName: () => of({name: 'ditto'}),
};

const MAT_DIALOG_MOCK = {
  open: () => {},
};

const SNACKBAR_MOCK = {
  show: () => {},
};

const ROUTER_MOCK = {
  navigate: () => {},
};

const STORAGE_MOCK = {
  saveToList: () => {},
};

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonsComponent],
      providers: [
        {provide: PokemonService, useValue: POKEMON_SERVICE_MOCK},
        {provide: MatDialog, useValue: MAT_DIALOG_MOCK},
        {provide: SnackbarService, useValue: SNACKBAR_MOCK},
        {provide: Router, useValue: ROUTER_MOCK},
        {provide: StorageService, useValue: STORAGE_MOCK},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch list of pokemons on init', () => {
    const spyGetFilteredPokemonList$ = spyOn(component as any, 'getFilteredPokemonList$').and.returnValue(
      of(POKEMON_LIST_MOCK_DATA),
    );

    component.ngOnInit();

    expect(spyGetFilteredPokemonList$).toHaveBeenCalled();
    expect(component.pokemonData$.getValue()).toEqual(POKEMON_LIST_MOCK_DATA);
  });

  it('should open dialog', () => {
    const dialogMock: any = fixture.componentRef.injector.get(MatDialog);
    const spyDialogOpen = spyOn(dialogMock, 'open').and.returnValue({
      afterClosed: () => of(),
      componentInstance: {
        open: of(),
        addToWishlist: of(),
        addToIveCaught: of(),
      },
    });

    component.openRowMenu({name: 'ditto'});
    expect(spyDialogOpen).toHaveBeenCalled();
  });

  it('should load page', () => {
    const spyGetFilteredPokemonList$ = spyOn(component as any, 'getFilteredPokemonList$').and.returnValue(
      of(POKEMON_LIST_MOCK_DATA),
    );

    component.loadPage(1);

    expect(spyGetFilteredPokemonList$).toHaveBeenCalledWith(0, 10);
  });

  it('should search pokemon', () => {
    const pokemonServiceMock: any = fixture.componentRef.injector.get(PokemonService);
    const spyGetPokemonByName = spyOn(pokemonServiceMock, 'getPokemonByName').and.returnValue(of({name: 'ditto'}));

    component.search('ditto');

    expect(spyGetPokemonByName).toHaveBeenCalledWith('ditto');
  });
});
