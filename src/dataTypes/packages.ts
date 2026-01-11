type PackageDetail = {
  place: string;
  time: string;
  description: string;
};

export interface Package {
  id: string;
  countryId: string;
  title: string;
  subtitle: string;
  mainTitle: string;
  description: string;
  price: number;
  imageURL: string;
  duration: number;
  details: PackageDetail[];
}
