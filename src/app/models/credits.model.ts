export interface Credits{
  id: number;
  cast: Actor[];
  crew: any;
}

export interface Actor{
  profile_path: string;
  name: string;
  character: string;
}
