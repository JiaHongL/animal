export class Issue {
    status:string;
    type: string;
    title:string;
    createTime:string;
    createUser:string;
    content:string;
    comment:string;
    history:[{
        status:string
        createTime:string;
        createUser:string;
        remark:string;
    }]
}
