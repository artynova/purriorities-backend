import {Injectable} from "@nestjs/common";
import {AutomapperProfile, InjectMapper} from "@automapper/nestjs";
import {createMap, Mapper} from "@automapper/core";
import {Paginated} from "nestjs-paginate";
import {Cat} from "./cat.entity";
import {ReadCatDto} from "./dtos/read-cat.dto";
import {ReadManyCatsDto} from "./dtos/read-many-cats.dto";

@Injectable()
export class CatsMapper extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, Cat, ReadCatDto);
            createMap(mapper, Paginated<Cat>, ReadManyCatsDto);
        };
    }
}