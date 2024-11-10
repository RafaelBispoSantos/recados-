import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new BadRequestException('ParseIntIdPipe espera uma strng numerica');
    }
    if (parsedValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera um numero maior do que zero',
      );
    }

    return parsedValue;
  }
}
