import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProduitServiceService} from '../services/produit-service.service';

@Injectable()
export class ProduitResolver implements Resolve<any> {
  constructor(private produitService: ProduitServiceService) {

  }
  resolve() {
    return this.produitService.getProduits();
  }

}
