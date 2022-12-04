import FilterModel from "./filterModel";

export default interface RequestFilterModel {
  logicalOperator: FilterLogicalOperators;
  filters: FilterModel[];
}

export enum FilterLogicalOperators {
  And,
  Or,
}
