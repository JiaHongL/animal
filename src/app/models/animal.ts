export class Animal {
    album_file: string; //圖片名稱
    album_update: string; //異動時間
    animal_age: string; //動物年紀 [CHILD | ADULT](幼年、成年)
    animal_area_pkid: number; //動物所屬縣市代碼
    animal_bacterin: string; //是否施打狂犬病疫苗 [T | F | N](是、否、未輸入)
    animal_bodytype: string; //動物體型 [MINI | SMALL | MEDIUM | BIG](迷你、小 型、中型、大型)
    animal_caption: string;  //其他說明
    animal_closeddate: string; //開放認養時間(迄)
    animal_colour: string; //動物毛色
    animal_createtime: string; //動物資料建立時間
    animal_foundplace: string; //動物尋獲地(文字敘述)
    animal_id: number; //動物的流水編號
    animal_kind: string; //動物的類型
    animal_opendate: string; //開放認養時間(起)
    animal_place: string; //動物的實際所在地
    animal_remark: string; //資料備註(文字敘述)
    animal_sex: string; //動物性別 M | F | N](公、母、未輸入)
    animal_shelter_pkid: number; //動物所屬收容所代碼 
    animal_status: string; //動物狀態 [NONE | OPEN | ADOPTED | OTHER | DEAD] (未公告、開放認養、已認養、其他、死亡)
    animal_sterilization: string; // 是否絕育 [T | F | N](是、否、未輸入)
    animal_subid: string; //動物的區域編號
    animal_title: string; //動物網頁標題(文字敘述)
    animal_update: string; //動物資料異動時間
    cDate: string; //資料更新時間
    shelter_address: string; //地址
    shelter_name: string; //動物所屬收容所名稱
    shelter_tel: string; //連絡電話
    isLike: boolean; //是否喜歡

    constructor(animal: Animal) {
        animal.isLike = false;
        this.setIsLikeProperty(animal);
    }

    setIsLikeProperty(animal) {
        let FavoriteList = JSON.parse(window.localStorage.getItem("FavoriteList")) || [];
        let SubIdList = FavoriteList.map(v => v.animal_subid);
        if (SubIdList.indexOf(animal.animal_subid) > -1) {
            animal.isLike = true;
        };
        return animal;
    }
}



