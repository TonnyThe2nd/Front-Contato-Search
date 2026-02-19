import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarContatoComponent } from './alterar-contato.component';

describe('AlterarContatoComponent', () => {
  let component: AlterarContatoComponent;
  let fixture: ComponentFixture<AlterarContatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarContatoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
