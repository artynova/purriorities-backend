import {AutoMap} from "@automapper/classes";

// export class ReadCategoryDto extends OmitType(Category, ['user', 'quests']) {
//     @IsArray()
//     @ValidateNested({ each: true })
//     @Type(() => ReadQuestDto)
//     quests: ReadQuestDto[];
// }

export class ReadCategoryDto{
    @AutoMap()
    id: string;

    @AutoMap()
    name: string;

    @AutoMap()
    inbox: boolean;
}