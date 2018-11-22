import {ID} from '@datorama/akita';

let id = 1;

export type Topping =
  | 'basil'
  | 'chili peppers'
  | 'mozzarella'
  | 'olives'
  | 'tomatoes';

export interface Pizza {
  id: ID;
  toppings: Topping[];
}

export function createPizza() {
  return {
    id: id++,
    toppings: []
  } as Pizza;
}

export const toppingsList: Topping[] = ['basil', 'chili peppers', 'mozzarella', 'mushrooms', 'olives', 'tomatoes'];
