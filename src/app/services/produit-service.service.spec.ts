import { TestBed } from '@angular/core/testing';

import { ProduitServiceService } from './produit-service.service';

describe('ProduitServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitServiceService = TestBed.get(ProduitServiceService);
    expect(service).toBeTruthy();
  });
});
