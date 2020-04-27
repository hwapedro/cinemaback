import { Injectable } from '@nestjs/common';
import { Hall } from '~/hall/hall.model';
import { HallCell } from '~/hallCell/hallCell.model';

@Injectable()
export class ScheduleService {
  constructor(

  ) { }

  priceRange(hall: Hall, hallCells: HallCell[]): { min: number, max: number } {
    const prices = Array.from(
      (new Set(hall.structure.flatMap(row => row))).values()
    )
      .map(index => {
        const hc = hallCells.find(hc => hc.index === index);
        if (!hc)
          return null;
        return hc.price;
      })
      .filter(s => s !== null);
    const { min, max } = prices.reduce((acc, curr) => {
      if (curr < acc.min)
        acc.min = curr;
      if (curr > acc.max)
        acc.max = curr;
      return acc;
    }, {
      min: prices[0],
      max: prices[0],
    });
    return {
      min,
      max
    };
  }
}
