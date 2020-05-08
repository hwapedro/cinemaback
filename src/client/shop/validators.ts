import { WithCinema } from '~/client/common/validators';
import { IsString, IsNotEmpty, Matches, IsMongoId, IsNumberString } from 'class-validator';

export class ShopsQueryValidator extends WithCinema {

}
export class ShopItemsQueryValidator {
  @IsNumberString()
  skip: string;

  @IsNumberString()
  limit: string;
}