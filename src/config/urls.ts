import { IsDefined, IsUrl } from 'class-validator';

export class Urls {
  @IsUrl({ require_tld: false })
  @IsDefined()
  public readonly publicUrl: string;

  @IsUrl({ require_tld: false })
  @IsDefined()
  public readonly apiUrl: string;

  constructor() {
    this.publicUrl = process.env.PUBLIC_URL;
    this.apiUrl = process.env.API_URL;
  }
}
