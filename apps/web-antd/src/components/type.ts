export interface OptionItemBasicModel {
  value: string;
  label: string;
}

export interface OptionItemTreeModel extends OptionItemBasicModel {
  children: OptionItemTreeModel[];
}
