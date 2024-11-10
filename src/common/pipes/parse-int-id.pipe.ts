import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('ParseIntPipe executando');
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma string numérica.',
      );
    }
    if (parsedValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera um número maior do que zero.',
      );
    }
    return parsedValue;
  }
}
