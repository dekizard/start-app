import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'joinElements' })
export class JoinElements implements PipeTransform {
  transform(args: any[]): string {
    return args.filter((t) => t !== undefined).join(', ');
  }
}
