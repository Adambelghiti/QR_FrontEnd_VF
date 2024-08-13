export interface Article {
  serialNumber: number;
  nom: string;
  longueur: number;
  largeur: number;
  hauteur: number;
  categorie: string;
  entrepot?: {
    nom: string;
  };
  fabricant?: {
    name: string;
  };
  fournisseur?: {
    name: string;
  };
}
