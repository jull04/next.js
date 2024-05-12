export type Breed = {
  name: string;
  temperament: string;
  description: string;
  vcahospitals_url?: string; 
}

export type CatImage = {
  id: string;
  url: string;
  breeds: Breed[];
};

export type Error = {
  message: string;
};
