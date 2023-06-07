import { PunishmentDto } from '../../users/dtos/punishment.dto';
import { CompleteResponseDto } from './complete-response.dto';

export class RefuseResponseDto extends CompleteResponseDto {
    punishment: PunishmentDto;
}
