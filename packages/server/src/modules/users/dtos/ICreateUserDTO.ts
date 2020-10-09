export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  stations: string[];
  stations_names: string[];
}