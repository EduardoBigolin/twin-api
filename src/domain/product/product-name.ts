import { Exception, StatusCode } from "../common/Exception";

export class Name {
  public name: string;
  constructor(name: string) {
    this.validate(name);
    this.name = name;
  }
  validate(name: string) {
    if (!name) {
      throw new Exception("Name is required", StatusCode.BAD_REQUEST);
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
      throw new Exception("Description is required", StatusCode.BAD_REQUEST);
    }
  }
}
