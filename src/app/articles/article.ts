export interface Article {
  serialNumber?: number;
  nom: string;
  longueur: string;
  largeur: string;
  hauteur: string;
  categorie: string;
  entrepot?: {
    id: number;
    nom: string;
  };
  fabricant?: {
    id: number;
    name: string;
  };
  fournisseur?: {
    id: number;
    name: string;
  };
  codeQr?: string;
}
