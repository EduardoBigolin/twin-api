export class Exaction extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Exaction";
  }
}
