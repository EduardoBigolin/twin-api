import { Exaction, StatusCode } from "../common/Exaction";

export class Name {
  public name: string;
  constructor(name: string) {
    this.validate(name);
    this.name = name;
  }
  validate(name: string) {
    if (!name) {
      throw new Exaction("Name is required", StatusCode.BAD_REQUEST);
    }
  }
}

export class Description {
  public description: string;
  constructor(description: string) {
    this.validate(description);
    this.description = description;
  }

  validate(description: string) {
    if (!description) {
      throw new Exaction("Description is required", StatusCode.BAD_REQUEST);
    }
  }
}
