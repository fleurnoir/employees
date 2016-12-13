export interface INamedEntity {
  id: number;
  name: string;
}

export class NamedEntity implements INamedEntity {
  id: number;
  name: string; 
  constructor(obj: INamedEntity) {
    this.id = obj.id;
    this.name = obj.name;
  }
}

export class Company extends NamedEntity {
  constructor(obj: INamedEntity) {
    super(obj);
  }
}

export class Department extends NamedEntity {
  constructor(obj: INamedEntity) {
    super(obj);
  }
}

export class Position extends NamedEntity {
  constructor(obj: INamedEntity) {
    super(obj);
  }
}