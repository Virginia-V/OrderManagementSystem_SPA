export default interface TableModel {
  provide: () => Promise<any[]>;
}
