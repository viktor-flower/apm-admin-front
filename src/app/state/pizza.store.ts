import {Pizza} from './pizza.model';
import {EntityState, getInitialActiveState, EntityStore} from '@datorama/akita';

export interface PizzaState extends EntityState<PizzaState, Pizza> {}

const state = {
  ...getInitialActiveState()
};

export class PizzaStore extends EntityStore<PizzaState, Pizza> {
  constructor() {
    super(state);
    this.addNewPizza();
  }
}
