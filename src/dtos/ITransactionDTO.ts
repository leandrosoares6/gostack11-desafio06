export default interface ICreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category_id: string;
}
