export interface IHero {
  id: number;
  name: string;
  color?: string;
}

export class Hero implements IHero {
  constructor(public id: number, public name: string, public color?: string) {}
}
