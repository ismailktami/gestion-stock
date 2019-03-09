import { TestBed } from '@angular/core/testing';

import { ProduitMockServiceService } from './produit-mock-service.service';

describe('ProduitMockServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProduitMockServiceService = TestBed.get(ProduitMockServiceService);
    expect(service).toBeTruthy();
  });
});
