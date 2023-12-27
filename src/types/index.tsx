export interface IUser {
  password: string;
  id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  location: {
    region?: string;
    city?: string;
    district?: string;
  };
  organisation: string;
  secret: string;
  hideContacts: boolean;
}

export interface IAuthInputsTypes {
  email: string;
  password: string;
}

export interface IUserInitialState {
  token: string | null;
  status: string;
  userId: number | null;
  role: string | null;
}
export interface IPet {
  id: string;
  nickname: string;
  img?: string;
  gender?: string;
  city?: string;
  date?: string;
  vaccination: boolean;
  sterilization: boolean;
  type?: string;
  age?: string;
  favorite: boolean;
  category: string;
}

export interface IAddFavoriteData {
  userId: number;
  postId: number;
}

export interface IBreeds {
  dogs: Array<{
    label: string;
    value: string;
  }>;
  cats: Array<{
    label: string;
    value: string;
  }>;
}
