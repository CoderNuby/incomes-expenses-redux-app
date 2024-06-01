

export class TransactionModel{
    constructor(
        public description: string,
        public amount: number,
        public type: TransactionType,
        public uid: string,
        public createdDate: string | Date
    ) {
        
    }
}

export type TransactionType = "income" | "expense";