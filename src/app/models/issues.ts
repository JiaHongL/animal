export class history {       
    status:number 
    createTime: Date;
    createUser: string;
    remark: string;
}


export class Issue {
    status: number;
    type: number;
    title: string;
    createTime: string;
    createUser: string;
    content: string;
    comment: string;
    history: history[]
}
